import MuiProviders from "@/providers/MuiProviders";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <MuiProviders>
      <Component {...pageProps} />
    </MuiProviders>
  );
}

export default appWithTranslation(App);
