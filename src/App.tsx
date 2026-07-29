import { Routes, Route } from 'react-router-dom';
import JobsPage from './pages/JobsPage';
import PostsList from './pages/PostsList';
import PostView from './pages/PostView';
import NewsPage from './pages/NewsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CookieBanner from './components/CookieBanner';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<JobsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/post/:slug" element={<PostView />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <CookieBanner />
    </>
  );
}
