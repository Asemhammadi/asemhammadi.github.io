import { useMemo, useState } from 'react';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import { parsePeriod } from '../lib/period';

/**
 * The career rendered as a project schedule rather than a list.
 *
 * A PMP reads a Gantt natively, and it surfaces something a vertical list
 * flattens away: the overlaps. Lecturing at UST while taking the M.Sc.,
 * two Malaysian posts inside the same year, the B.Sc. running alongside
 * early teaching. A list makes those look like six unrelated jobs; a
 * schedule shows parallel workstreams sustained for fifteen years.
 */

const NOW = 2026.6;
const LABEL_W = 232;

interface Row {
  id: string;
  title: string;
  org: string;
  place?: string;
  start: number;
  end: number;
  ongoing: boolean;
  kind: 'work' | 'education';
}

export function CareerSchedule({ filter }: { filter: 'all' | 'work' | 'education' }) {
  const { workExperience, educationData } = useSiteData();
  const [hovered, setHovered] = useState<string | null>(null);

  const rows = useMemo<Row[]>(() => {
    const work: Row[] = workExperience.flatMap(e => {
      const span = parsePeriod(e.period, NOW);
      if (!span) return [];
      return [{
        id: e.id, title: e.role, org: e.company, place: e.location,
        start: span.start, end: span.end, ongoing: span.ongoing, kind: 'work' as const
      }];
    });

    const edu: Row[] = educationData.flatMap(e => {
      const span = parsePeriod(e.year, NOW);
      if (!span) return [];
      return [{
        id: e.id, title: e.degree, org: e.institution,
        start: span.start, end: span.end, ongoing: span.ongoing, kind: 'education' as const
      }];
    });

    const all = filter === 'work' ? work : filter === 'education' ? edu : [...work, ...edu];
    return all.sort((a, b) => b.start - a.start);
  }, [workExperience, educationData, filter]);

  const { min, max, years } = useMemo(() => {
    if (rows.length === 0) return { min: 2004, max: 2027, years: [] as number[] };
    const lo = Math.floor(Math.min(...rows.map(r => r.start)));
    const hi = Math.ceil(Math.max(...rows.map(r => r.end)));
    const list: number[] = [];
    // Every other year on the axis keeps the labels from colliding.
    for (let y = lo; y <= hi; y += 2) list.push(y);
    return { min: lo, max: hi, years: list };
  }, [rows]);

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  if (rows.length === 0) return null;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6" data-reveal>
      <div className="overflow-x-auto">
        <div className="min-w-[760px]">

          {/* Year axis */}
          <div className="relative mb-3 h-5" style={{ marginLeft: LABEL_W }}>
            {years.map(y => (
              <span
                key={y}
                className="absolute -translate-x-1/2 text-[10px] font-mono text-slate-500"
                style={{ left: `${pct(y)}%` }}
              >
                {y}
              </span>
            ))}
          </div>

          <div className="relative">
            {/* Year gridlines */}
            <div className="absolute inset-0 pointer-events-none" style={{ marginLeft: LABEL_W }}>
              {years.map(y => (
                <span
                  key={y}
                  className="absolute top-0 bottom-0 w-px bg-slate-800/70"
                  style={{ left: `${pct(y)}%` }}
                />
              ))}
              {/* Today */}
              <span
                className="absolute top-0 bottom-0 w-px bg-emerald-500/50"
                style={{ left: `${pct(NOW)}%` }}
              />
            </div>

            <div className="relative space-y-1.5">
              {rows.map(r => {
                const isWork = r.kind === 'work';
                const active = hovered === r.id;
                return (
                  <div
                    key={r.id}
                    className="flex items-center group"
                    onMouseEnter={() => setHovered(r.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div
                      className="shrink-0 sticky left-0 z-10 pr-3 bg-slate-900/60 backdrop-blur-sm"
                      style={{ width: LABEL_W }}
                    >
                      <div className="flex items-start gap-2">
                        {isWork
                          ? <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          : <GraduationCap className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />}
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-slate-200 leading-tight truncate">{r.title}</p>
                          <p className="text-[10px] text-slate-500 truncate">{r.org}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex-1 h-9">
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 h-6 rounded-lg border transition-all duration-200 ${
                          isWork
                            ? 'bg-gradient-to-r from-emerald-500/80 to-teal-500/60 border-emerald-400/40'
                            : 'bg-gradient-to-r from-teal-600/60 to-cyan-600/40 border-teal-400/30'
                        } ${active ? 'brightness-125 shadow-lg shadow-emerald-500/20' : ''}`}
                        style={{
                          left: `${pct(r.start)}%`,
                          width: `${Math.max(pct(r.end) - pct(r.start), 1.2)}%`
                        }}
                        title={`${r.title} — ${r.org}`}
                      >
                        {r.ongoing && (
                          <span className="absolute right-0 top-0 bottom-0 w-6 rounded-r-lg bg-gradient-to-r from-transparent to-emerald-300/70 animate-pulse" />
                        )}
                      </div>

                      {active && (
                        <div
                          className="absolute -top-1 z-20 whitespace-nowrap rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1 text-[10px] text-slate-200 shadow-xl pointer-events-none"
                          style={{ left: `calc(${pct(r.start)}% + 6px)` }}
                        >
                          <span className="font-mono text-emerald-400">
                            {Math.floor(r.start)}
                            {' – '}
                            {r.ongoing ? 'Present' : Math.ceil(r.end)}
                          </span>
                          {r.place && (
                            <span className="ml-2 inline-flex items-center gap-1 text-slate-400">
                              <MapPin className="w-2.5 h-2.5" />{r.place}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-4 mt-4 border-t border-slate-800 text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-2.5 rounded bg-gradient-to-r from-emerald-500/80 to-teal-500/60 border border-emerald-400/40" />
          Professional role
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-2.5 rounded bg-gradient-to-r from-teal-600/60 to-cyan-600/40 border border-teal-400/30" />
          Education
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-px h-3 bg-emerald-500/60" />
          Today
        </span>
        <span className="ml-auto hidden sm:block text-slate-500">Overlapping bars ran concurrently</span>
      </div>
    </div>
  );
}
