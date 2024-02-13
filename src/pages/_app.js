import { config } from "@fortawesome/fontawesome-svg-core";
import { Provider } from "react-redux";

import "@fortawesome/fontawesome-svg-core/styles.css";

import { PageLayout } from "@/components/index";
import { store } from "@/redux/store";

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </Provider>
  );
}