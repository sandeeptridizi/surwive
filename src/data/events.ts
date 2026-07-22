import type { DriveEvent } from './drives'

export type EventInfo = DriveEvent & {
  slug: string
  price: string
  priceNote: string
  attendees: string
  organizerRole: string
  about: string[]
  highlights: string[]
  agenda: { time: string; item: string }[]
  speakers: { name: string; role: string }[]
  companies: string[]
  bring: string[]
}

export const eventTypeColors: Record<string, string> = {
  Hackathon: '#ff7a50',
  Conference: '#7b8cff',
  Webinar: '#ffc53d',
  Meetup: '#35d0bc',
  Workshop: '#6fd88a',
}

export function eventAccent(event: EventInfo) {
  return eventTypeColors[event.type] ?? '#ffc53d'
}

export const eventCatalog: EventInfo[] = [
  {
    host: 'Surwive', title: 'CodeStorm 48-Hour Hackathon', type: 'Hackathon', day: '19', month: 'Jul', time: 'Kicks off 6:00 PM', location: 'India-wide', mode: 'Online', tags: ['Teams of 2–4', 'Any stack'], perk: '₹5L prize pool',
    slug: 'codestorm-48-hour-hackathon',
    price: 'Free',
    priceNote: 'Team registration required',
    attendees: '3,000+ hackers expected',
    organizerRole: 'Event organizer',
    about: [
      'CodeStorm is India\'s biggest online hackathon of the season — 48 hours, any stack, one open theme revealed at kickoff. Build solo-quality polish with team-scale ambition and ship something real by Sunday evening.',
      'Whether you are a first-time hacker or a serial finalist, CodeStorm is your shot at a ₹5L prize pool, pre-placement interviews with sponsor companies, and mentor hours with engineers who have shipped at scale.',
    ],
    highlights: [
      '₹5L prize pool across 6 tracks',
      'Pre-placement interviews for finalists',
      '1:1 mentor hours all weekend',
      'Open theme — build in any stack',
      'Swag and certificates for every submission',
      'Live demo day judged by CTOs',
    ],
    agenda: [
      { time: 'Fri 6:00 PM', item: 'Kickoff and theme reveal' },
      { time: 'Fri 7:00 PM', item: 'Team formation and idea pitches' },
      { time: 'Sat 11:00 AM', item: 'Checkpoint 1 — mentor feedback round' },
      { time: 'Sat 8:00 PM', item: 'Checkpoint 2 — progress demos' },
      { time: 'Sun 4:00 PM', item: 'Code freeze and submissions close' },
      { time: 'Sun 6:00 PM', item: 'Live demos, judging, and winners' },
    ],
    speakers: [
      { name: 'Arjun Mehta', role: 'CTO, Surwive' },
      { name: 'Kavya Nair', role: 'Principal Engineer, Oraddo' },
      { name: 'Rohit Sharma', role: 'VP Engineering, TriDizi' },
    ],
    companies: ['Surwive', 'Oraddo', 'TriDizi', 'Google', 'Cognizant', 'Tech Mahendra', 'Incrediquo', 'Aquire Lead'],
    bring: [
      'A stable internet connection and a quiet corner',
      'Your team of 2–4 (or find one at kickoff)',
      'A GitHub account for submissions',
      'Snacks — it is 48 hours, after all',
    ],
  },
  {
    host: 'TriDizi', title: 'Resume Roast — Live Teardown', type: 'Webinar', day: '24', month: 'Jul', time: '7:00 PM – 8:30 PM', location: 'Streamed live', mode: 'Online', tags: ['Free entry', 'Live Q&A'], perk: 'Recruiter panel',
    slug: 'resume-roast-live-teardown',
    price: 'Free',
    priceNote: 'Limited live seats',
    attendees: '1,200+ registered',
    organizerRole: 'Event organizer',
    about: [
      'Watch a panel of working recruiters tear down real resumes live — what they read first, what they skip, and what gets a profile rejected in six seconds. Brutal, kind, and extremely useful.',
      'Submit your own resume when you register for a chance to have it reviewed on stream, and leave with a checklist you can apply the same night.',
    ],
    highlights: [
      'Live teardowns of real resumes',
      'Panel of recruiters from product companies',
      'Open Q&A for the full second half',
      'Resume checklist shared with every attendee',
    ],
    agenda: [
      { time: '7:00 PM', item: 'Welcome and the six-second scan' },
      { time: '7:10 PM', item: 'Live teardowns — five real resumes' },
      { time: '7:50 PM', item: 'The rewrite: fixing the worst one live' },
      { time: '8:10 PM', item: 'Open Q&A with the recruiter panel' },
    ],
    speakers: [
      { name: 'Sneha Kulkarni', role: 'Talent Lead, TriDizi' },
      { name: 'Aman Verma', role: 'Senior Recruiter, Google' },
      { name: 'Priya Iyer', role: 'Hiring Manager, Surwive' },
    ],
    companies: ['TriDizi', 'Google', 'Surwive', 'Oraddo'],
    bring: [
      'Your current resume, open and ready to edit',
      'Questions for the panel',
      'A notebook — the checklist moves fast',
    ],
  },
  {
    host: 'Oraddo', title: 'AI Builders Summit 2026', type: 'Conference', day: '02', month: 'Aug', time: '9:00 AM – 6:00 PM', location: 'Bengaluru', mode: 'Hybrid', tags: ['Keynotes', 'Live demos'], perk: '2,000+ builders',
    slug: 'ai-builders-summit-2026',
    price: '₹999',
    priceNote: 'Early-bird pass · online is free',
    attendees: '2,000+ builders expected',
    organizerRole: 'Event organizer',
    about: [
      'A full day of keynotes, live demos, and hallway conversations with the people actually shipping AI products in India. No vendor fluff — every talk is by a builder, about something in production.',
      'Attend in person in Bengaluru or join the free livestream. In-person passes include workshop access, lunch, and the evening networking mixer.',
    ],
    highlights: [
      'Keynotes from founders and staff engineers',
      'Live demos of production AI systems',
      'Hands-on workshops in the afternoon track',
      'Evening networking mixer with hiring teams',
      'Free livestream for online attendees',
    ],
    agenda: [
      { time: '9:00 AM', item: 'Registration and coffee' },
      { time: '10:00 AM', item: 'Opening keynote — the state of applied AI' },
      { time: '11:30 AM', item: 'Live demo block — agents in production' },
      { time: '1:00 PM', item: 'Lunch and expo floor' },
      { time: '2:30 PM', item: 'Workshops — build an AI feature end to end' },
      { time: '5:00 PM', item: 'Closing panel and networking mixer' },
    ],
    speakers: [
      { name: 'Ananya Rao', role: 'Founder, Oraddo' },
      { name: 'Vikram Singh', role: 'Staff ML Engineer, Google' },
      { name: 'Meera Joshi', role: 'Head of AI, Surwive' },
    ],
    companies: ['Oraddo', 'Google', 'Surwive', 'Cognizant', 'Tech Mahendra', 'TriDizi', 'Incrediquo'],
    bring: [
      'Your pass QR code (emailed after registration)',
      'A laptop for the afternoon workshops',
      'Business cards or a LinkedIn QR — the mixer is worth it',
    ],
  },
  {
    host: 'Tech Mahendra', title: 'CloudCraft Hackathon', type: 'Hackathon', day: '08', month: 'Aug', time: '48 hours non-stop', location: 'Pune', mode: 'Hybrid', tags: ['Cloud-native', 'Open theme'], perk: 'PPIs for top 3',
    slug: 'cloudcraft-hackathon',
    price: 'Free',
    priceNote: 'Shortlist-based entry',
    attendees: '800+ engineers expected',
    organizerRole: 'Event organizer',
    about: [
      'CloudCraft is a 48-hour cloud-native build sprint: take an open theme and ship something that scales — on Kubernetes, serverless, or whatever you can defend in front of the judges.',
      'The top three teams walk away with pre-placement interviews at Tech Mahendra, and every shortlisted participant gets cloud credits to keep building after the weekend.',
    ],
    highlights: [
      'Pre-placement interviews for the top 3 teams',
      'Cloud credits for every shortlisted team',
      'On-site war room in Pune plus a remote track',
      'Judged on architecture, not just demos',
    ],
    agenda: [
      { time: 'Fri 9:00 AM', item: 'Check-in and theme briefing' },
      { time: 'Fri 10:00 AM', item: 'Hacking begins' },
      { time: 'Sat 12:00 PM', item: 'Architecture review with mentors' },
      { time: 'Sun 9:00 AM', item: 'Submissions close' },
      { time: 'Sun 12:00 PM', item: 'Final demos and winners' },
    ],
    speakers: [
      { name: 'Rajesh Kumar', role: 'Cloud Practice Head, Tech Mahendra' },
      { name: 'Divya Menon', role: 'SRE Lead, Oraddo' },
      { name: 'Karthik Reddy', role: 'Platform Architect, Surwive' },
    ],
    companies: ['Tech Mahendra', 'Oraddo', 'Surwive', 'Google', 'Aquire Lead'],
    bring: [
      'Laptop and chargers — power strips are scarce',
      'Government ID for venue entry (on-site track)',
      'Your own dev environment, pre-configured',
    ],
  },
  {
    host: 'Cognizant', title: 'FinTech Sprint Hackathon', type: 'Hackathon', day: '30', month: 'Aug', time: '24 hours flat', location: 'Bengaluru', mode: 'On-site', tags: ['Payments', 'APIs'], perk: '₹2L + fast-track interviews',
    slug: 'fintech-sprint-hackathon',
    price: 'Free',
    priceNote: 'Registration closes Aug 20',
    attendees: '500+ participants expected',
    organizerRole: 'Event organizer',
    about: [
      'One day, one domain: payments. Build on real sandbox APIs — UPI flows, reconciliation, fraud signals — and pitch to judges who run fintech platforms for a living.',
      '₹2L in prizes, and every finalist team gets fast-tracked past the first two interview rounds at Cognizant\'s fintech practice.',
    ],
    highlights: [
      '₹2L prize pool',
      'Fast-track interviews for all finalists',
      'Real payment sandbox APIs to build on',
      'Fraud-detection bonus track',
    ],
    agenda: [
      { time: '8:00 AM', item: 'Check-in and API sandbox setup' },
      { time: '9:00 AM', item: 'Problem statements revealed — hacking begins' },
      { time: '2:00 PM', item: 'Mid-sprint mentor checkpoint' },
      { time: '8:00 AM +1', item: 'Code freeze' },
      { time: '10:00 AM +1', item: 'Demos, judging, and awards' },
    ],
    speakers: [
      { name: 'Suresh Babu', role: 'Fintech Practice Director, Cognizant' },
      { name: 'Nidhi Agarwal', role: 'Payments Lead, Oraddo' },
      { name: 'Farhan Ali', role: 'Risk Engineering Manager, Surwive' },
    ],
    companies: ['Cognizant', 'Oraddo', 'Surwive', 'TriDizi'],
    bring: [
      'Laptop, chargers, and a valid photo ID',
      'A teammate or two — max team size is 3',
      'Comfortable clothes; it is 24 hours straight',
    ],
  },
  {
    host: 'T Hub', title: 'Women in Tech Meetup', type: 'Meetup', day: '14', month: 'Aug', time: '5:00 PM – 8:00 PM', location: 'Hyderabad', mode: 'On-site', tags: ['Networking', 'Mentorship'], perk: 'Free passes',
    slug: 'women-in-tech-meetup',
    price: 'Free',
    priceNote: 'RSVP required — limited seats',
    attendees: '300+ attendees expected',
    organizerRole: 'Event organizer',
    about: [
      'An evening of honest conversations, mentorship matchmaking, and community — for women in tech at every stage, from first internship to first board seat.',
      'Come for the lightning talks, stay for the mentor circles: small-group sessions with senior engineers and leaders who have navigated the exact questions you are carrying.',
    ],
    highlights: [
      'Mentor circles with senior women in tech',
      'Lightning talks — five stories, five minutes each',
      'Hiring corner with women-led teams',
      'Open networking over dinner',
    ],
    agenda: [
      { time: '5:00 PM', item: 'Doors open and welcome' },
      { time: '5:30 PM', item: 'Lightning talks' },
      { time: '6:15 PM', item: 'Mentor circles — small group sessions' },
      { time: '7:15 PM', item: 'Open networking and hiring corner' },
    ],
    speakers: [
      { name: 'Lakshmi Prasad', role: 'Director of Engineering, T Hub' },
      { name: 'Ritika Shah', role: 'Founding Engineer, Oraddo' },
      { name: 'Sana Qureshi', role: 'Engineering Manager, Google' },
    ],
    companies: ['T Hub', 'Google', 'Oraddo', 'Surwive', 'TriDizi'],
    bring: [
      'Your RSVP confirmation',
      'One question you want a mentor to answer',
      'A friend who should be in this room too',
    ],
  },
  {
    host: 'Dresma', title: 'Mock Interview Marathon', type: 'Workshop', day: '17', month: 'Aug', time: '10:00 AM – 5:00 PM', location: 'Gurugram', mode: 'Hybrid', tags: ['Tech & non-tech', 'Live feedback'], perk: 'Real interviewers',
    slug: 'mock-interview-marathon',
    price: '₹299',
    priceNote: 'Refunded if you attend all three rounds',
    attendees: '500+ registered',
    organizerRole: 'Event organizer',
    about: [
      'A full day of real interview practice: three back-to-back mock rounds — technical, case, and HR — each run by people who conduct these interviews for a living, each followed by written feedback on the spot.',
      'Slots exist for engineering, data, design, and business roles. You leave with three scorecards, a prioritized improvement list, and far less fear of the real thing.',
    ],
    highlights: [
      'Three full mock rounds in one day',
      'Written scorecards after every round',
      'Interviewers from hiring product companies',
      'Tracks for tech, data, design, and business',
      'Hybrid — attend on-site or over video',
    ],
    agenda: [
      { time: '10:00 AM', item: 'Check-in and track briefing' },
      { time: '10:30 AM', item: 'Round 1 — technical or domain mock' },
      { time: '1:00 PM', item: 'Round 2 — case and problem-solving mock' },
      { time: '3:00 PM', item: 'Round 3 — HR and salary-talk mock' },
      { time: '4:30 PM', item: 'Feedback synthesis and next-steps clinic' },
    ],
    speakers: [
      { name: 'Nikhil Bansal', role: 'Head of Talent, Dresma' },
      { name: 'Aman Verma', role: 'Senior Recruiter, Google' },
      { name: 'Meher Kapadia', role: 'Design Director, Incrediquo' },
    ],
    companies: ['Dresma', 'Google', 'Incrediquo', 'Surwive', 'Sapience Minds'],
    bring: [
      'Your resume — the mocks run off it',
      'A role or company you are actually targeting',
      'Laptop if you are joining the technical track',
    ],
  },
  {
    host: 'Incrediquo', title: 'VoiceHack — Speech AI Hackathon', type: 'Hackathon', day: '23', month: 'Aug', time: '24 hours', location: 'Hyderabad', mode: 'On-site', tags: ['Speech AI', 'Solo or duo'], perk: '₹3L + GPU credits',
    slug: 'voicehack-speech-ai-hackathon',
    price: 'Free',
    priceNote: 'Shortlist-based entry — apply with an idea',
    attendees: '400 builders on-site',
    organizerRole: 'Event organizer',
    about: [
      'Twenty-four hours to build something remarkable with speech: transcription tools, voice interfaces, accessibility tech, or something nobody has named yet. Incrediquo opens its speech APIs and GPU cluster for the weekend.',
      'Entry is shortlist-based — apply with a one-paragraph idea. Selected builders hack on-site in Hyderabad with mentors from the speech team on the floor all night.',
    ],
    highlights: [
      '₹3L prize pool plus GPU credits for winners',
      'Free access to Incrediquo speech APIs',
      'Mentors from the core speech team all night',
      'Fast-track ML interviews for finalists',
      'Meals, energy drinks, and sleeping pods on-site',
    ],
    agenda: [
      { time: 'Sat 10:00 AM', item: 'Doors open — API keys and team setup' },
      { time: 'Sat 12:00 PM', item: 'Hacking begins' },
      { time: 'Sat 8:00 PM', item: 'Mentor checkpoint — kill or commit' },
      { time: 'Sun 10:00 AM', item: 'Code freeze' },
      { time: 'Sun 12:00 PM', item: 'Demos, judging, and awards' },
    ],
    speakers: [
      { name: 'Dr. Kavya Nair', role: 'Head of Speech Research, Incrediquo' },
      { name: 'Arjun Mehta', role: 'CTO, Surwive' },
      { name: 'Vikram Rao', role: 'Head of Data Hiring, Oraddo' },
    ],
    companies: ['Incrediquo', 'Surwive', 'Oraddo', 'Google', 'Tech Mahendra'],
    bring: [
      'Your laptop and chargers',
      'Your shortlist confirmation email',
      'A teammate if you applied as a duo',
      'Government photo ID for venue entry',
    ],
  },
]
