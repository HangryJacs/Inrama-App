import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './screens/Home';
import { Shop } from './screens/Shop';
import { Drops } from './screens/Drops';
import { Rewards } from './screens/Rewards';
import { Profile } from './screens/Profile';
import { Onboarding } from './screens/Onboarding';
import { Cart } from './screens/Cart';

// Layout wrapper to conditionalize layout (no header/nav on onboarding)
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideLayout = location.pathname === '/onboarding';

  if (hideLayout) {
    return <main className="min-h-screen bg-background">{children}</main>;
  }

  return <Layout>{children}</Layout>;
};

// Simple auth/onboarding guard
const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  // const onboardingComplete = localStorage.getItem('onboarding_complete');
  const onboardingComplete = null; // FORCE OPEN QUIZ

  if (!onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />

          <Route path="/" element={<RouteGuard><Home /></RouteGuard>} />
          <Route path="/shop" element={<RouteGuard><Shop /></RouteGuard>} />
          <Route path="/drops" element={<RouteGuard><Drops /></RouteGuard>} />
          <Route path="/rewards" element={<RouteGuard><Rewards /></RouteGuard>} />
          <Route path="/profile" element={<RouteGuard><Profile /></RouteGuard>} />
          <Route path="/cart" element={<RouteGuard><Cart /></RouteGuard>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
