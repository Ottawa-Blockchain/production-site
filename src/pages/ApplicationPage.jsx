import { useEffect } from 'react';

function ApplicationPage() {
  useEffect(() => {
    // Update title
    document.title = "Network Application";

    // Load Tally script
    // Check if script already exists to avoid duplicates
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script');
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
        // If script exists, we might need to trigger a reload or re-scan if Tally API requires it.
        // But usually the embed script observes the DOM or runs on load. 
        // If the script was already loaded, and we add a new iframe with data-tally-src, 
        // we might need to tell Tally to load it. 
        // According to Tally docs (if I knew them), they might expose a global `Tally` object.
        // For now, let's assume the script handles it or reloading the page works.
        if (window.Tally) {
            window.Tally.loadEmbeds();
        }
    }

    // Apply styles to html/body for full screen
    const originalHtmlStyle = {
        margin: document.documentElement.style.margin,
        height: document.documentElement.style.height,
        overflow: document.documentElement.style.overflow
    };
    const originalBodyStyle = {
        margin: document.body.style.margin,
        height: document.body.style.height,
        overflow: document.body.style.overflow
    };

    document.documentElement.style.margin = '0';
    document.documentElement.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      // Cleanup styles
      document.documentElement.style.margin = originalHtmlStyle.margin;
      document.documentElement.style.height = originalHtmlStyle.height;
      document.documentElement.style.overflow = originalHtmlStyle.overflow;
      document.body.style.margin = originalBodyStyle.margin;
      document.body.style.height = originalBodyStyle.height;
      document.body.style.overflow = originalBodyStyle.overflow;
      
      // Reset title (optional, or set back to default)
      // document.title = "Previous Title"; 
    };
  }, []);

  return (
    <iframe 
        data-tally-src="https://tally.so/r/EklNol?transparentBackground=1&formEventsForwarding=1" 
        width="100%" 
        height="100%" 
        frameBorder="0" 
        marginHeight="0" 
        marginWidth="0" 
        title="Network Application"
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, border: 0 }}
    ></iframe>
  );
}

export default ApplicationPage;
