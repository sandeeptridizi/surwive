export const trendingChips = ['Remote roles', 'AI Engineer', 'Product Manager', 'UX Designer']

export type FeaturedRole = {
  company: string
  initial: string
  featured: boolean
  title: string
  location: string
  mode: 'Remote' | 'Hybrid' | 'On-site'
  detail: string
  skills: string[]
  pay: string
  per: string
}

export type JobInfo = FeaturedRole & {
  slug: string
  type: 'job' | 'internship'
  summary: string
  posted: string
  applicants: string
  openings: string
  aboutCompany: string[]
  aboutRole: string[]
  responsibilities: string[]
  requirements: string[]
  niceToHave: string[]
  benefits: string[]
}

const jobAccentPalette = ['#ffc53d', '#7b8cff', '#ff7a50', '#35d0bc']

export function jobAccent(job: JobInfo) {
  const i = jobCatalog.findIndex((j) => j.slug === job.slug)
  return jobAccentPalette[(i < 0 ? 0 : i) % jobAccentPalette.length]
}

export const featuredJobs: JobInfo[] = [
  {
    company: 'TriDizi Digital Innovations', initial: 'T', featured: true, title: 'Senior Frontend Engineer', location: 'Hyderabad', mode: 'Remote', detail: '5+ yrs', skills: ['React', 'TypeScript'], pay: '₹24L – ₹32L', per: 'per year',
    slug: 'tridizi-senior-frontend-engineer',
    type: 'job',
    summary: 'Own the storefront experience used by 400+ brands — architecture, performance, and a design system the whole company builds on.',
    posted: '3 days ago',
    applicants: '84 applicants',
    openings: '2 openings',
    aboutCompany: [
      'TriDizi Digital Innovations builds e-commerce and logistics platforms used by 400+ brands across India. The engineering team ships weekly, runs on a modern React and Node.js stack, and promotes from within aggressively.',
      'The frontend guild is a tight team of nine engineers who own everything the customer touches — from the storefront to the merchant dashboard — with full autonomy over tooling and architecture.',
    ],
    aboutRole: [
      'As a Senior Frontend Engineer you will own high-impact surfaces of the storefront platform end to end: you scope the work with product, design the component architecture, ship it behind flags, and watch the metrics move.',
      'This is a hands-on senior role, not a management one. You will spend most of your week in code, with the rest split between design reviews, mentoring two mid-level engineers, and shaping the frontend roadmap.',
    ],
    responsibilities: [
      'Design and build customer-facing features in React and TypeScript, from RFC to rollout',
      'Lead the evolution of the internal design system used by every product team',
      'Drive performance work — the team budget is sub-second LCP on 4G connections',
      'Review code daily and mentor mid-level engineers through pairing and design docs',
      'Partner with product and design to cut scope smartly and ship weekly',
    ],
    requirements: [
      '5+ years building production web apps, with deep React and TypeScript experience',
      'Strong grasp of web performance — bundling, caching, rendering strategies',
      'Experience owning a feature area end to end, including its technical decisions',
      'Comfort working async in a remote-first team with written design docs',
      'Clear written and spoken communication in English',
    ],
    niceToHave: [
      'Experience with design systems or component library ownership',
      'Familiarity with Node.js services and GraphQL APIs',
      'Prior work on e-commerce, logistics, or other high-traffic consumer products',
    ],
    benefits: [
      'Fully remote with quarterly team off-sites in Hyderabad',
      'Top-of-band pay reviewed every 12 months',
      '₹75k home-office and equipment budget',
      'Health insurance for you, spouse, and parents',
      'Dedicated learning budget and conference leave',
      'ESOPs with a 4-year vest and 1-year cliff',
    ],
  },
  {
    company: 'Incrediquo', initial: 'I', featured: false, title: 'Transcript Designer', location: 'Hyderabad', mode: 'Hybrid', detail: '3+ yrs', skills: ['Transcription', 'Design systems'], pay: '₹16L – ₹22L', per: 'per year',
    slug: 'incrediquo-transcript-designer',
    type: 'job',
    summary: 'Turn raw meeting and media transcripts into beautifully structured, readable documents that thousands of teams rely on daily.',
    posted: '1 week ago',
    applicants: '52 applicants',
    openings: '1 opening',
    aboutCompany: [
      'Incrediquo builds AI-powered transcription and knowledge tools used by media houses, law firms, and product teams across 14 countries. Accuracy is the product — and presentation is what makes accuracy usable.',
    ],
    aboutRole: [
      'Transcript Designers at Incrediquo sit at the intersection of language, information design, and product. You define how machine transcripts become documents people actually want to read — structure, hierarchy, speaker attribution, and summaries.',
      'You will own the transcript template system inside the product: every formatting rule, every layout decision, and the design-system tokens that power them across web and export formats.',
    ],
    responsibilities: [
      'Design and maintain the transcript template library across web, PDF, and DOCX exports',
      'Define typographic and structural standards for readability at scale',
      'Work with ML engineers to turn model output into clean, structured documents',
      'Run readability studies with customers and fold findings back into templates',
      'Keep the transcript design tokens consistent with the wider design system',
    ],
    requirements: [
      '3+ years in transcription, editorial design, or documentation-heavy product work',
      'A sharp eye for typography, hierarchy, and information design',
      'Working knowledge of design systems and token-based styling',
      'Excellent written English and an obsession with detail',
    ],
    niceToHave: [
      'Experience with speech-to-text products or subtitle workflows',
      'Basic HTML/CSS for prototyping templates',
      'Familiarity with legal or broadcast transcript standards',
    ],
    benefits: [
      'Hybrid schedule — three days in the Hyderabad studio',
      'Annual learning stipend for design courses',
      'Health insurance with dental cover',
      'Wellness allowance and no-meeting Fridays',
      'Relocation support if you are moving to Hyderabad',
    ],
  },
  {
    company: 'Navyoga Wellness', initial: 'NW', featured: true, title: 'Social Media Specialist', location: 'Hyderabad', mode: 'On-site', detail: '4+ yrs', skills: ['Social Media', 'Performance Marketing'], pay: '₹8L – ₹10L', per: 'per year',
    slug: 'navyoga-social-media-specialist',
    type: 'job',
    summary: 'Run the full social engine for a fast-growing wellness brand — organic content, paid campaigns, and a community of 300k+.',
    posted: '5 days ago',
    applicants: '128 applicants',
    openings: '1 opening',
    aboutCompany: [
      'Navyoga Wellness runs 12 wellness studios across Hyderabad and a D2C line of yoga and recovery products. The brand has grown 3x in two years, driven almost entirely by content and community.',
    ],
    aboutRole: [
      'You will own Navyoga\'s entire social presence — Instagram, YouTube, and LinkedIn — from content calendar to paid amplification. The channels are already healthy; your job is to make them compound.',
      'You will work directly with the founder and a two-person content studio (videographer and designer), so your ideas go from brief to published in days, not weeks.',
    ],
    responsibilities: [
      'Own the monthly content calendar across Instagram, YouTube, and LinkedIn',
      'Plan and run paid campaigns with a monthly performance budget',
      'Grow and moderate the 300k+ member community, including UGC programs',
      'Track channel and campaign metrics weekly and report growth experiments',
      'Coordinate shoots with the in-house videographer and designer',
    ],
    requirements: [
      '4+ years running social channels for a consumer brand',
      'Hands-on experience with Meta Ads Manager and performance reporting',
      'Strong copy instincts and a portfolio of channels you have grown',
      'Comfort being on-site at the Hyderabad studio five days a week',
    ],
    niceToHave: [
      'Interest in fitness, yoga, or wellness culture',
      'Short-form video editing skills (Reels/Shorts)',
      'Influencer partnership experience',
    ],
    benefits: [
      'Free membership across all 12 Navyoga studios',
      'Quarterly performance bonus tied to channel growth',
      'Health insurance and annual health check-up',
      'Employee discount on the full D2C product line',
      'Direct mentorship from the founding team',
    ],
  },
  {
    company: 'Sapience Minds', initial: 'SM', featured: false, title: 'HR Specialist', location: 'Bengaluru', mode: 'Remote', detail: '4+ yrs', skills: ['Team Management', 'Recruitment'], pay: '₹20L – ₹28L', per: 'per year',
    slug: 'sapience-minds-hr-specialist',
    type: 'job',
    summary: 'Build the hiring and people operations backbone for a 120-person consultancy scaling to 200 this year.',
    posted: '2 days ago',
    applicants: '61 applicants',
    openings: '1 opening',
    aboutCompany: [
      'Sapience Minds is a product and data consultancy of 120 people serving fintech and health-tech clients in India and the Gulf. The company is doubling this year, and people operations is the bottleneck it refuses to accept.',
    ],
    aboutRole: [
      'As HR Specialist you will own recruitment end to end for technical and consulting roles — sourcing strategy, structured interviews, and offer management — while building the people processes a 200-person company needs.',
      'You will report to the COO and work with a junior recruiter, with a mandate to bring structure without bringing bureaucracy.',
    ],
    responsibilities: [
      'Own full-cycle recruitment for engineering, data, and consulting roles',
      'Design structured interview loops and train interviewers to run them',
      'Run onboarding so new joiners are productive in their first two weeks',
      'Build lightweight performance and feedback cycles that people actually use',
      'Track hiring and retention metrics and report them monthly to leadership',
    ],
    requirements: [
      '4+ years in HR or talent acquisition, with technical hiring experience',
      'Track record of closing senior candidates in competitive markets',
      'Experience setting up HR processes at a growing company',
      'Strong stakeholder management — you will push back on hiring managers, kindly',
    ],
    niceToHave: [
      'Experience with HRIS and ATS tooling migrations',
      'Exposure to consulting or services business models',
      'Employer-branding or campus-hiring experience',
    ],
    benefits: [
      'Fully remote with a Bengaluru co-working pass if you want one',
      'Annual retreat with the whole company',
      'Health insurance for family, including parents',
      'Dedicated L&D budget for certifications',
      'Flexible hours around a 4-hour collaboration window',
    ],
  },
  {
    company: 'Dresma', initial: 'D', featured: false, title: 'Data Scientist', location: 'Gurugram', mode: 'Remote', detail: '3+ yrs', skills: ['SQL', 'Python'], pay: '₹18L – ₹26L', per: 'per year',
    slug: 'dresma-data-scientist',
    type: 'job',
    summary: 'Ship models that price, rank, and enhance millions of product images for e-commerce sellers worldwide.',
    posted: '6 days ago',
    applicants: '97 applicants',
    openings: '2 openings',
    aboutCompany: [
      'Dresma turns smartphone photos into studio-quality product imagery for e-commerce sellers in 30+ countries. Behind the product is a pipeline processing millions of images a month — and every improvement to it shows up directly in revenue.',
    ],
    aboutRole: [
      'You will join a five-person data team that owns everything from experiment design to models in production. The current roadmap includes image-quality scoring, churn prediction, and dynamic pricing for the enterprise tier.',
      'The team values shipped models over slide decks: most projects go from notebook to production within a sprint or two, with full ownership of the deployment.',
    ],
    responsibilities: [
      'Build and ship ML models for ranking, scoring, and pricing use cases',
      'Design experiments and own the metrics that decide whether features ship',
      'Write production-grade Python and SQL — the team deploys its own work',
      'Partner with product managers to turn vague questions into testable hypotheses',
      'Present findings to leadership in clear, decision-ready form',
    ],
    requirements: [
      '3+ years in data science with models running in production',
      'Strong Python and SQL; comfort with the standard ML stack',
      'Solid grounding in statistics and experiment design',
      'Ability to work independently in a remote, async-first team',
    ],
    niceToHave: [
      'Computer-vision experience or interest in image pipelines',
      'Familiarity with AWS and containerized deployments',
      'Experience in marketplace or e-commerce analytics',
    ],
    benefits: [
      'Remote-first with optional Gurugram office access',
      'Annual international team off-site',
      'Health insurance plus OPD cover',
      'Latest MacBook Pro and home-office setup',
      'Bi-annual compensation reviews',
    ],
  },
  {
    company: 'Yularatech', initial: 'Y', featured: true, title: 'Engineering Manager', location: 'Chennai', mode: 'Hybrid', detail: '8+ yrs', skills: ['Platform', 'Team of 12'], pay: '₹40L – ₹55L', per: 'per year',
    slug: 'yularatech-engineering-manager',
    type: 'job',
    summary: 'Lead the 12-engineer platform team that every product at Yularatech builds on — infra, internal tools, and developer experience.',
    posted: '1 day ago',
    applicants: '43 applicants',
    openings: '1 opening',
    aboutCompany: [
      'Yularatech provides IT consulting and managed engineering teams to enterprises across Asia-Pacific. Its internal platform group builds the infrastructure, CI/CD, and tooling that 200+ engineers use daily.',
    ],
    aboutRole: [
      'You will lead the platform team — 12 engineers across infrastructure, developer tooling, and internal services. The team\'s customers are Yularatech\'s own engineers, and its mission is to make shipping boring.',
      'This is a people-first leadership role with real technical depth: you will run the roadmap, grow the engineers, and still be close enough to the work to challenge a design review.',
    ],
    responsibilities: [
      'Lead, coach, and grow a team of 12 platform and infrastructure engineers',
      'Own the platform roadmap: CI/CD, observability, cloud cost, and internal tools',
      'Set engineering standards and drive their adoption across product teams',
      'Run hiring for the platform group and build its senior bench',
      'Report platform reliability and delivery metrics to the CTO',
    ],
    requirements: [
      '8+ years in software engineering, 3+ managing engineers directly',
      'Hands-on background in platform, infrastructure, or DevOps work',
      'Experience running roadmaps and delivery for internal-facing teams',
      'Strong coaching track record — engineers you managed got promoted',
      'Comfort with a hybrid schedule from the Chennai office',
    ],
    niceToHave: [
      'Kubernetes and multi-cloud experience',
      'Experience in consulting or client-services engineering organizations',
      'Public speaking or internal tech-talk culture building',
    ],
    benefits: [
      'Leadership coaching budget and executive mentorship',
      'Hybrid schedule — three days in the Chennai office',
      'Family health insurance with parental cover',
      'Annual bonus tied to platform reliability outcomes',
      'Relocation package for candidates moving to Chennai',
      'Extended parental leave policy',
    ],
  },
  {
    company: 'Oraddo', initial: 'O', featured: false, title: 'Product Designer', location: 'Mumbai', mode: 'Hybrid', detail: '4+ yrs', skills: ['Figma', 'Design systems'], pay: '₹22L – ₹30L', per: 'per year',
    slug: 'oraddo-product-designer',
    type: 'job',
    summary: 'Own end-to-end design for a consumer fintech product used by first-time investors — research to shipped screens.',
    posted: '4 days ago',
    applicants: '73 applicants',
    openings: '1 opening',
    aboutCompany: [
      'Oraddo builds consumer fintech products focused on first-time investors. Design leads the product process here — research and prototypes come before roadmaps, and designers present directly to the founders.',
    ],
    aboutRole: [
      'You will own one product squad\'s design surface end to end: discovery research, flows, high-fidelity screens, and the design-system contributions that come out of them.',
      'The team ships every two weeks, and designers stay with their work after launch — you will watch funnels, run usability sessions, and iterate on what the data says.',
    ],
    responsibilities: [
      'Own design for a product squad from discovery through launch',
      'Run user research and usability sessions monthly',
      'Contribute components and patterns back to the design system',
      'Partner daily with engineers to keep quality high through build',
      'Present design decisions and trade-offs to founders',
    ],
    requirements: [
      '4+ years designing shipped consumer products',
      'A portfolio showing end-to-end product thinking, not just visuals',
      'Fluency in Figma, including design-system workflows',
      'Comfort presenting and defending decisions with data',
    ],
    niceToHave: [
      'Fintech or regulated-industry experience',
      'Motion design or advanced prototyping skills',
      'Experience mentoring interns or junior designers',
    ],
    benefits: [
      'Hybrid schedule — two days in the Mumbai studio',
      'Annual design conference budget',
      'Health insurance with family cover',
      'ESOPs for all full-time roles',
      'Latest MacBook Pro and display setup',
    ],
  },
  {
    company: 'Aquire Lead', initial: 'AL', featured: true, title: 'Senior Backend Engineer', location: 'Chennai', mode: 'Remote', detail: '6+ yrs', skills: ['Go', 'PostgreSQL'], pay: '₹28L – ₹38L', per: 'per year',
    slug: 'aquire-lead-senior-backend-engineer',
    type: 'job',
    summary: 'Scale the event pipeline behind a revenue-intelligence platform processing millions of buyer signals a day.',
    posted: '2 days ago',
    applicants: '66 applicants',
    openings: '3 openings',
    aboutCompany: [
      'Aquire Lead builds revenue intelligence software for B2B sales teams, processing signals from millions of buyer interactions daily. The Chennai centre is its largest engineering hub, and the backend group owns the ingestion and scoring pipeline at the heart of the product.',
    ],
    aboutRole: [
      'You will work on the signal-ingestion pipeline — Go services, PostgreSQL, and a streaming layer — where throughput, correctness, and cost all matter at once.',
      'The team is remote-first with quarterly meetups in Chennai. Seniors here own services end to end, including their on-call, dashboards, and capacity planning.',
    ],
    responsibilities: [
      'Design and build high-throughput Go services for signal ingestion and scoring',
      'Own PostgreSQL schema design and query performance at scale',
      'Drive reliability work — SLOs, alerting, and incident reviews',
      'Review designs and code across the backend group',
      'Mentor mid-level engineers on distributed-systems fundamentals',
    ],
    requirements: [
      '6+ years building backend systems in production',
      'Strong Go (or deep experience in a comparable language, ready to switch)',
      'Serious PostgreSQL experience — indexing, partitioning, query plans',
      'Experience operating services you built, including on-call',
    ],
    niceToHave: [
      'Kafka or similar streaming-platform experience',
      'Exposure to sales-tech or B2B SaaS domains',
      'Contributions to open-source infrastructure tooling',
    ],
    benefits: [
      'Remote-first with quarterly Chennai meetups',
      'Top-quartile senior compensation with annual review',
      'Sabbatical policy after three years',
      'Family health insurance including parents',
      'Home-office and connectivity allowance',
    ],
  },
]

