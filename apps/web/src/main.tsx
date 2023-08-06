import ReactDOM from "react-dom/client";
import App from "./App";
import DataProvider from "./Context/DataProvider";
import "./index.css";
import createStore from 'polotno/model/store';
//Sentry configuration
// import * as Sentry from "@sentry/react";
// Sentry.init({
//   dsn: "https://d28a6c060aff4f09816398a5dbc4db86@o4504993034928128.ingest.sentry.io/4505005727940608",
//   integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
//   // Performance Monitoring
//   tracesSampleRate: 1.0,
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1.0,
// });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DataProvider>
    <App />
  </DataProvider>
);
