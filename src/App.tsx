import { useLayoutEffect, useState } from 'react'
import './App.css'
import { AnnounceBar } from './components/AnnounceBar'
import { AuroraBackground } from './components/AuroraBackground'
import { Footer } from './components/Footer'
import { HomeBackgroundFx } from './components/HomeBackgroundFx'
import { Navbar } from './components/Navbar'
import { useRoute } from './hooks/useRoute'
import { useScrollReveal } from './hooks/useScrollReveal'
import { BlogPage } from './pages/BlogPage'
import { ContactPage } from './pages/ContactPage'
import { DrivesPage } from './pages/DrivesPage'
import { EventsPage } from './pages/EventsPage'
import { FaqPage } from './pages/FaqPage'
import { HomePage } from './pages/HomePage'
import { JobsPage } from './pages/JobsPage'
import { PolicyPage } from './pages/PolicyPage'
import { PricingPage } from './pages/PricingPage'
import { RecruitersPage } from './pages/RecruitersPage'
import type { PricingAudience } from './data/pricing'
import type { JobInfo } from './data/jobs'

const USER_PORTAL_URL = 'https://user.surwive.com'
const EMPLOYER_PORTAL_URL = 'https://employer.surwive.com'

function App() {
  const { route, path, hash } = useRoute()
  useScrollReveal(path)
  const [pricingAudience, setPricingAudience] = useState<PricingAudience>('student')

  const goToPortal = (role: 'candidate' | 'employer', path?: string) => {
    const base = role === 'employer' ? EMPLOYER_PORTAL_URL : USER_PORTAL_URL
    window.location.href = path ? `${base}${path}` : base
  }

  // Deep-links a job/internship's "Apply now" straight to its view in the candidate portal.
  const applyToJob = (job: JobInfo) => {
    const screen = job.type === 'internship' ? 'internship-view' : 'job-view'
    goToPortal('candidate', `/${screen}/${encodeURIComponent(job.id)}`)
  }

  // Layout effect (not a passive effect): runs synchronously right after the new
  // page's DOM commits and before the browser paints, so there's no visible frame
  // at the old scroll position and no race with the new page's own mount effects
  // (e.g. the jobs list's IntersectionObserver, which needs the correct scroll
  // position already in place when it takes its first reading). 'instant' skips
  // the site's global smooth-scroll animation, which async data loading could
  // otherwise interrupt partway.
  useLayoutEffect(() => {
    if (route !== 'home') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      const id = hash.slice(1)
      if (id) document.getElementById(id)?.scrollIntoView()
    }
  }, [route, path, hash])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <AuroraBackground />
      {route === 'home' && <HomeBackgroundFx />}

      <div className="site-header">
        <AnnounceBar />
        <Navbar onSignup={() => goToPortal('candidate')} />
      </div>

      <main id="main">
        {route === 'jobs' ? (
          <JobsPage path={path} onApply={applyToJob} />
        ) : route === 'pricing' ? (
          <PricingPage
            audience={pricingAudience}
            onAudienceChange={setPricingAudience}
            onSelectPlan={(audience) => goToPortal(audience === 'company' ? 'employer' : 'candidate')}
          />
        ) : route === 'for-recruiters' ? (
          <RecruitersPage
            onSignupEmployer={() => goToPortal('employer')}
            onCompanyPricing={() => setPricingAudience('company')}
          />
        ) : route === 'blog' ? (
          <BlogPage slug={path.startsWith('/blog/') ? decodeURIComponent(path.slice('/blog/'.length)) : null} />
        ) : route === 'events' ? (
          <EventsPage
            slug={path.startsWith('/events/') ? decodeURIComponent(path.slice('/events/'.length)) : null}
            onRegister={() => goToPortal('candidate')}
          />
        ) : route === 'drives' ? (
          <DrivesPage
            slug={path.startsWith('/drives/') ? decodeURIComponent(path.slice('/drives/'.length)) : null}
            onRegister={() => goToPortal('candidate')}
          />
        ) : route === 'faqs' ? (
          <FaqPage onSignup={() => goToPortal('candidate')} />
        ) : route === 'contact' ? (
          <ContactPage />
        ) : route === 'legal' ? (
          <PolicyPage slug={path.startsWith('/legal/') ? decodeURIComponent(path.slice('/legal/'.length)) : null} />
        ) : (
          <HomePage
            onSignupCandidate={() => goToPortal('candidate')}
            onSignupEmployer={() => goToPortal('employer')}
            onCompanyPricing={() => setPricingAudience('company')}
            onApplyJob={applyToJob}
          />
        )}
      </main>

      <Footer />
    </>
  )
}

export default App