export const featuredInternships: JobInfo[] = [
  {
    company: 'TriDizi Digital Innovations', initial: 'T', featured: true, title: 'Frontend Developer Intern', location: 'Bengaluru', mode: 'Remote', detail: '6 months', skills: ['React', 'Tailwind'], pay: '₹40k', per: 'stipend / month',
    slug: 'tridizi-frontend-developer-intern',
    type: 'internship',
    summary: 'Ship real features to the storefront used by 400+ brands, with a dedicated mentor and a pre-placement offer on the table.',
    posted: '4 days ago',
    applicants: '210 applicants',
    openings: '3 openings',
    aboutCompany: [
      'TriDizi Digital Innovations builds e-commerce and logistics platforms used by 400+ brands across India. Interns join the same sprint teams as full-time engineers — no side projects, no shadow work.',
    ],
    aboutRole: [
      'Over six months you will ship production features in React and Tailwind, starting with scoped tickets and graduating to owning a small feature end to end by month three.',
      'Every intern gets a dedicated mentor, a weekly 1:1, and a mid-term review. Interns who perform well receive a pre-placement offer — over 60% of last year\'s batch converted.',
    ],
    responsibilities: [
      'Build UI features in React and Tailwind inside a production codebase',
      'Fix bugs and write tests alongside the frontend guild',
      'Participate in sprint planning, standups, and code reviews',
      'Own one scoped feature end to end by the end of the internship',
    ],
    requirements: [
      'Solid grasp of JavaScript, HTML, and CSS fundamentals',
      'At least one React project you can walk through in depth',
      'Available full-time for the entire 6-month duration',
      'Final-year students or recent graduates preferred',
    ],
    niceToHave: [
      'TypeScript exposure',
      'A deployed personal project or open-source contributions',
      'Familiarity with Git workflows and PR reviews',
    ],
    benefits: [
      '₹40k monthly stipend — among the highest for frontend internships',
      'Pre-placement offer track with a transparent rubric',
      'Dedicated 1:1 mentorship from a senior engineer',
      'Fully remote with a hardware loaner if needed',
      'Internship completion certificate and LinkedIn recommendation',
    ],
  },
  {
    company: 'Oraddo', initial: 'O', featured: false, title: 'UI/UX Design Intern', location: 'Mumbai', mode: 'Hybrid', detail: '3 months', skills: ['Figma', 'Prototyping'], pay: '₹25k', per: 'stipend / month',
    slug: 'oraddo-ui-ux-design-intern',
    type: 'internship',
    summary: 'Design real product flows with a senior design team in Mumbai — research, wireframes, and shipped screens in your portfolio.',
    posted: '1 week ago',
    applicants: '176 applicants',
    openings: '2 openings',
    aboutCompany: [
      'Oraddo builds consumer fintech products focused on first-time investors. Design leads the product process here — research and prototypes come before roadmaps.',
    ],
    aboutRole: [
      'You will be embedded with a senior designer on one product squad for the full three months, contributing to real releases rather than practice briefs.',
      'Expect a mix of user research sessions, wireframing, high-fidelity screens in Figma, and at least one usability study you help run yourself.',
    ],
    responsibilities: [
      'Produce wireframes and high-fidelity screens in Figma for live product work',
      'Assist in user interviews and usability testing sessions',
      'Maintain and extend components in the Oraddo design library',
      'Present your work in weekly design critiques',
    ],
    requirements: [
      'A portfolio showing UI work and your thinking process',
      'Working proficiency in Figma, including auto-layout and components',
      'Availability to be in the Mumbai studio 2–3 days a week',
    ],
    niceToHave: [
      'Motion or prototyping skills (Figma prototypes, Principle, or similar)',
      'Coursework or reading in interaction design and usability',
      'Interest in fintech and consumer psychology',
    ],
    benefits: [
      'Portfolio-grade shipped work within 3 months',
      'Mentorship from a senior product designer',
      'Hybrid flexibility with studio access in Mumbai',
      'Certificate and recommendation letter on completion',
      'High performers considered for full-time design roles',
    ],
  },
  {
    company: 'Incrediquo', initial: 'I', featured: true, title: 'Machine Learning Intern', location: 'Hyderabad', mode: 'On-site', detail: '6 months', skills: ['Python', 'NumPy'], pay: '₹50k', per: 'stipend / month',
    slug: 'incrediquo-machine-learning-intern',
    type: 'internship',
    summary: 'Work on production speech-to-text models with the research team — real datasets, real GPUs, and a paper-worthy problem.',
    posted: '2 days ago',
    applicants: '245 applicants',
    openings: '2 openings',
    aboutCompany: [
      'Incrediquo builds AI-powered transcription used by media houses and law firms in 14 countries. The ML team owns the full stack — data pipelines, model training, and serving infrastructure.',
    ],
    aboutRole: [
      'You will join the speech team in Hyderabad working on accent robustness for Indian English — a live research problem with direct product impact and dedicated GPU resources.',
      'The internship is structured like a research residency: a defined problem, a mentor from the core team, weekly reading groups, and a final presentation to the whole engineering org.',
    ],
    responsibilities: [
      'Build and clean training datasets for speech model experiments',
      'Run fine-tuning experiments and track them rigorously',
      'Contribute evaluation tooling in Python and NumPy',
      'Present findings in weekly reading groups and a final review',
    ],
    requirements: [
      'Strong Python and NumPy fundamentals',
      'Coursework in machine learning or deep learning',
      'Comfort reading ML papers and implementing ideas from them',
      'Available on-site in Hyderabad for the full 6 months',
    ],
    niceToHave: [
      'PyTorch experience',
      'Prior exposure to audio or NLP problems',
      'A Kaggle profile or research project you can discuss',
    ],
    benefits: [
      '₹50k monthly stipend — top of market for ML internships',
      'Dedicated GPU compute for your experiments',
      'Mentorship from published researchers',
      'Full-time conversion path onto the ML team',
      'Relocation assistance for out-of-town interns',
    ],
  },
  {
    company: 'Yularatech', initial: 'Y', featured: false, title: 'Backend Developer Intern', location: 'Pune', mode: 'Remote', detail: '6 months', skills: ['Node.js', 'MongoDB'], pay: '₹35k', per: 'stipend / month',
    slug: 'yularatech-backend-developer-intern',
    type: 'internship',
    summary: 'Build APIs and services used by enterprise clients, with production on-call shadowing and a full-time conversion track.',
    posted: '5 days ago',
    applicants: '164 applicants',
    openings: '4 openings',
    aboutCompany: [
      'Yularatech provides IT consulting and managed engineering teams to enterprises across Asia-Pacific. Backend interns join internal product teams building services that client projects depend on.',
    ],
    aboutRole: [
      'You will spend six months building Node.js services and MongoDB data layers, starting with well-scoped API endpoints and progressing to designing a small service of your own.',
      'The program includes production shadowing: by month four you will sit in on-call rotations with a senior engineer, learning how real systems fail and recover.',
    ],
    responsibilities: [
      'Build and document REST APIs in Node.js',
      'Design MongoDB schemas and write efficient queries',
      'Write integration tests and participate in code reviews',
      'Shadow production on-call and incident reviews',
    ],
    requirements: [
      'Good JavaScript fundamentals and basic Node.js experience',
      'Understanding of databases and HTTP APIs',
      'Available full-time remotely for 6 months',
    ],
    niceToHave: [
      'Experience with Express or Fastify',
      'Basic Docker knowledge',
      'A backend side project with a deployed API',
    ],
    benefits: [
      '₹35k monthly stipend',
      'Structured curriculum with fortnightly evaluations',
      'Production on-call shadowing experience',
      'Full-time offer track for top performers',
      'Remote-first with flexible hours',
    ],
  },
  {
    company: 'Dresma', initial: 'D', featured: false, title: 'Data Analyst Intern', location: 'Gurugram', mode: 'Hybrid', detail: '3 months', skills: ['SQL', 'Excel'], pay: '₹30k', per: 'stipend / month',
    slug: 'dresma-data-analyst-intern',
    type: 'internship',
    summary: 'Own real dashboards and answer real business questions for a global e-commerce imagery platform.',
    posted: '3 days ago',
    applicants: '142 applicants',
    openings: '2 openings',
    aboutCompany: [
      'Dresma turns smartphone photos into studio-quality product imagery for e-commerce sellers in 30+ countries. The analytics team sits with the business and answers the questions that drive pricing, retention, and growth.',
    ],
    aboutRole: [
      'You will work directly with the analytics lead on live business questions — churn cohorts, funnel drop-offs, and pricing experiments — using SQL and Excel daily.',
      'By the end of three months you will own at least two dashboards used weekly by leadership, and you will have presented your own analysis to the executive team.',
    ],
    responsibilities: [
      'Write SQL queries to answer product and business questions',
      'Build and maintain dashboards used by leadership',
      'Clean and reconcile data across billing and product systems',
      'Present one analysis per month to stakeholders',
    ],
    requirements: [
      'Working SQL knowledge — joins, aggregations, window functions a plus',
      'Strong Excel or Google Sheets skills',
      'Clear communication and comfort presenting numbers',
      'Available 2–3 days a week at the Gurugram office',
    ],
    niceToHave: [
      'Exposure to BI tools like Metabase, Looker, or Power BI',
      'Basic Python for data cleaning',
      'Statistics coursework',
    ],
    benefits: [
      '₹30k monthly stipend',
      'Direct mentorship from the analytics lead',
      'Executive-level presentation experience',
      'Certificate and strong reference on completion',
      'Conversion path to a full-time analyst role',
    ],
  },
  {
    company: 'Surwive', initial: 'S', featured: true, title: 'Digital Marketing Intern', location: 'Chennai', mode: 'Remote', detail: '3 months', skills: ['SEO', 'Content'], pay: '₹20k', per: 'stipend / month',
    slug: 'surwive-digital-marketing-intern',
    type: 'internship',
    summary: 'Grow the career platform you are looking at right now — SEO, content, and growth experiments with full visibility into the numbers.',
    posted: 'Today',
    applicants: '98 applicants',
    openings: '2 openings',
    aboutCompany: [
      'Surwive is the AI-powered career platform matching candidates to verified roles across India. The growth team is small, fast, and metrics-obsessed — every experiment gets a number and a verdict.',
    ],
    aboutRole: [
      'You will run real growth experiments on a live product: SEO content sprints, landing-page tests, and social distribution — with full access to the analytics behind them.',
      'You will work directly with the growth lead, ship something every week, and end the internship with a portfolio of experiments and their measured results.',
    ],
    responsibilities: [
      'Research keywords and write SEO content for the careers blog',
      'Run A/B tests on landing pages and report results',
      'Manage the content calendar across two social channels',
      'Track experiment metrics and maintain the growth dashboard',
    ],
    requirements: [
      'Excellent written English',
      'Understanding of SEO basics and content marketing',
      'A bias for measuring — you like knowing whether things worked',
    ],
    niceToHave: [
      'Experience with Google Analytics or Search Console',
      'A personal blog, newsletter, or social channel you have grown',
      'Canva or basic design skills',
    ],
    benefits: [
      '₹20k monthly stipend, fully remote',
      'Direct mentorship from the growth lead',
      'A measurable experiment portfolio by month three',
      'First consideration for full-time growth roles',
      'Flexible hours built around output, not attendance',
    ],
  },
  {
    company: 'Navyoga Wellness', initial: 'NW', featured: false, title: 'Content & Community Intern', location: 'Hyderabad', mode: 'Hybrid', detail: '3 months', skills: ['Content', 'Instagram'], pay: '₹15k', per: 'stipend / month',
    slug: 'navyoga-content-community-intern',
    type: 'internship',
    summary: 'Create content for a 300k+ wellness community and learn brand-building from the team that grew it 3x.',
    posted: '6 days ago',
    applicants: '119 applicants',
    openings: '2 openings',
    aboutCompany: [
      'Navyoga Wellness runs 12 wellness studios across Hyderabad and a D2C line of yoga and recovery products, with a 300k+ social community built almost entirely on content.',
    ],
    aboutRole: [
      'You will work with the social media specialist and the in-house content studio on daily community content — captions, stories, member spotlights, and event coverage from the studios.',
      'It is a hands-on apprenticeship in brand-building: you will draft, publish, measure, and iterate every week, with your best work going out to hundreds of thousands of followers.',
    ],
    responsibilities: [
      'Draft captions, stories, and community posts on the content calendar',
      'Cover studio events and turn them into short-form content',
      'Engage with community comments and DMs daily',
      'Track post performance and report what worked each week',
    ],
    requirements: [
      'Strong written English and an eye for what performs on Instagram',
      'Basic familiarity with Reels and story formats',
      'Available 2–3 days a week at the Hyderabad studios',
    ],
    niceToHave: [
      'Personal or college social accounts you have run',
      'Basic Canva or photo-editing skills',
      'Interest in yoga, fitness, or wellness',
    ],
    benefits: [
      'Free membership across all Navyoga studios',
      'Byline credit on published content',
      'Mentorship from the brand and content team',
      'Certificate and recommendation on completion',
    ],
  },
  {
    company: 'Sapience Minds', initial: 'SM', featured: false, title: 'Business Analyst Intern', location: 'Bengaluru', mode: 'On-site', detail: '6 months', skills: ['Excel', 'SQL'], pay: '₹25k', per: 'stipend / month',
    slug: 'sapience-minds-business-analyst-intern',
    type: 'internship',
    summary: 'Sit inside real client engagements at a 120-person consultancy — dashboards, models, and stakeholder decks that ship.',
    posted: '1 week ago',
    applicants: '134 applicants',
    openings: '3 openings',
    aboutCompany: [
      'Sapience Minds is a product and data consultancy of 120 people serving fintech and health-tech clients in India and the Gulf. Interns are staffed on live engagements from week one, alongside senior consultants.',
    ],
    aboutRole: [
      'You will support two client engagements over six months — building Excel models, writing SQL for reporting, and assembling the decks consultants actually present.',
      'The program is a structured pipeline into the analyst track: fortnightly feedback, a mid-term review, and a final case presentation to the partners.',
    ],
    responsibilities: [
      'Build and maintain Excel models and client dashboards',
      'Write SQL queries for recurring client reporting',
      'Prepare research and slides for client presentations',
      'Take structured notes in client calls and track follow-ups',
    ],
    requirements: [
      'Strong Excel skills — lookups, pivots, and clean model structure',
      'Basic SQL knowledge',
      'Clear written communication and attention to detail',
      'Available full-time at the Bengaluru office for 6 months',
    ],
    niceToHave: [
      'Coursework in business, economics, or statistics',
      'Exposure to Power BI or Tableau',
      'Prior internship or case-competition experience',
    ],
    benefits: [
      '₹25k monthly stipend',
      'Direct client exposure from week one',
      'Structured mentorship with fortnightly feedback',
      'Analyst-track conversion offer for top performers',
      'Lunch and commute allowance',
    ],
  },
]

export const jobCatalog: JobInfo[] = [...featuredJobs, ...featuredInternships]
