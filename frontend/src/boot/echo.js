import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export default async ({ app, store, router }) => {
  const echo = new Echo({
    broadcaster: "pusher",
    key: "your-pusher-key",
    cluster: "your-cluster",
    forceTLS: false,
    encrypted: false,
    wsHost: "localhost",
    wsPort: 8080,
    enabledTransports: ["ws"],
  });

  app.config.globalProperties.$echo = echo;
};
