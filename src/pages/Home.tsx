import { useEffect } from "react";

const HTML = `
<!-- PASTE WEBFLOW BODY HTML HERE -->
`;

export default function Home() {
  useEffect(() => {
    const w = window as any;

    const t = setTimeout(() => {
      if (w.Webflow) {
        try {
          w.Webflow.destroy();
          w.Webflow.ready();
          w.Webflow.require("ix2").init();
        } catch (e) {
          console.warn("Webflow init failed", e);
        }
      }

      window.dispatchEvent(new Event("resize"));
    }, 100);

    return () => clearTimeout(t);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: HTML }} />;
}
