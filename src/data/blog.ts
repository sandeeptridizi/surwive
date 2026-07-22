import type { ComponentType } from 'react'
import { IconDoc, IconGear, IconGlobe, IconGrad, IconRupee, IconStar } from '../components/icons'

export type BlogBlock = { heading?: string; text?: string; list?: string[] }

export type BlogPost = {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
  author: string
  role: string
  bio: string
  tags: string[]
  intro: string
  sections: BlogBlock[]
}

export type BlogCategory = {
  name: string
  icon: ComponentType
  color: string
}

export const blogCategories: BlogCategory[] = [
  { name: 'Career Tips', icon: IconStar, color: '#ffc53d' },
  { name: 'Technology', icon: IconGear, color: '#7b8cff' },
  { name: 'Resume', icon: IconDoc, color: '#35d0bc' },
  { name: 'Remote Work', icon: IconGlobe, color: '#6fd88a' },
  { name: 'Salary', icon: IconRupee, color: '#ff7a50' },
  { name: 'Career Change', icon: IconGrad, color: '#c99cff' },
]

export function blogCategoryOf(post: BlogPost) {
  return blogCategories.find((c) => c.name === post.category) ?? blogCategories[0]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ace-your-next-job-interview',
    title: '10 Tips to Ace Your Next Job Interview',
    category: 'Career Tips',
    date: 'Jul 15, 2026',
    readTime: '5 min read',
    excerpt: 'Master the art of interviewing with these proven strategies that will help you stand out from other candidates.',
    author: 'Sarah Johnson',
    role: 'Senior Career Coach',
    bio: 'A senior career coach dedicated to helping professionals interview with confidence. With years of industry experience, she has guided thousands of candidates to offers they are proud of.',
    tags: ['Interview Tips', 'Tech Careers', 'Job Search'],
    intro: 'Technical interviews can be daunting, but with the right preparation and mindset, you can significantly increase your chances of success. In this comprehensive guide, we will walk you through everything you need to know to ace your next interview.',
    sections: [
      {
        heading: 'Understanding the Interview Process',
        text: 'Most tech interviews follow a similar structure: initial screening, technical assessment, behavioral questions, and system design for senior roles. Understanding each stage helps you prepare more effectively and walk in knowing exactly what to expect.',
      },
      {
        heading: 'Technical Preparation',
        text: 'Focus on these key areas:',
        list: [
          'Data structures and algorithms — practice on platforms like LeetCode and HackerRank',
          'System design — learn to design scalable systems',
          'Language-specific concepts — deep dive into your primary programming language',
          'Problem-solving patterns — recognize common patterns in coding problems',
        ],
      },
      {
        heading: 'Behavioral Interview Tips',
        text: 'Use the STAR method (Situation, Task, Action, Result) to structure your answers. Prepare stories that demonstrate your problem-solving skills, teamwork, and leadership abilities.',
      },
      {
        heading: 'Day of the Interview',
        text: 'Arrive early, dress appropriately, and bring copies of your resume. Stay calm, think out loud during technical questions, and do not be afraid to ask clarifying questions.',
      },
      {
        heading: 'Follow-Up',
        text: 'Send a thank-you email within 24 hours. Reiterate your interest in the position and mention something specific from the interview.',
      },
      {
        text: 'Remember, interviews are a two-way street. Evaluate whether the company culture and role align with your career goals.',
      },
    ],
  },
  {
    slug: 'how-ai-is-transforming-job-search',
    title: 'How AI is Transforming Job Search in 2026',
    category: 'Technology',
    date: 'Jul 12, 2026',
    readTime: '7 min read',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way candidates find jobs and employers find talent.',
    author: 'Michael Chen',
    role: 'AI & Future of Work Writer',
    bio: 'A technology writer covering AI, hiring platforms, and the future of work. He translates fast-moving research into practical advice job seekers can use today.',
    tags: ['AI Matching', 'Job Search', 'Hiring Tech'],
    intro: 'The days of firing off a hundred identical applications are ending. AI-powered matching now reads your skills, your preferences, and thousands of live roles at once — and hands you a shortlist instead of a haystack.',
    sections: [
      {
        heading: 'From Keyword Search to Real Matching',
        text: 'Traditional job boards match strings, not people. Modern AI copilots reason about your experience and the actual requirements of a role, surfacing fits a keyword search would never find.',
      },
      {
        heading: 'What AI Does for Candidates',
        list: [
          'Ranked shortlists — the best-fit roles rise to the top instead of the newest',
          'Instant skill-gap analysis — see exactly what a role needs that you are missing',
          'Smarter alerts — get pinged only when a genuinely strong match goes live',
          'Resume tailoring — highlight the experience each specific employer cares about',
        ],
      },
      {
        heading: 'What It Means for Employers',
        text: 'Recruiters spend less time screening and more time talking to qualified people. Verified skill signals reduce bias from pedigree and let non-traditional candidates compete on ability.',
      },
      {
        text: 'AI will not apply for you — but it will make sure every application you send actually counts.',
      },
    ],
  },
  {
    slug: 'building-a-standout-resume',
    title: 'Building a Standout Resume: A Complete Guide',
    category: 'Resume',
    date: 'Jul 10, 2026',
    readTime: '10 min read',
    excerpt: 'Learn how to craft a resume that catches recruiters attention and gets you more interview calls.',
    author: 'Emily Rodriguez',
    role: 'Resume Specialist',
    bio: 'A resume specialist who has reviewed over ten thousand resumes across tech, finance, and design. She focuses on clarity, evidence, and getting past the six-second scan.',
    tags: ['Resume', 'Job Search', 'Personal Branding'],
    intro: 'Recruiters spend six to eight seconds on a first pass of your resume. This guide shows you how to make every one of those seconds count — from structure to wording to the details most candidates get wrong.',
    sections: [
      {
        heading: 'Structure That Scans',
        text: 'Lead with a tight summary, then experience in reverse-chronological order. One page for under ten years of experience, clean single-column layout, and no photos or graphics that confuse applicant tracking systems.',
      },
      {
        heading: 'Write Achievements, Not Duties',
        text: 'Every bullet should follow a simple pattern: action verb, what you did, measurable result.',
        list: [
          'Weak: "Responsible for backend services"',
          'Strong: "Rebuilt order service in Go, cutting p99 latency 40%"',
          'Quantify everything — users, revenue, time saved, error rates',
        ],
      },
      {
        heading: 'Tailor for Every Application',
        text: 'Mirror the language of the job description in your skills and summary. It takes ten minutes and routinely doubles response rates.',
      },
      {
        text: 'Your resume is a marketing document, not an autobiography. Show the evidence that you can do this job, and cut everything else.',
      },
    ],
  },
  {
    slug: 'remote-work-best-practices',
    title: 'Remote Work: Best Practices for Success',
    category: 'Remote Work',
    date: 'Jul 8, 2026',
    readTime: '6 min read',
    excerpt: 'Essential tips for thriving in a remote work environment and maintaining work-life balance.',
    author: 'David Park',
    role: 'Remote Work Consultant',
    bio: 'A consultant helping distributed teams work well from anywhere. He has spent eight years leading and coaching fully remote engineering teams.',
    tags: ['Remote Work', 'Productivity', 'Work-Life Balance'],
    intro: 'Remote work gives you your commute back — and quietly hands you a dozen new ways to burn out. These are the habits that separate people who thrive remotely from people who merely survive it.',
    sections: [
      {
        heading: 'Design Your Environment',
        text: 'A dedicated workspace, even a corner of a room, tells your brain when work starts and ends. Invest in a good chair and light before you invest in anything else.',
      },
      {
        heading: 'Communicate Deliberately',
        list: [
          'Default to written, async updates — let people read on their schedule',
          'Over-communicate status; silence reads as absence on remote teams',
          'Turn cameras on for the meetings that matter, and cut the ones that do not',
        ],
      },
      {
        heading: 'Protect Your Boundaries',
        text: 'Set explicit start and stop times and put them in your calendar. The biggest remote-work risk is not slacking off — it is never logging off.',
      },
      {
        text: 'Remote work rewards intentionality. Build the structure your office used to provide, and you will do the best work of your career from anywhere.',
      },
    ],
  },
  {
    slug: 'negotiating-your-salary',
    title: 'Negotiating Your Salary: What You Need to Know',
    category: 'Salary',
    date: 'Jul 5, 2026',
    readTime: '8 min read',
    excerpt: 'Strategic advice on how to negotiate your salary and benefits package with confidence.',
    author: 'Lisa Thompson',
    role: 'Compensation Strategist',
    bio: 'A compensation strategist who has sat on both sides of the table. She helps candidates understand their market value and negotiate without fear.',
    tags: ['Salary', 'Negotiation', 'Offers'],
    intro: 'Most candidates accept the first number they are offered — and leave lakhs on the table over a career. Negotiation is not confrontation; it is a conversation employers expect you to have.',
    sections: [
      {
        heading: 'Know Your Number Before the Call',
        text: 'Research salary bands on multiple platforms, talk to peers in similar roles, and anchor on the full range for your skills and city — not on your current salary.',
      },
      {
        heading: 'The Rules of the Conversation',
        list: [
          'Never give the first number if you can avoid it — ask for their band',
          'Negotiate after the offer, when they have already chosen you',
          'Always respond with enthusiasm first, then ask for time to consider',
          'Get the final agreement in writing before you resign anywhere',
        ],
      },
      {
        heading: 'Look Beyond Base Pay',
        text: 'Joining bonus, ESOPs, learning budget, notice-period buyout, and remote flexibility are all negotiable. If the base is capped, move the conversation to the total package.',
      },
      {
        text: 'The worst realistic outcome of a polite negotiation is hearing "no". The worst outcome of not negotiating is never knowing what you gave up.',
      },
    ],
  },
  {
    slug: 'career-change-at-30',
    title: 'Career Change at 30: Is It Too Late?',
    category: 'Career Change',
    date: 'Jul 1, 2026',
    readTime: '9 min read',
    excerpt: 'Exploring career transitions and why it is never too late to pursue your passion.',
    author: 'James Wilson',
    role: 'Career Transition Mentor',
    bio: 'A mentor for mid-career professionals making bold moves. He changed industries twice before 35 and now helps others do it with less fear and more plan.',
    tags: ['Career Change', 'Upskilling', 'Motivation'],
    intro: 'Thirty feels like a deadline. It is not. Most people will work for another thirty-five years — long enough for two or three whole careers. The real question is not "is it too late?" but "what is the smartest way across?"',
    sections: [
      {
        heading: 'Your Experience Transfers',
        text: 'You are not starting from zero. Communication, project ownership, domain knowledge, and professional judgment all carry over — and often make career changers more valuable than fresh graduates within a year.',
      },
      {
        heading: 'Make the Move in Stages',
        list: [
          'Test the field first — freelance projects, weekend builds, shadowing',
          'Upskill deliberately with a portfolio, not just certificates',
          'Target bridge roles that combine your old domain with your new skill',
          'Keep six months of runway before any hard jump',
        ],
      },
      {
        heading: 'Handle the Interview Question',
        text: 'When asked why you are switching, tell a story of direction, not escape: what pulled you here, what you have already done about it, and why that history makes you better at this job.',
      },
      {
        text: 'The years will pass either way. In five of them you can be experienced in the career you actually want.',
      },
    ],
  },
  {
    slug: 'linkedin-profile-makeover',
    title: 'LinkedIn Profile Makeover: Get Noticed by Recruiters',
    category: 'Career Tips',
    date: 'Jun 27, 2026',
    readTime: '6 min read',
    excerpt: 'Turn your profile from an online resume into a magnet that brings recruiters to your inbox.',
    author: 'Sarah Johnson',
    role: 'Senior Career Coach',
    bio: 'A senior career coach dedicated to helping professionals interview with confidence. With years of industry experience, she has guided thousands of candidates to offers they are proud of.',
    tags: ['LinkedIn', 'Personal Branding', 'Job Search'],
    intro: 'Ninety percent of recruiters source candidates on LinkedIn before a role is ever posted. A profile tuned for search does your job hunting while you sleep.',
    sections: [
      {
        heading: 'Fix the Three Things Recruiters See First',
        list: [
          'Headline — say what you do and want, not just your title',
          'Photo and banner — clear, current, and professional',
          'About section — three short paragraphs: who, proof, what is next',
        ],
      },
      {
        heading: 'Load the Right Keywords',
        text: 'Recruiter search is keyword search. Put your target role, core skills, and tools in your headline, about, and experience sections — naturally, but everywhere.',
      },
      {
        heading: 'Signal That You Are Findable',
        text: 'Turn on Open to Work for recruiters, keep your location and preferences current, and post or comment once a week. Activity multiplies how often you appear in search.',
      },
      {
        text: 'Treat your profile like a landing page: one clear message, evidence to back it, and an obvious next step.',
      },
    ],
  },
  {
    slug: 'tech-skills-employers-want',
    title: 'Top 10 Tech Skills Employers Want Right Now',
    category: 'Technology',
    date: 'Jun 24, 2026',
    readTime: '8 min read',
    excerpt: 'The skills showing up most in live job listings — and how to start learning each one this month.',
    author: 'Michael Chen',
    role: 'AI & Future of Work Writer',
    bio: 'A technology writer covering AI, hiring platforms, and the future of work. He translates fast-moving research into practical advice job seekers can use today.',
    tags: ['Skills', 'Tech Careers', 'Upskilling'],
    intro: 'We analyzed thousands of live listings to see what employers actually ask for. The pattern is clear: AI literacy is now table stakes, and depth in one core area beats shallow breadth in five.',
    sections: [
      {
        heading: 'The Skills Rising Fastest',
        list: [
          'Applied AI and LLM integration — building on top of foundation models',
          'Cloud-native engineering — Kubernetes, serverless, cost optimization',
          'Data engineering — pipelines that feed analytics and AI systems',
          'Security engineering — every team is now a security team',
          'TypeScript and modern frontend — still the front door of every product',
        ],
      },
      {
        heading: 'How to Actually Learn Them',
        text: 'Pick one skill, build one real project, and ship it publicly. A deployed project with a readme beats five certificates in every screening conversation we see.',
      },
      {
        text: 'You do not need all ten. Employers hire for one deep skill and evidence you can learn the rest.',
      },
    ],
  },
  {
    slug: 'cover-letters-that-get-read',
    title: 'Cover Letters That Actually Get Read',
    category: 'Resume',
    date: 'Jun 20, 2026',
    readTime: '5 min read',
    excerpt: 'Most cover letters are deleted in seconds. Here is the short, specific format that survives.',
    author: 'Emily Rodriguez',
    role: 'Resume Specialist',
    bio: 'A resume specialist who has reviewed over ten thousand resumes across tech, finance, and design. She focuses on clarity, evidence, and getting past the six-second scan.',
    tags: ['Cover Letter', 'Job Search', 'Writing'],
    intro: 'The cover letter is not dead — the generic cover letter is. When a hiring manager is torn between two similar resumes, a sharp half-page letter is often the tiebreaker.',
    sections: [
      {
        heading: 'The Half-Page Formula',
        list: [
          'Opening line — name the role and one specific reason this company',
          'Middle — one story that proves you can do their hardest requirement',
          'Close — restate fit in one sentence and ask for the conversation',
        ],
      },
      {
        heading: 'What Gets Letters Deleted',
        text: 'Repeating your resume, flattery without specifics, and anything over one page. If a sentence could be sent to any company, cut it.',
      },
      {
        text: 'Write it in fifteen minutes, make it impossible to mistake for a template, and send it only where you genuinely want the job.',
      },
    ],
  },
  {
    slug: 'staying-visible-on-remote-teams',
    title: 'Staying Visible on a Distributed Team',
    category: 'Remote Work',
    date: 'Jun 17, 2026',
    readTime: '7 min read',
    excerpt: 'Out of sight should not mean out of mind. How remote employees get promoted at the same rate as office ones.',
    author: 'David Park',
    role: 'Remote Work Consultant',
    bio: 'A consultant helping distributed teams work well from anywhere. He has spent eight years leading and coaching fully remote engineering teams.',
    tags: ['Remote Work', 'Career Growth', 'Communication'],
    intro: 'The data is uncomfortable: remote employees are promoted less often than their in-office peers doing the same work. The difference is rarely output — it is visibility. Visibility is a skill, and you can learn it.',
    sections: [
      {
        heading: 'Make Your Work Legible',
        text: 'Ship a short weekly summary of what you moved forward, decisions you made, and what is next. Managers cannot advocate for work they cannot see.',
      },
      {
        heading: 'Build Presence Deliberately',
        list: [
          'Speak early in meetings — the first two minutes set who is "in the room"',
          'Volunteer for cross-team work; it multiplies who knows your name',
          'Keep a running brag document and bring it to every review',
        ],
      },
      {
        text: 'None of this is politics. It is making sure the people deciding your future have accurate information about your work.',
      },
    ],
  },
  {
    slug: 'decoding-your-ctc',
    title: 'Decoding Your CTC: Salary Structures Explained',
    category: 'Salary',
    date: 'Jun 13, 2026',
    readTime: '6 min read',
    excerpt: 'Base, HRA, PF, ESOPs, variable pay — what your offer letter really means for your bank account.',
    author: 'Lisa Thompson',
    role: 'Compensation Strategist',
    bio: 'A compensation strategist who has sat on both sides of the table. She helps candidates understand their market value and negotiate without fear.',
    tags: ['Salary', 'CTC', 'Offers'],
    intro: 'Two offers with the same CTC can differ by lakhs in actual take-home. Before you compare numbers, you need to know what each line in the offer letter really pays you — and when.',
    sections: [
      {
        heading: 'The Parts of a CTC',
        list: [
          'Base salary — the only number that is fully guaranteed cash',
          'HRA and allowances — cash with tax implications worth checking',
          'PF and gratuity — yours, but locked away for years',
          'Variable pay — ask for the actual payout history, not the target',
          'ESOPs — potentially valuable, worth zero until a liquidity event',
        ],
      },
      {
        heading: 'Compare Offers on Take-Home',
        text: 'Convert every offer to monthly in-hand plus guaranteed annual cash. A lower CTC with higher base regularly beats a flashier number built on variable pay and options.',
      },
      {
        text: 'Ask for the full salary structure in writing before accepting. Any employer unwilling to share it is telling you something.',
      },
    ],
  },
  {
    slug: 'campus-to-corporate-first-90-days',
    title: 'From Campus to Corporate: Your First 90 Days',
    category: 'Career Change',
    date: 'Jun 10, 2026',
    readTime: '9 min read',
    excerpt: 'A practical playbook for new graduates to turn their first job into a launchpad.',
    author: 'James Wilson',
    role: 'Career Transition Mentor',
    bio: 'A mentor for mid-career professionals making bold moves. He changed industries twice before 35 and now helps others do it with less fear and more plan.',
    tags: ['Freshers', 'First Job', 'Career Growth'],
    intro: 'Nobody expects a new graduate to be brilliant in month one. They expect you to be reliable, curious, and improving. Here is how to spend your first ninety days so the next thousand go your way.',
    sections: [
      {
        heading: 'Days 1–30: Learn the Terrain',
        text: 'Ask questions relentlessly, write everything down, and map who owns what. Your only deliverable this month is understanding how the team actually works.',
      },
      {
        heading: 'Days 31–60: Earn Trust With Small Wins',
        list: [
          'Finish what you start — reliability beats brilliance early on',
          'Take the tickets nobody wants and do them well',
          'Share progress before anyone has to ask for it',
        ],
      },
      {
        heading: 'Days 61–90: Take Ownership',
        text: 'Volunteer to own one small area end to end. Owning something — however small — is what turns "the new hire" into a teammate people count on.',
      },
      {
        text: 'Careers compound. The habits you set in your first quarter are the interest rate.',
      },
    ],
  },
]
