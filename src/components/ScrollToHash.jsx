import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      // small timeout ensures DOM is fully rendered
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [hash]);

  return null;
}
