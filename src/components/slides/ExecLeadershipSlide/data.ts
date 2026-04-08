export interface TeamMember {
  name: string
  role: string
  company?: string
  photoPath: string
  logos: { src: string; alt: string }[]
  bullets: string[]
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Steven Butler',
    role: 'Group Chief Executive Officer',
    photoPath: '/steve.png',
    logos: [
      { src: '/stilmark.png', alt: 'Stilmark' },
    ],
    bullets: [
      'Founder of Symphony',
      'Founder and former CEO of Stilmark, Australia\u2019s leading independent mobile tower developer and owner',
      'Stilmark was acquired by OMERS Infrastructure in 2022',
      'Electronic execution (Institutional Clients Group) Citi Global Markets',
    ],
  },
  {
    name: 'Nathan Gooley',
    role: 'Group Chief Financial Officer',
    photoPath: '/nathan.png',
    logos: [
      { src: '/nab.png', alt: 'NAB' },
    ],
    bullets: [
      'Over 20 yrs experience in global financial markets',
      'Previously held senior roles across Asia, Europe and Americas supporting some of the largest global private equity and hedge fund clients',
      'Lead introduction of ESG performance metrics and risk management on A$320bn loan book',
    ],
  },
  {
    name: 'Alexander Jury',
    role: 'Group Chief Investment Officer',
    photoPath: '/alexander.png',
    logos: [
      { src: '/squadron.jpg', alt: 'Squadron Energy' },
    ],
    bullets: [
      '20 years in corporate development, energy markets, and operations across Australia and Asia',
      'Former EGM at Squadron Energy, leading the A$4B acquisition of CWP Renewables',
      'Former Chief of Staff to MD at AGL Energy including responsibility for energy trading and customer operations',
    ],
  },
  {
    name: 'Richard Phillips',
    role: 'CEO, Lighthouse Industries',
    photoPath: '/richardphillips.png',
    logos: [
      { src: '/gm.png', alt: 'General Motors' },
    ],
    bullets: [
      'Over 30 years\u2019 experience in automotive manufacturing and plant construction \u2013 global executive responsibility',
      'Previously led General Motors\u2019 global manufacturing and engineering operations',
    ],
  },
  {
    name: 'Graham Bradley',
    role: 'Non-Executive Chairman',
    photoPath: '/graham.png',
    logos: [
      { src: '/hsbc.png', alt: 'HSBC' },
    ],
    bullets: [
      '40+ years of executive experience',
      'Previously Chairman of Energy Australia, HSBC Bank (Australia) and Stockland',
      'Non-executive Chairman of Infrastructure NSW and Chairman of Virgin International Australia Holdings and WaveConn (formerly Stilmark)',
      'Member of the Order of Australia in 2009',
    ],
  },
]
