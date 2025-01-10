import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export default async ({ app, store, router }) => {
  const echo = new Echo({
    broadcaster: "reverb",
    key: process.env.REVERB_APP_KEY,
    wsHost: process.env.REVERB_HOST,
    wsPort: process.env.REVERB_PORT ?? 80,
    wssPort: process.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (process.env.REVERB_SCHEME ?? "https") === "https",
    enabledTransports: ["ws", "wss"],
    authEndpoint: `${process.env.API_BASE}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
    debug: true,
  });

  app.config.globalProperties.$echo = echo;
};
