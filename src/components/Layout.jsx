import Head from "next/head";
import styled from "@emotion/styled";
import GlobalStyles from "./prebuilt/GlobalStyles";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
const StripePromise = loadStripe(process.env.PUBLISHABLE_KEY);
//don't call loadstrip within a renderable component

const Layout = ({ children, title }) => {
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Elements stripe={StripePromise}> <children />
      </Elements>
    </>
  );
};

export default Layout;
