import { useEffect } from 'react';

function GiveawayPage() {
  useEffect(() => {
    document.title = 'Application for General Pass to Blockchain Futurist Conference Toronto';

    const viewportMeta = document.querySelector('meta[name="viewport"]');
    const createdViewportMeta = !viewportMeta;

    let metaElement = viewportMeta;
    if (!metaElement) {
      metaElement = document.createElement('meta');
      metaElement.name = 'viewport';
      document.head.appendChild(metaElement);
    }

    metaElement.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    );

    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.Tally) {
      window.Tally.loadEmbeds();
    }

    const originalHtmlStyle = {
      margin: document.documentElement.style.margin,
      height: document.documentElement.style.height,
      overflow: document.documentElement.style.overflow,
    };
    const originalBodyStyle = {
      margin: document.body.style.margin,
      height: document.body.style.height,
      overflow: document.body.style.overflow,
    };

    document.documentElement.style.margin = '0';
    document.documentElement.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.margin = originalHtmlStyle.margin;
      document.documentElement.style.height = originalHtmlStyle.height;
      document.documentElement.style.overflow = originalHtmlStyle.overflow;
      document.body.style.margin = originalBodyStyle.margin;
      document.body.style.height = originalBodyStyle.height;
      document.body.style.overflow = originalBodyStyle.overflow;

      if (createdViewportMeta && metaElement && metaElement.parentNode) {
        metaElement.parentNode.removeChild(metaElement);
      }
    };
  }, []);

  return (
    <iframe
      data-tally-src="https://tally.so/r/gDW0Dl?transparentBackground=1"
      width="100%"
      height="100%"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
      title="Application for General Pass to Blockchain Futurist Conference Toronto"
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, border: 0 }}
    ></iframe>
  );
}

export default GiveawayPage;
