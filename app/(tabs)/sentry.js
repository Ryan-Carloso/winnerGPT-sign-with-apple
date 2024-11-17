import * as Sentry from "@sentry/react-native";
import { Button } from "react-native";

Sentry.init({
  dsn: "https://d95ffea76416fb81f8ba5846bf1c7a6c@o4507664027287552.ingest.de.sentry.io/4508311786946640",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  // profilesSampleRate is relative to tracesSampleRate.
  // Here, we'll capture profiles for 100% of transactions.
  profilesSampleRate: 1.0,
});


<Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>