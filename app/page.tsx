import Header from '@/components/Header';
import LandingPage from '@/components/LandingPage';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      {/* <Welcome /> */}

      <Header />
      <LandingPage />
    </>
  );
}
