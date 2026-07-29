import { useEffect, useState } from 'react'
import './App.css'
import { AnnounceBar } from './components/AnnounceBar'
import { AuroraBackground } from './components/AuroraBackground'
import { Footer } from './components/Footer'
import { HomeBackgroundFx } from './components/HomeBackgroundFx'
import { Navbar } from './components/Navbar'
import { useHashRoute } from './hooks/useHashRoute'
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
import type { PricingAudience } from './data/pricing'

const USER_PORTAL_URL = 'https://user.surwive.com'
const EMPLOYER_PORTAL_URL = 'https://employer.surwive.com'

function App() {
  const { route, hash } = useHashRoute()
  useScrollReveal(hash)
  const [pricingAudience, setPricingAudience] = useState<PricingAudience>('student')

  const goToPortal = (role: 'candidate' | 'employer') => {
    window.location.href = role === 'employer' ? EMPLOYER_PORTAL_URL : USER_PORTAL_URL
  }

  useEffect(() => {
    if (route === 'jobs' || route === 'pricing' || route === 'blog' || route === 'events' || route === 'drives' || route === 'faqs' || route === 'contact' || route === 'legal') {
      window.scrollTo({ top: 0 })
    } else {
      const id = window.location.hash.slice(1)
      if (id && !id.startsWith('/')) document.getElementById(id)?.scrollIntoView()
    }
  }, [route, hash])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <AuroraBackground />
      {route === 'home' && <HomeBackgroundFx />}

      <AnnounceBar />

      <Navbar onSignup={() => goToPortal('candidate')} />

      <main id="main">
        {route === 'jobs' ? (
          <JobsPage hash={hash} onApply={() => goToPortal('candidate')} />
        ) : route === 'pricing' ? (
          <PricingPage
            audience={pricingAudience}
            onAudienceChange={setPricingAudience}
            onSelectPlan={(audience) => goToPortal(audience === 'company' ? 'employer' : 'candidate')}
          />
        ) : route === 'blog' ? (
          <BlogPage slug={hash.startsWith('#/blog/') ? decodeURIComponent(hash.slice('#/blog/'.length)) : null} />
        ) : route === 'events' ? (
          <EventsPage
            slug={hash.startsWith('#/events/') ? decodeURIComponent(hash.slice('#/events/'.length)) : null}
            onRegister={() => goToPortal('candidate')}
          />
        ) : route === 'drives' ? (
          <DrivesPage
            slug={hash.startsWith('#/drives/') ? decodeURIComponent(hash.slice('#/drives/'.length)) : null}
            onRegister={() => goToPortal('candidate')}
          />
        ) : route === 'faqs' ? (
          <FaqPage onSignup={() => goToPortal('candidate')} />
        ) : route === 'contact' ? (
          <ContactPage />
        ) : route === 'legal' ? (
          <PolicyPage slug={hash.startsWith('#/legal/') ? decodeURIComponent(hash.slice('#/legal/'.length)) : null} />
        ) : (
          <HomePage
            onSignupCandidate={() => goToPortal('candidate')}
            onSignupEmployer={() => goToPortal('employer')}
            onCompanyPricing={() => setPricingAudience('company')}
          />
        )}
      </main>

      <Footer />
    </>
  )
}

export default App
