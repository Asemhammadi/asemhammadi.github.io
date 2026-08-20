import { useState } from 'react';
import { MapPin, Globe2 } from 'lucide-react';
import { LAND_ROWS, GRID_COLS, GRID_ROWS, SITES, project, type Site } from '../lib/worldGrid';

/**
 * Where the work actually happened: Yemen, Oman, Malaysia, then Boston.
 *
 * That arc is one of the most striking facts in his CV and it was previously
 * invisible — buried as location strings inside job descriptions. Pins double as
 * a filter for the case studies below, so the map is navigation rather than
 * ornament.
 */

const VB_W = 720;
const VB_H = 300;

interface Props {
  activeSite: string | null;
  onSelectSite: (id: string | null) => void;
  countFor: (site: Site) => number;
}

export function DeploymentMap({ activeSite, onSelectSite, countFor }: Props) {
  const [hover, setHover] = useState<string | null>(null);

  const dots: { x: number; y: number }[] = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    const row = LAND_ROWS[r] ?? '';
    for (let c = 0; c < GRID_COLS; c++) {
      if (row[c] === '#') {
        dots.push({ x: (c / (GRID_COLS - 1)) * VB_W, y: (r / (GRID_ROWS - 1)) * VB_H });
      }
    }
  }

  const pt = (s: Site) => {
    const { x, y } = project(s.lon, s.lat);
    return { x: x * VB_W, y: y * VB_H };
  };

  // Career path, drawn in order, as gentle arcs between postings.
  const ordered = [...SITES].sort((a, b) => a.order - b.order);
  const legs = ordered.slice(1).map((s, i) => {
    const a = pt(ordered[i]);
    const b = pt(s);
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - Math.abs(b.x - a.x) * 0.22 - 12;
    return { d: `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`, id: s.id };
  });

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 space-y-4" data-reveal>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="flex items-center gap-2 text-sm font-bold text-white">
          <Globe2 className="w-4 h-4 text-emerald-400" />
          Deployment map
          <span className="font-normal text-slate-400">— four countries, three continents</span>
        </h3>
        {activeSite && (
          <button
            onClick={() => onSelectSite(null)}
            className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300"
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full min-w-[520px] h-auto"
          role="img"
          aria-label="World map showing work locations in Yemen, Oman, Malaysia and Boston"
        >
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={1.5} className="fill-slate-700" />
          ))}

          {legs.map(l => (
            <path
              key={l.id}
              d={l.d}
              className="fill-none stroke-emerald-500/35"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          ))}

          {ordered.map(s => {
            const { x, y } = pt(s);
            const on = activeSite === s.id || hover === s.id;
            const n = countFor(s);
            return (
              <g
                key={s.id}
                className="cursor-pointer"
                onMouseEnter={() => setHover(s.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onSelectSite(activeSite === s.id ? null : s.id)}
              >
                <circle cx={x} cy={y} r={on ? 15 : 11} className="fill-emerald-500/15" />
                <circle cx={x} cy={y} r={on ? 5.5 : 4} className="fill-emerald-400" />
                {s.id === 'boston' && (
                  <circle cx={x} cy={y} r={9} className="fill-none stroke-emerald-400/70 animate-ping" strokeWidth={1} />
                )}
                <text
                  x={x}
                  y={y - 16}
                  textAnchor="middle"
                  className={`text-[9px] font-semibold ${on ? 'fill-emerald-300' : 'fill-slate-400'}`}
                  style={{ fontSize: 9 }}
                >
                  {s.label}
                </text>
                {n > 0 && (
                  <text x={x} y={y + 20} textAnchor="middle" className="fill-slate-500" style={{ fontSize: 8 }}>
                    {n} {n === 1 ? 'project' : 'projects'}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap gap-2">
        {ordered.map(s => (
          <button
            key={s.id}
            onClick={() => onSelectSite(activeSite === s.id ? null : s.id)}
            aria-pressed={activeSite === s.id}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all ${
              activeSite === s.id
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <MapPin className="w-3 h-3" />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
