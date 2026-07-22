export type DriveEvent = {
  host: string
  title: string
  type: string
  day: string
  month: string
  time: string
  location: string
  mode: 'On-site' | 'Online' | 'Hybrid'
  tags: string[]
  perk: string
}

export type DriveInfo = DriveEvent & {
  slug: string
  salary: string
  openings: string
  deadline: string
  aboutCompany: string[]
  aboutDrive: string[]
  positions: { title: string; exp: string }[]
  process: { step: string; detail: string }[]
  schedule: { time: string; item: string }[]
  eligibility: string[]
  perks: string[]
  documents: string[]
  contact: { name: string; role: string; email: string }
}

const driveAccentPalette = ['#ffc53d', '#7b8cff', '#ff7a50', '#35d0bc']

export function driveAccent(drive: DriveInfo) {
  const i = driveCatalog.findIndex((d) => d.slug === drive.slug)
  return driveAccentPalette[(i < 0 ? 0 : i) % driveAccentPalette.length]
}

export const driveCatalog: DriveInfo[] = [
  {
    host: 'TriDizi Digital Innovations', title: 'Frontend & Backend Mega Drive', type: 'Walk-in', day: '16', month: 'Jul', time: '9:00 AM – 4:00 PM', location: 'Bengaluru', mode: 'On-site', tags: ['0–4 yrs', 'React', 'Node.js'], perk: 'On-the-spot offers',
    slug: 'tridizi-frontend-backend-mega-drive',
    salary: '₹4L – ₹12L per year',
    openings: '120+ openings',
    deadline: 'Walk in — no pre-registration needed',
    aboutCompany: [
      'TriDizi Digital Innovations builds e-commerce and logistics platforms used by 400+ brands across India. The engineering team ships weekly, runs on a modern React and Node.js stack, and promotes from within aggressively.',
    ],
    aboutDrive: [
      'This is TriDizi\'s biggest hiring event of the quarter — 120+ openings across frontend, backend, and full-stack roles, from fresh graduates to four years of experience.',
      'Interviews happen on the spot: clear the technical round before lunch and you could leave with an offer letter the same afternoon.',
    ],
    positions: [
      { title: 'Frontend Engineer', exp: '0–4 yrs · React' },
      { title: 'Backend Engineer', exp: '1–4 yrs · Node.js' },
      { title: 'Full-stack Developer', exp: '2–4 yrs · MERN' },
    ],
    process: [
      { step: 'Registration & screening', detail: 'Resume check and a short profile form at the venue.' },
      { step: 'Online coding test', detail: '45 minutes, two problems — DSA basics plus one practical task.' },
      { step: 'Technical interview', detail: 'One round with a senior engineer on your stack and projects.' },
      { step: 'HR discussion & offer', detail: 'Compensation, joining date, and the offer letter — same day.' },
    ],
    schedule: [
      { time: '9:00 AM', item: 'Gates open — registration and resume screening' },
      { time: '10:00 AM', item: 'Coding test batches begin' },
      { time: '12:00 PM', item: 'Technical interviews start rolling' },
      { time: '3:00 PM', item: 'Final HR rounds and offer discussions' },
      { time: '4:00 PM', item: 'Last entries close' },
    ],
    eligibility: [
      'B.E/B.Tech, MCA, or equivalent — 2021 batch onwards',
      '0–4 years of experience in web development',
      'Working knowledge of React or Node.js',
      'Notice period of 30 days or less preferred',
    ],
    perks: [
      'On-the-spot offer letters',
      'Health insurance for you and family',
      'Hybrid work after probation',
      'Annual learning budget',
    ],
    documents: [
      'Multiple copies of your updated resume',
      'Government photo ID',
      'Passport-size photographs',
      'Last degree certificate or marksheet',
    ],
    contact: { name: 'Ananya Desai', role: 'Talent Acquisition Lead', email: 'careers@tridizi.com' },
  },
  {
    host: 'Oraddo', title: 'ML & Data Science Open Drive', type: 'Walk-in', day: '18', month: 'Jul', time: '10:00 AM – 5:00 PM', location: 'Hyderabad', mode: 'On-site', tags: ['2+ yrs', 'Python', 'SQL'], perk: '80+ openings',
    slug: 'oraddo-ml-data-science-open-drive',
    salary: '₹8L – ₹18L per year',
    openings: '80+ openings',
    deadline: 'Pre-register to skip the queue',
    aboutCompany: [
      'Oraddo builds AI products for hiring and workforce analytics, processing millions of candidate signals a day. The data team owns models end to end — from research notebooks to production pipelines.',
    ],
    aboutDrive: [
      'Oraddo is scaling its ML platform and analytics teams: 80+ roles for data scientists, ML engineers, and analytics engineers with two or more years of hands-on experience.',
      'Bring a project you are proud of — the technical round is a deep conversation about something you actually built, not a puzzle quiz.',
    ],
    positions: [
      { title: 'Data Scientist', exp: '2+ yrs · Python' },
      { title: 'ML Engineer', exp: '3+ yrs · MLOps' },
      { title: 'Analytics Engineer', exp: '2+ yrs · SQL' },
    ],
    process: [
      { step: 'Portfolio screening', detail: 'Walk the panel through one project — problem, approach, impact.' },
      { step: 'Technical deep-dive', detail: 'Modelling choices, data pipelines, and evaluation under the hood.' },
      { step: 'Case round', detail: 'A 30-minute business problem solved out loud with the hiring manager.' },
      { step: 'Offer discussion', detail: 'Shortlisted candidates get offers within 48 hours.' },
    ],
    schedule: [
      { time: '10:00 AM', item: 'Check-in and portfolio screening' },
      { time: '11:30 AM', item: 'Technical deep-dive interviews' },
      { time: '2:00 PM', item: 'Case rounds with hiring managers' },
      { time: '4:30 PM', item: 'Wrap-up and next-step briefings' },
    ],
    eligibility: [
      '2+ years working with Python and SQL in production',
      'One shippable project you can present end to end',
      'Familiarity with model evaluation and experiment design',
      'Degree in CS, statistics, or a quantitative field',
    ],
    perks: [
      'GPU credits and a dedicated research day per sprint',
      'ESOPs for all full-time roles',
      'Relocation support to Hyderabad',
      'Conference budget every year',
    ],
    documents: [
      'Resume with links to code or notebooks',
      'Government photo ID',
      'Laptop for the portfolio walkthrough',
      'Current CTC proof for offer discussions',
    ],
    contact: { name: 'Vikram Rao', role: 'Head of Data Hiring', email: 'talent@oraddo.ai' },
  },
  {
    host: 'Surwive', title: 'DevOps Walk-in Wednesday', type: 'Walk-in', day: '22', month: 'Jul', time: '9:30 AM – 3:30 PM', location: 'Pune', mode: 'On-site', tags: ['3+ yrs', 'AWS', 'Kubernetes'], perk: 'Same-day results',
    slug: 'surwive-devops-walk-in-wednesday',
    salary: '₹10L – ₹22L per year',
    openings: '35 openings',
    deadline: 'Register by 20 Jul for a fixed slot',
    aboutCompany: [
      'Surwive runs the AI-matching platform you are reading right now — 25,000+ live roles, 1.24M candidates, and an infrastructure team that keeps matching latency under 100ms at peak.',
    ],
    aboutDrive: [
      'We are growing the platform and reliability teams in Pune: SRE, DevOps, and platform engineering roles for people with three or more years running production systems on AWS and Kubernetes.',
      'Every candidate gets a definite answer the same day — offer, no, or next round. No ghosting, ever. It is kind of our whole thing.',
    ],
    positions: [
      { title: 'DevOps Engineer', exp: '3+ yrs · AWS' },
      { title: 'Site Reliability Engineer', exp: '4+ yrs · K8s' },
      { title: 'Platform Engineer', exp: '3+ yrs · IaC' },
    ],
    process: [
      { step: 'Slot check-in', detail: 'Pre-registered candidates go straight to round one.' },
      { step: 'Systems interview', detail: 'Debugging a real (sanitized) production incident together.' },
      { step: 'Architecture round', detail: 'Design a deployment pipeline for a service you know well.' },
      { step: 'Decision on the spot', detail: 'Panel huddles and tells you the outcome before you leave.' },
    ],
    schedule: [
      { time: '9:30 AM', item: 'Check-in opens — coffee on us' },
      { time: '10:00 AM', item: 'Systems interviews begin' },
      { time: '12:30 PM', item: 'Architecture rounds' },
      { time: '3:00 PM', item: 'Same-day decisions communicated' },
    ],
    eligibility: [
      '3+ years operating production workloads',
      'Hands-on AWS and Kubernetes experience',
      'Comfort with Terraform or similar IaC tooling',
      'On-call experience is a strong plus',
    ],
    perks: [
      'Same-day results — no waiting weeks',
      'Remote-flexible after onboarding',
      'Top-of-band pay for on-call rotations',
      'Home-office setup allowance',
    ],
    documents: [
      'Updated resume (two copies)',
      'Government photo ID',
      'Registration confirmation if you booked a slot',
    ],
    contact: { name: 'Priya Iyer', role: 'Hiring Manager, Platform', email: 'platform-hiring@surwive.com' },
  },
  {
    host: 'Incrediquo', title: 'Design Portfolio Day', type: 'Walk-in', day: '25', month: 'Jul', time: '11:00 AM – 4:00 PM', location: 'Mumbai', mode: 'On-site', tags: ['Freshers welcome', 'Figma'], perk: 'Live portfolio reviews',
    slug: 'incrediquo-design-portfolio-day',
    salary: '₹5L – ₹14L per year',
    openings: '25 openings',
    deadline: 'Walk in with your portfolio',
    aboutCompany: [
      'Incrediquo is a product studio crafting interfaces for fintech and health-tech clients across three continents. Design leads every project here — engineers build what designers have already validated.',
    ],
    aboutDrive: [
      'Portfolio Day is part hiring drive, part free design clinic. Every attendee — hired or not — gets a live portfolio review from a senior designer with concrete, take-home feedback.',
      'Freshers are genuinely welcome: two of the studio\'s current leads walked in as students at previous editions.',
    ],
    positions: [
      { title: 'Product Designer', exp: '1–4 yrs · Figma' },
      { title: 'UI/UX Designer', exp: 'Freshers · Portfolio' },
      { title: 'Design Systems Designer', exp: '3+ yrs · Tokens' },
    ],
    process: [
      { step: 'Portfolio review', detail: '20 minutes with a senior designer — bring your best three projects.' },
      { step: 'Whiteboard challenge', detail: 'A small product problem solved live, thinking out loud.' },
      { step: 'Culture conversation', detail: 'Meet the team you would actually sit with.' },
      { step: 'Offer within a week', detail: 'Shortlisted designers hear back within five working days.' },
    ],
    schedule: [
      { time: '11:00 AM', item: 'Doors open — portfolio reviews begin' },
      { time: '1:00 PM', item: 'Whiteboard challenge sessions' },
      { time: '3:00 PM', item: 'Team conversations and studio tour' },
      { time: '4:00 PM', item: 'Last reviews close' },
    ],
    eligibility: [
      'A portfolio — course projects count for freshers',
      'Working knowledge of Figma',
      'Ability to explain design decisions, not just show screens',
      'Mumbai-based or willing to relocate',
    ],
    perks: [
      'Free live portfolio review for every attendee',
      'MacBook + full design tool stack',
      'Mentorship from principal designers',
      'Client exposure from month one',
    ],
    documents: [
      'Portfolio on a laptop or tablet (PDF backup recommended)',
      'Resume — one page is fine',
      'Government photo ID',
    ],
    contact: { name: 'Meher Kapadia', role: 'Design Director', email: 'design-day@incrediquo.com' },
  },
  {
    host: 'Google', title: 'Analytics Hiring Blitz', type: 'Walk-in', day: '28', month: 'Jul', time: '9:00 AM – 2:00 PM', location: 'Gurugram', mode: 'On-site', tags: ['1–3 yrs', 'SQL', 'Power BI'], perk: '40 openings',
    slug: 'google-analytics-hiring-blitz',
    salary: '₹12L – ₹24L per year',
    openings: '40 openings',
    deadline: 'Pre-registration mandatory — closes 26 Jul',
    aboutCompany: [
      'The Gurugram analytics organisation supports ads, payments, and cloud teams with decision science — turning petabytes of data into calls that move real products.',
    ],
    aboutDrive: [
      'A focused, five-hour blitz for analysts with one to three years of experience. Forty openings across business analytics and data operations, with a compressed three-round loop finished before lunch.',
      'Pre-registration is mandatory and capped — register early and bring the confirmation QR with you.',
    ],
    positions: [
      { title: 'Business Analyst', exp: '1–3 yrs · SQL' },
      { title: 'Data Operations Analyst', exp: '1–2 yrs · Sheets/BI' },
      { title: 'Insights Analyst', exp: '2–3 yrs · Dashboards' },
    ],
    process: [
      { step: 'QR check-in', detail: 'Confirmation QR and photo ID at the gate — no walk-ins without it.' },
      { step: 'SQL assessment', detail: '40 minutes, real datasets, practical questions.' },
      { step: 'Analytics case interview', detail: 'One round: turn a messy metric drop into a clear recommendation.' },
      { step: 'Hiring committee review', detail: 'Results within ten working days by email.' },
    ],
    schedule: [
      { time: '9:00 AM', item: 'QR check-in and badge collection' },
      { time: '9:45 AM', item: 'SQL assessments in batches' },
      { time: '11:30 AM', item: 'Case interviews' },
      { time: '1:30 PM', item: 'Closing and next-steps briefing' },
    ],
    eligibility: [
      '1–3 years in an analytics or BI role',
      'Strong SQL — the assessment is hands-on',
      'Experience with Power BI, Looker, or similar',
      'Pre-registration confirmation (mandatory)',
    ],
    perks: [
      'Industry-leading compensation and stock',
      'World-class analytics tooling and mentorship',
      'On-site gym, meals, and shuttle in Gurugram',
      'Clear IC growth track',
    ],
    documents: [
      'Registration confirmation QR (printed or on phone)',
      'Government photo ID matching your registration',
      'Resume — two copies',
      'Degree certificate for verification',
    ],
    contact: { name: 'Rahul Khanna', role: 'Staffing Partner', email: 'analytics-blitz@google.com' },
  },
  {
    host: 'Aquire Lead', title: 'Engineering Open House', type: 'Walk-in', day: '01', month: 'Aug', time: '10:00 AM – 6:00 PM', location: 'Chennai', mode: 'On-site', tags: ['Senior roles', 'Platform'], perk: 'Meet the CTO',
    slug: 'aquire-lead-engineering-open-house',
    salary: '₹18L – ₹35L per year',
    openings: '15 senior roles',
    deadline: 'RSVP recommended for CTO office hours',
    aboutCompany: [
      'Aquire Lead builds revenue intelligence software for B2B sales teams, processing signals from millions of buyer interactions. The Chennai centre is its largest engineering hub.',
    ],
    aboutDrive: [
      'An open house rather than an assembly line: tour the office, sit in on a real architecture review, and talk directly with the CTO about the problems the platform team is solving this year.',
      'Fifteen senior openings — staff engineers, tech leads, and an engineering manager. Conversations here replace the first two rounds of the regular process.',
    ],
    positions: [
      { title: 'Staff Engineer', exp: '8+ yrs · Distributed systems' },
      { title: 'Tech Lead', exp: '6+ yrs · Platform' },
      { title: 'Engineering Manager', exp: '8+ yrs · Team of 10+' },
    ],
    process: [
      { step: 'Open house & office tour', detail: 'See the teams, the boards, and the real backlog.' },
      { step: 'Architecture conversation', detail: 'A working session on a current platform problem — not a quiz.' },
      { step: 'CTO office hours', detail: 'Direct conversation about scope, autonomy, and roadmap.' },
      { step: 'Fast-tracked loop', detail: 'Strong conversations skip straight to the final panel.' },
    ],
    schedule: [
      { time: '10:00 AM', item: 'Doors open — office tours all day' },
      { time: '11:00 AM', item: 'Live architecture review session' },
      { time: '2:00 PM', item: 'CTO office hours begin' },
      { time: '5:00 PM', item: 'Last conversations wrap' },
    ],
    eligibility: [
      '6+ years building and operating production systems',
      'Depth in distributed systems or platform engineering',
      'Track record of leading projects or people',
      'Open to on-site work in Chennai',
    ],
    perks: [
      'Direct access to the CTO — skip two rounds',
      'Top-quartile senior compensation',
      'Sabbatical policy after three years',
      'Dedicated platform R&D budget',
    ],
    documents: [
      'Resume or a link to your work — either is fine',
      'Government photo ID',
      'RSVP confirmation if you booked CTO office hours',
    ],
    contact: { name: 'Sundar Krishnan', role: 'VP Engineering', email: 'openhouse@aquirelead.com' },
  },
  {
    host: 'Yularatech', title: 'Cloud & QA Hiring Day', type: 'Walk-in', day: '05', month: 'Aug', time: '9:00 AM – 5:00 PM', location: 'Chennai', mode: 'On-site', tags: ['2–6 yrs', 'Azure', 'Automation'], perk: '60+ openings',
    slug: 'yularatech-cloud-qa-hiring-day',
    salary: '₹6L – ₹16L per year',
    openings: '60+ openings',
    deadline: 'Walk in — carry two resume copies',
    aboutCompany: [
      'Yularatech provides IT consulting and managed engineering teams to enterprises across Asia-Pacific, with Chennai as its largest delivery centre. Client projects span cloud migrations, QA automation, and 24×7 platform operations.',
    ],
    aboutDrive: [
      'A combined hiring day for two fast-growing practices: cloud engineering and QA automation. Sixty-plus openings from two to six years of experience, staffed onto enterprise client projects with structured training in the first month.',
      'Both tracks run parallel interview lanes, so the full loop — screening to HR — finishes within half a day.',
    ],
    positions: [
      { title: 'Cloud Engineer', exp: '2–5 yrs · Azure/AWS' },
      { title: 'QA Automation Engineer', exp: '2–6 yrs · Selenium' },
      { title: 'NOC Engineer', exp: '2–4 yrs · Monitoring' },
    ],
    process: [
      { step: 'Registration & track selection', detail: 'Pick your lane — cloud or QA — at check-in.' },
      { step: 'Technical assessment', detail: '45 minutes, practical scenarios from real client projects.' },
      { step: 'Panel interview', detail: 'One round with a practice lead and a delivery manager.' },
      { step: 'HR & offer', detail: 'Shortlisted candidates get offers within three working days.' },
    ],
    schedule: [
      { time: '9:00 AM', item: 'Registration and track selection' },
      { time: '10:00 AM', item: 'Technical assessments in batches' },
      { time: '1:00 PM', item: 'Panel interviews begin' },
      { time: '4:30 PM', item: 'HR discussions and wrap-up' },
    ],
    eligibility: [
      '2–6 years in cloud operations, QA, or platform support',
      'Hands-on Azure or AWS exposure for the cloud track',
      'Selenium or Playwright experience for the QA track',
      'Willing to work from the Chennai delivery centre',
    ],
    perks: [
      'Structured client-project training in month one',
      'Certification sponsorship (Azure, ISTQB)',
      'Family health insurance',
      'Clear band progression reviewed yearly',
    ],
    documents: [
      'Updated resume (two copies)',
      'Government photo ID',
      'Experience and relieving letters if applicable',
    ],
    contact: { name: 'Lakshmi Narayan', role: 'Delivery Hiring Lead', email: 'hiringday@yularatech.com' },
  },
  {
    host: 'Sapience Minds', title: 'Consulting Analyst Walk-in', type: 'Walk-in', day: '09', month: 'Aug', time: '10:00 AM – 4:00 PM', location: 'Bengaluru', mode: 'On-site', tags: ['0–3 yrs', 'Excel', 'Case rounds'], perk: 'Offers in 48 hrs',
    slug: 'sapience-minds-consulting-analyst-walk-in',
    salary: '₹6L – ₹12L per year',
    openings: '30 openings',
    deadline: 'Pre-register for a fixed case-round slot',
    aboutCompany: [
      'Sapience Minds is a product and data consultancy of 120 people serving fintech and health-tech clients in India and the Gulf. The firm is doubling this year, and the analyst bench grows first.',
    ],
    aboutDrive: [
      'Thirty analyst openings for freshers and early-career candidates who can think in structures and communicate clearly. The loop is case-driven: no trick questions, just a business problem worked out loud.',
      'Every shortlisted candidate hears back within 48 hours — offer or a written reason why not.',
    ],
    positions: [
      { title: 'Business Analyst', exp: '0–2 yrs · Excel' },
      { title: 'Data Analyst', exp: '1–3 yrs · SQL' },
      { title: 'Research Associate', exp: '0–2 yrs · Writing' },
    ],
    process: [
      { step: 'Aptitude screen', detail: '30 minutes — numerical and logical reasoning.' },
      { step: 'Case round', detail: 'A business problem solved out loud with a senior consultant.' },
      { step: 'Partner conversation', detail: 'Fit, ambition, and which practice suits you best.' },
      { step: 'Offer within 48 hours', detail: 'A definite answer either way, in writing.' },
    ],
    schedule: [
      { time: '10:00 AM', item: 'Check-in and aptitude screens' },
      { time: '11:30 AM', item: 'Case rounds begin' },
      { time: '2:00 PM', item: 'Partner conversations' },
      { time: '3:30 PM', item: 'Final slots close' },
    ],
    eligibility: [
      'Graduates from any discipline — 2023 batch onwards',
      'Strong Excel; SQL is a plus for the data track',
      'Structured communication — you will present your case solution',
      'Based in or willing to relocate to Bengaluru',
    ],
    perks: [
      'Definite answer within 48 hours',
      'Client exposure from the first month',
      'Structured consulting bootcamp for new joiners',
      'Lunch and commute allowance',
    ],
    documents: [
      'Resume — one page preferred',
      'Government photo ID',
      'Degree certificate or final-semester marksheet',
    ],
    contact: { name: 'Farah Sheikh', role: 'Campus & Early Careers Lead', email: 'analyst-hiring@sapienceminds.com' },
  },
]
