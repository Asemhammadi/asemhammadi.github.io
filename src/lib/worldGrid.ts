/**
 * Coarse land mask for a dotted world map, 72 x 30 cells on an equirectangular
 * grid: columns span -180..180 in 5-degree steps, rows span 75N..-70S.
 *
 * Deliberately low fidelity. It exists to give the deployment pins a recognisable
 * ground, not to be an atlas, and it keeps the map free of any external tile
 * service — which matters on a static host with a strict asset budget.
 */
export const LAND_ROWS = [
  '                          ######                                        ',
  '   #####################  ######     ###################################',
  '   #####################  ######     ###################################',
  '   #####################  ######  ######################################',
  '   #####################          ######################################',
  '   #####################          ######################################',
  '           #############          ######################################',
  '           #############          ##############################        ',
  '           ############          ###############################        ',
  '           ############          ######### #################            ',
  '           ############          ######### #################            ',
  '             ######              #########       ###########            ',
  '             ########            #########       ##### #####            ',
  '                  #######        ############    ##### #####            ',
  '                    #####        ############          #####            ',
  '                    #####        ############          #####            ',
  '                     ########    ############          #####            ',
  '                     ########         ######                            ',
  '                     ########         ######              ########      ',
  '                     ########         ######              ########      ',
  '                      #####           ######              ########      ',
  '                      #####           ######              ########      ',
  '                     ######                               ########      ',
  '                     ###                                             ## ',
  '                     ###                                             ## ',
  '                     ###                                                ',
  '                                                                        ',
  '                                                                        ',
  '                                                                        ',
  '                                                                        ',
];

export const GRID_COLS = 72;
export const GRID_ROWS = LAND_ROWS.length;
export const LON_MIN = -180, LON_MAX = 180;
export const LAT_MAX = 75, LAT_MIN = -70;

/** Longitude/latitude to 0..1 coordinates on the same projection as the grid. */
export function project(lon: number, lat: number) {
  return {
    x: (lon - LON_MIN) / (LON_MAX - LON_MIN),
    y: (LAT_MAX - lat) / (LAT_MAX - LAT_MIN)
  };
}

export interface Site {
  id: string;
  label: string;
  detail: string;
  lon: number;
  lat: number;
  /** Matches ProjectItem.clientOrOrg / location text so projects can be filtered. */
  match: string[];
  order: number;
}

/** Where he has actually built things, west to east in career order. */
export const SITES: Site[] = [
  { id: 'yemen',    label: "Sana'a, Yemen",   detail: 'University of Science & Technology',  lon: 44.2,  lat: 15.35, match: ['UST', 'University of Science and Technology', 'Yemen'], order: 1 },
  { id: 'oman',     label: 'Oman',            detail: 'Arab Open University',                lon: 58.4,  lat: 23.6,  match: ['Arab Open University', 'AOU', 'Oman'], order: 2 },
  { id: 'malaysia', label: 'Selangor, Malaysia', detail: 'IMAS / Baseerah International',    lon: 101.7, lat: 3.1,   match: ['IMAS', 'Malaysia', 'Baseerah'], order: 3 },
  { id: 'boston',   label: 'Boston, MA',      detail: 'Boston Medical Center — 3 campuses',  lon: -71.1, lat: 42.4,  match: ['Boston Medical Center', 'Boston', 'BMC', 'Healthcare Operations'], order: 4 }
];
