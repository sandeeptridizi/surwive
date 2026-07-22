import type { ComponentType } from 'react'
import { IconDoc, IconGear, IconGlobe, IconShieldCheck, IconUsers } from '../components/icons'

export type PolicySection = { heading: string; text?: string; list?: string[] }

export type PolicyInfo = {
  slug: string
  title: string
  shortTitle: string
  icon: ComponentType
  color: string
  updated: string
  summary: string
  intro: string
  sections: PolicySection[]
}

export const policyCatalog: PolicyInfo[] = [
  {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    shortTitle: 'Terms & Conditions',
    icon: IconDoc,
    color: '#ffc53d',
    updated: 'Jul 21, 2026',
    summary: 'The rules of the road for using Surwive — what you can expect from us, and what we expect from you.',
    intro:
      'These Terms & Conditions ("Terms") govern your access to and use of the Surwive platform, including our website, job listings, walk-in drives, events, and related services. By creating an account or using any part of the platform, you agree to these Terms. Please read them carefully.',
    sections: [
      {
        heading: 'Who can use Surwive',
        text: 'You must be at least 18 years old, or the age of majority in your jurisdiction, to create an account. By registering you confirm that the information you provide — including your name, contact details, education, and work history — is accurate and kept up to date. Accounts are personal and may not be shared, sold, or transferred.',
      },
      {
        heading: 'Our services',
        text: 'Surwive connects candidates with employers through verified job listings, internships, walk-in drives, and hiring events. We verify openings before they go live, but we act as a platform — the hiring decision, employment contract, and workplace relationship are strictly between you and the employer.',
      },
      {
        heading: 'Your responsibilities',
        list: [
          'Provide truthful, current, and complete information in your profile and applications',
          'Keep your login credentials confidential and notify us of any unauthorized use',
          'Use the platform only for lawful, employment-related purposes',
          'Respect recruiters, employers, and other candidates in all interactions',
          'Do not scrape, copy, or redistribute listings or platform content without written permission',
        ],
      },
      {
        heading: 'Prohibited conduct',
        list: [
          'Posting false, misleading, or fraudulent information or job listings',
          'Impersonating another person, company, or Surwive staff',
          'Uploading malicious code or attempting to breach platform security',
          'Charging candidates fees to apply — hiring on Surwive is always free for candidates',
          'Harassment, discrimination, or abusive behaviour of any kind',
        ],
      },
      {
        heading: 'Paid plans and billing',
        text: 'Some features — such as priority applications for candidates or promoted listings for employers — are offered under paid plans described on our Pricing page. Fees are billed in advance, are non-transferable, and except where required by law, are non-refundable once the billing period has started. We will always notify you before a price change takes effect.',
      },
      {
        heading: 'Intellectual property',
        text: 'The Surwive name, logo, design, and platform content are owned by Surwive or its licensors. You retain ownership of the content you upload — such as your resume — and grant us a limited licence to store, display, and share it with employers you apply to, solely to provide the service.',
      },
      {
        heading: 'Termination',
        text: 'You may close your account at any time from your profile settings. We may suspend or terminate accounts that violate these Terms, with notice where practical. Sections relating to intellectual property, liability, and disputes survive termination.',
      },
      {
        heading: 'Limitation of liability',
        text: 'Surwive provides the platform "as is" and does not guarantee employment, interview outcomes, or the conduct of employers. To the maximum extent permitted by law, our total liability for any claim arising from your use of the platform is limited to the amount you paid us in the twelve months before the claim arose.',
      },
      {
        heading: 'Changes to these Terms',
        text: 'We may update these Terms as the platform evolves. Material changes will be announced on the platform or by email at least 14 days before they take effect. Continued use after that date constitutes acceptance of the updated Terms.',
      },
    ],
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    shortTitle: 'Privacy Policy',
    icon: IconShieldCheck,
    color: '#7b8cff',
    updated: 'Jul 21, 2026',
    summary: 'What personal data we collect, why we collect it, and the choices you have over it.',
    intro:
      'Your trust matters to us. This Privacy Policy explains what personal data Surwive collects when you use the platform, how we use and share it, how long we keep it, and the rights you have over it. It applies to candidates, employers, and visitors alike.',
    sections: [
      {
        heading: 'Data we collect',
        list: [
          'Account data — name, email address, phone number, and password',
          'Profile data — education, skills, work history, resume, and career preferences',
          'Application data — the roles, drives, and events you apply to or register for',
          'Usage data — pages visited, searches made, and features used on the platform',
          'Device data — browser type, IP address, and approximate location derived from it',
        ],
      },
      {
        heading: 'How we use your data',
        list: [
          'Matching you with relevant jobs, internships, walk-in drives, and events',
          'Sharing your profile and resume with employers for roles you apply to',
          'Sending application updates, interview invitations, and service notifications',
          'Sending the newsletter and career tips you opted into — unsubscribe any time',
          'Improving the platform through aggregated, de-identified analytics',
          'Preventing fraud, spam, and fake listings',
        ],
      },
      {
        heading: 'What we never do',
        list: [
          'We never sell your personal data to third parties',
          'We never share your profile with an employer unless you applied or registered',
          'We never charge candidates for applications — beware of anyone who does',
        ],
      },
      {
        heading: 'When we share data',
        text: 'We share your data with employers you apply to, with service providers who help us run the platform (such as hosting, email delivery, and analytics providers) under strict contracts, and with authorities when the law requires it. Employers receiving your data must use it only for their hiring process.',
      },
      {
        heading: 'How long we keep it',
        text: 'We keep your account data while your account is active. If you close your account, profile and application data are deleted or anonymised within 90 days, except records we must keep for legal, tax, or dispute-resolution purposes. Newsletter subscriptions are removed immediately on unsubscribe.',
      },
      {
        heading: 'Your rights',
        list: [
          'Access and download a copy of the personal data we hold about you',
          'Correct inaccurate data directly from your profile settings',
          'Delete your account and associated data',
          'Withdraw consent for marketing at any time',
          'Object to or restrict certain processing, and lodge a complaint with your data-protection authority',
        ],
      },
      {
        heading: 'Contact us',
        text: 'For any privacy question or to exercise your rights, write to privacy@surwive.com. We respond to verified requests within 30 days.',
      },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    shortTitle: 'Cookie Policy',
    icon: IconGear,
    color: '#ff7a50',
    updated: 'Jul 21, 2026',
    summary: 'The cookies and similar technologies we use, what they do, and how you can control them.',
    intro:
      'Like most websites, Surwive uses cookies and similar technologies — small files stored on your device — to keep you signed in, remember your preferences, and understand how the platform is used. This policy explains each type we use and the controls available to you.',
    sections: [
      {
        heading: 'What cookies are',
        text: 'Cookies are small text files that a website places on your browser. They let the site recognise your device between pages and visits. Similar technologies include local storage and pixels; we use the word "cookies" to cover all of them.',
      },
      {
        heading: 'Essential cookies',
        text: 'These are required for the platform to work — they keep you signed in, secure your session, and remember choices like your selected filters during a visit. Essential cookies cannot be switched off, because the platform would not function without them.',
      },
      {
        heading: 'Preference cookies',
        text: 'These remember settings that make your experience smoother — such as your language, your last-used job filters, and whether you have dismissed an announcement — so you do not have to set them again on every visit.',
      },
      {
        heading: 'Analytics cookies',
        text: 'These help us understand how the platform is used — which pages are popular, where visitors drop off, and what to improve. Analytics data is aggregated and does not identify you personally. These cookies are set only with your consent where the law requires it.',
      },
      {
        heading: 'Managing cookies',
        list: [
          'Use your browser settings to block or delete cookies for any site, including Surwive',
          'Withdraw analytics consent at any time from the cookie banner or your account settings',
          'Note that blocking essential cookies will sign you out and may break core features',
        ],
      },
      {
        heading: 'Third-party cookies',
        text: 'A small number of cookies are set by services we embed, such as video players or analytics providers. These providers act under contract with us and may not use the data for their own advertising. We review embedded services regularly to keep this list minimal.',
      },
      {
        heading: 'Updates to this policy',
        text: 'If we add or change the cookies we use, we will update this page and, where the change is significant, ask for your consent again. The "last updated" date at the top always reflects the current version.',
      },
    ],
  },
  {
    slug: 'data-protection',
    title: 'Data Protection Policy',
    shortTitle: 'Data Protection',
    icon: IconGlobe,
    color: '#35d0bc',
    updated: 'Jul 21, 2026',
    summary: 'The technical and organisational safeguards that keep your data secure on Surwive.',
    intro:
      'Protecting the data you entrust to us is a core commitment, not an afterthought. This policy describes the safeguards — technical, organisational, and contractual — that Surwive applies to keep personal data secure throughout its lifecycle, and how we respond if something goes wrong.',
    sections: [
      {
        heading: 'Our security principles',
        list: [
          'Data minimisation — we collect only what the service actually needs',
          'Purpose limitation — data collected for hiring is used only for hiring',
          'Least-privilege access — staff see personal data only when their role requires it',
          'Security by design — every new feature is reviewed for privacy impact before launch',
        ],
      },
      {
        heading: 'Technical safeguards',
        list: [
          'Encryption in transit (TLS) for every connection to the platform',
          'Encryption at rest for stored personal data, including resumes',
          'Hashed and salted passwords — we can never read your password',
          'Regular security testing, dependency patching, and vulnerability monitoring',
          'Continuous backups with tested restore procedures',
        ],
      },
      {
        heading: 'Organisational safeguards',
        text: 'Access to production data is limited to a small, named group of engineers, protected by multi-factor authentication and logged for audit. All staff complete data-protection training on joining and annually thereafter, and are bound by confidentiality obligations in their contracts.',
      },
      {
        heading: 'Data storage and transfers',
        text: 'Personal data is stored on servers located in India. Where a service provider processes data outside India, we require contractual safeguards equivalent to the protections in this policy, including standard contractual clauses where applicable.',
      },
      {
        heading: 'Third-party processors',
        text: 'Every vendor that touches personal data — hosting, email delivery, analytics — is vetted before onboarding and bound by a data-processing agreement. Processors may act only on our documented instructions and must notify us of any incident without undue delay.',
      },
      {
        heading: 'Breach response',
        text: 'If a data breach affecting personal data occurs, our response plan activates immediately: contain the incident, assess the impact, notify the relevant supervisory authority within 72 hours where required, and inform affected users without undue delay with clear guidance on protective steps.',
      },
      {
        heading: 'Your part in security',
        list: [
          'Use a strong, unique password for your Surwive account',
          'Never share login credentials or one-time codes with anyone',
          'Report anything suspicious to security@surwive.com — we investigate every report',
        ],
      },
    ],
  },
  {
    slug: 'user-agreement',
    title: 'User Agreement',
    shortTitle: 'User Agreement',
    icon: IconUsers,
    color: '#c99cff',
    updated: 'Jul 21, 2026',
    summary: 'The mutual commitments between you and Surwive that keep the community fair and trustworthy.',
    intro:
      'This User Agreement sets out the working relationship between you and Surwive in plain language — what we promise you as a member of the platform, and the standards every candidate and employer agrees to uphold. It complements our Terms & Conditions; where the two overlap, the Terms & Conditions prevail.',
    sections: [
      {
        heading: 'Our commitments to you',
        list: [
          'Every job, internship, and walk-in drive is verified before it goes live',
          'Salary ranges are shown transparently on every listing',
          'Applying is free for candidates — always',
          'Your data is used only as described in our Privacy Policy',
          'Support responds to every query within two working days',
        ],
      },
      {
        heading: 'Candidate commitments',
        list: [
          'Represent your skills, education, and experience honestly',
          'Attend interviews and drives you register for, or cancel in advance',
          'Do not apply on behalf of another person',
          'Treat recruiters and event staff with professionalism and respect',
        ],
      },
      {
        heading: 'Employer commitments',
        list: [
          'Post only genuine, currently open positions with accurate descriptions',
          'Never charge candidates any fee at any stage of hiring',
          'Use candidate data solely for the role applied to, then delete it',
          'Communicate outcomes to interviewed candidates within a reasonable time',
          'Comply with equal-opportunity and labour laws in all hiring decisions',
        ],
      },
      {
        heading: 'Community standards',
        text: 'Surwive is a professional space. Discrimination, harassment, spam, and deceptive behaviour have no place here — whether in listings, applications, messages, or at in-person drives and events. We act on every report, and repeated or serious violations lead to permanent removal.',
      },
      {
        heading: 'Reporting problems',
        text: 'If a listing looks fraudulent, an employer requests payment, or anyone behaves inappropriately, report it to trust@surwive.com or through the report option on the listing. Reports are confidential, and reporting in good faith will never affect your standing on the platform.',
      },
      {
        heading: 'Dispute resolution',
        text: 'Most issues are resolved fastest by contacting support first. For formal disputes, both sides agree to attempt good-faith negotiation before pursuing other remedies. This agreement is governed by the laws of India, and courts in Hyderabad have jurisdiction over unresolved disputes.',
      },
      {
        heading: 'Staying informed',
        text: 'We will notify you of material changes to this agreement by email or an in-platform announcement at least 14 days in advance. The latest version is always available from the Policies section in the footer.',
      },
    ],
  },
]

export function policyBySlug(slug: string | null) {
  if (!slug) return policyCatalog[0]
  return policyCatalog.find((p) => p.slug === slug) ?? policyCatalog[0]
}
