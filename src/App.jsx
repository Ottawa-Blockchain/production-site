import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';
import GiveawayPage from './pages/GiveawayPage';
import InvoiceEditorPage from './pages/InvoiceEditorPage';
import LinksPage from './pages/LinksPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/giveaway" element={<GiveawayPage />} />
        <Route path="/invoice-editor" element={<InvoiceEditorPage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
