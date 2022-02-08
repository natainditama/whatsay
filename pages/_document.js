import { Html, Head, Main, NextScript } from "next/document";
import { Metadata } from "@components/index";

export default function Document() {
  return (
    <Html>
      <Head>
        <Metadata />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
