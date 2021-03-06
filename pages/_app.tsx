import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import * as ReactGA from "react-ga";
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import ApiProvider from "provider/ApiProvider";
import AuthProvider from "provider/AuthProvider";

let gaLoaded = false;

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.GA_ENABLED && !gaLoaded) {
      // Dont run without valid id
      if (!process.env.GA_ID) return;
      // Dont run outside browser
      if (typeof window === undefined) return;

      ReactGA.initialize(process.env.GA_ID);
      ReactGA.pageview(window.location.pathname + window.location.search);
      gaLoaded = true;
    }
  }, []);

  if (gaLoaded) {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css?family=Viga"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <ApiProvider>
          <Component {...pageProps} />
        </ApiProvider>
      </AuthProvider>
      <style global jsx>
        {`
          body {
            font-family: "roboto";
            margin: 0;
            line-height: 1.2;
            overflow-x: hidden;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: "Viga";
            font-weight: 300;
          }

          .max-content {
            max-width: 1440px;
          }

          .w-100 {
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

export default MyApp;
