import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Este site é uma landing page: não usa service worker.
// Remove registros antigos de visitantes que já tenham um instalado.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}

createRoot(document.getElementById("root")!).render(<App />);
