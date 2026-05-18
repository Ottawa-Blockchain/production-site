import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';
import InvoiceEditorPage from './pages/InvoiceEditorPage';
import FuturistRedirect from './pages/FuturistRedirect';
import LinksPage from './pages/LinksPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/futurist" element={<FuturistRedirect />} />
        <Route path="/invoice-editor" element={<InvoiceEditorPage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
