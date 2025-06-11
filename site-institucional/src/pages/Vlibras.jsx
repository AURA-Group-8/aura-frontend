import { useEffect, useRef } from 'react';

function VLibras() {
  const widgetInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || widgetInitialized.current) return;

    const script = document.createElement("script");
    script.id = "vlibras-script";
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;

    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
        widgetInitialized.current = true;
      }
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className="enabled" vw>
      <div className="active" vw-access-button></div>
      <div vw-plugin-wrapper>
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
}

export default VLibras;
