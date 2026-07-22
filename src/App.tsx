import { useEffect, useState } from 'react'
import './App.css'
import { AnnounceBar } from './components/AnnounceBar'
import { AuroraBackground } from './components/AuroraBackground'
import { Footer } from './components/Footer'
import { HomeBackgroundFx } from './components/HomeBackgroundFx'
import { Navbar } from './components/Navbar'
import { SignupModal, type SignupRole } from './components/SignupModal'
import { useHashRoute } from './hooks/useHashRoute'
import { useScrollReveal } from './hooks/useScrollReveal'
import { BlogPage } from './pages/BlogPage'
import { DrivesPage } from './pages/DrivesPage'
import { EventsPage } from './pages/EventsPage'
import { FaqPage } from './pages/FaqPage'
import { HomePage } from './pages/HomePage'
import { JobsPage } from './pages/JobsPage'
import { PolicyPage } from './pages/PolicyPage'
import { PricingPage } from './pages/PricingPage'
import type { PricingAudience } from './data/pricing'

function App() {
  const { route, hash } = useHashRoute()
  useScrollReveal(hash)
  const [signupModal, setSignupModal] = useState<{ open: boolean; role: SignupRole }>({
    open: false,
    role: 'candidate',
  })
  const [pricingAudience, setPricingAudience] = useState<PricingAudience>('student')

  const openSignup = (role: SignupRole) => {
    setSignupModal({ open: true, role })
  }
  const closeSignup = () => setSignupModal((s) => ({ ...s, open: false }))

  useEffect(() => {
    if (route === 'jobs' || route === 'pricing' || route === 'blog' || route === 'events' || route === 'drives' || route === 'faqs' || route === 'legal') {
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

      <Navbar onSignup={() => openSignup('candidate')} />

      <main id="main">
        {route === 'jobs' ? (
          <JobsPage hash={hash} onApply={() => openSignup('candidate')} />
        ) : route === 'pricing' ? (
          <PricingPage
            audience={pricingAudience}
            onAudienceChange={setPricingAudience}
            onSelectPlan={(audience) => openSignup(audience === 'company' ? 'employer' : 'candidate')}
          />
        ) : route === 'blog' ? (
          <BlogPage slug={hash.startsWith('#/blog/') ? decodeURIComponent(hash.slice('#/blog/'.length)) : null} />
        ) : route === 'events' ? (
          <EventsPage
            slug={hash.startsWith('#/events/') ? decodeURIComponent(hash.slice('#/events/'.length)) : null}
            onRegister={() => openSignup('candidate')}
          />
        ) : route === 'drives' ? (
          <DrivesPage
            slug={hash.startsWith('#/drives/') ? decodeURIComponent(hash.slice('#/drives/'.length)) : null}
            onRegister={() => openSignup('candidate')}
          />
        ) : route === 'faqs' ? (
          <FaqPage onSignup={() => openSignup('candidate')} />
        ) : route === 'legal' ? (
          <PolicyPage slug={hash.startsWith('#/legal/') ? decodeURIComponent(hash.slice('#/legal/'.length)) : null} />
        ) : (
          <HomePage
            onSignupCandidate={() => openSignup('candidate')}
            onSignupEmployer={() => openSignup('employer')}
            onCompanyPricing={() => setPricingAudience('company')}
          />
        )}
      </main>

      <Footer />

      {signupModal.open && (
        <SignupModal
          role={signupModal.role}
          onRoleChange={(role) => setSignupModal((s) => ({ ...s, role }))}
          onClose={closeSignup}
        />
      )}
    </>
  )
}

export default App
