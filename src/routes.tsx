import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicRoute from './components/auth/PublicRoute'

const SignIn = lazy(() => import('./pages/SignIn').then((m) => ({ default: m.SignIn })))
const ForgotPassword = lazy(() =>
  import('./pages/ForgotPassword').then((m) => ({ default: m.ForgotPassword }))
)
const UserManagement = lazy(() =>
  import('./pages/UserManagement').then((m) => ({ default: m.UserManagement }))
)
const Community = lazy(() => import('./pages/Community').then((m) => ({ default: m.Community })))
const CommunityGroup = lazy(() => import('./pages/CommunityGroup').then((m) => ({ default: m.CommunityGroup })))
const UserMessages = lazy(() =>
  import('./pages/UserMessages').then((m) => ({ default: m.UserMessages }))
)
const ReportedContent = lazy(() =>
  import('./pages/ReportedContent').then((m) => ({ default: m.ReportedContent }))
)
const Announcements = lazy(() =>
  import('./pages/Announcements').then((m) => ({ default: m.Announcements }))
)
const Analytics = lazy(() => import('./pages/Analytics').then((m) => ({ default: m.Analytics })))
const AIRules = lazy(() => import('./pages/AIRules').then((m) => ({ default: m.AIRules })))
const WebSettings = lazy(() =>
  import('./pages/WebSettings').then((m) => ({ default: m.WebSettings }))
)
const CmsServices = lazy(() =>
  import('./pages/cms/Services').then((m) => ({ default: m.Services }))
)
const CmsDoctor = lazy(() => import('./pages/cms/Doctor').then((m) => ({ default: m.DoctorPage })))
// const CmsSupport = lazy(() =>
//   import('./pages/cms/Support').then((m) => ({ default: m.CmsSupport }))
// )
const CmsLiveQASession = lazy(() =>
  import('./pages/cms/LiveQASession').then((m) => ({ default: m.LiveQASession }))
)
const CmsTeam = lazy(() => import('./pages/cms/Team').then((m) => ({ default: m.CmsTeam })))
const CmsTestimonials = lazy(() =>
  import('./pages/cms/Testimonials').then((m) => ({ default: m.CmsTestimonials }))
)
const CmsArticles = lazy(() =>
  import('./pages/cms/Articles').then((m) => ({ default: m.CmsArticles }))
)
const CmsOurMission = lazy(() =>
  import('./pages/cms/OurMission').then((m) => ({ default: m.CmsOurMission }))
)
const CmsOurJourney = lazy(() =>
  import('./pages/cms/OurJourney').then((m) => ({ default: m.CmsOurJourney }))
)
const CmsAboutUs = lazy(() =>
  import('./pages/cms/AboutUs').then((m) => ({ default: m.CmsAboutUs }))
)
const CmsHero = lazy(() => import('./pages/cms/Hero').then((m) => ({ default: m.CmsHero })))
const CmsPage = lazy(() => import('./pages/cms/Page').then((m) => ({ default: m.CmsPage })))
const RelaxationAudio = lazy(() =>
  import('./pages/cms/RelaxationAudio').then((m) => ({ default: m.RelaxationAudio }))
)
const WellnessActivities = lazy(() =>
  import('./pages/cms/WellnessActivities').then((m) => ({ default: m.WellnessActivities }))
)
const Subscription = lazy(() =>
  import('./pages/Subscription').then((m) => ({ default: m.Subscription }))
)
const Profile = lazy(() => import('./pages/Profile').then((m) => ({ default: m.Profile })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <span className="text-gray-500">Loading…</span>
    </div>
  )
}

function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route
            path="/sign-in"
            element={
              <LazyPage>
                <SignIn />
              </LazyPage>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <LazyPage>
                <ForgotPassword />
              </LazyPage>
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/user-management" replace />} />
            <Route
              path="user-management"
              element={
                <LazyPage>
                  <UserManagement />
                </LazyPage>
              }
            />
            <Route
              path="community-monitoring"
              element={
                <LazyPage>
                  <Community />
                </LazyPage>
              }
            />
            <Route
              path="community-groups"
              element={
                <LazyPage>
                  <CommunityGroup />
                </LazyPage>
              }
            />
            <Route
              path="userMessages"
              element={
                <LazyPage>
                  <UserMessages />
                </LazyPage>
              }
            />
            <Route
              path="reported-content"
              element={
                <LazyPage>
                  <ReportedContent />
                </LazyPage>
              }
            />
            <Route
              path="announcements"
              element={
                <LazyPage>
                  <Announcements />
                </LazyPage>
              }
            />
            <Route
              path="analytics"
              element={
                <LazyPage>
                  <Analytics />
                </LazyPage>
              }
            />
            <Route
              path="ai-rules"
              element={
                <LazyPage>
                  <AIRules />
                </LazyPage>
              }
            />
            <Route
              path="cms/web-settings"
              element={
                <LazyPage>
                  <WebSettings />
                </LazyPage>
              }
            />
            <Route
              path="cms/services"
              element={
                <LazyPage>
                  <CmsServices />
                </LazyPage>
              }
            />
            <Route
              path="cms/doctor"
              element={
                <LazyPage>
                  <CmsDoctor />
                </LazyPage>
              }
            />
            <Route
              path="cms/live-qa-session"
              element={
                <LazyPage>
                  <CmsLiveQASession />
                </LazyPage>
              }
            />
            {/* <Route
              path="cms/support"
              element={
                <LazyPage>
                  <CmsSupport />
                </LazyPage>
              }
            /> */}
            <Route
              path="cms/team"
              element={
                <LazyPage>
                  <CmsTeam />
                </LazyPage>
              }
            />
            <Route
              path="cms/testimonials"
              element={
                <LazyPage>
                  <CmsTestimonials />
                </LazyPage>
              }
            />
            <Route
              path="cms/articles"
              element={
                <LazyPage>
                  <CmsArticles />
                </LazyPage>
              }
            />
            <Route
              path="cms/our-mission"
              element={
                <LazyPage>
                  <CmsOurMission />
                </LazyPage>
              }
            />
            <Route
              path="cms/our-journey"
              element={
                <LazyPage>
                  <CmsOurJourney />
                </LazyPage>
              }
            />
            <Route
              path="cms/about-us"
              element={
                <LazyPage>
                  <CmsAboutUs />
                </LazyPage>
              }
            />
            <Route
              path="cms/hero"
              element={
                <LazyPage>
                  <CmsHero />
                </LazyPage>
              }
            />
            <Route
              path="cms/page"
              element={
                <LazyPage>
                  <CmsPage />
                </LazyPage>
              }
            />
            <Route
              path="cms/relaxation-audio"
              element={
                <LazyPage>
                  <RelaxationAudio />
                </LazyPage>
              }
            />
            <Route
              path="cms/wellness-self-care"
              element={
                <LazyPage>
                  <WellnessActivities />
                </LazyPage>
              }
            />
            <Route
              path="subscription"
              element={
                <LazyPage>
                  <Subscription />
                </LazyPage>
              }
            />
            <Route
              path="profile"
              element={
                <LazyPage>
                  <Profile />
                </LazyPage>
              }
            />
            <Route
              path="*"
              element={
                <LazyPage>
                  <NotFound />
                </LazyPage>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
