import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ThemeProvider } from './hooks/useTheme';
import { Home } from './pages/Home';
import { Resume } from './pages/Resume';
import { Education } from './pages/Education';
import { Contact } from './pages/Contact';
import { Writing } from './pages/Writing';

export function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/writing" element={<Writing />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}
