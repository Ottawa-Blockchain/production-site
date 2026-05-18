import { useEffect } from 'react';

const FORM_URL = 'https://forms.gle/xH2RANmKvQRFkDfKA';

export default function FuturistRedirect() {
  useEffect(() => {
    // Use replace so back-navigation doesn't return here
    window.location.replace(FORM_URL);
  }, []);

  return (
    <div style={{padding: '2rem'}}>
      <p>If you are not redirected automatically, <a href={FORM_URL} target="_blank" rel="noopener noreferrer">click here to open the Futurist form</a>.</p>
    </div>
  );
}
