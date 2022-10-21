import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/layout";
import { NotificationContextProvider } from "../store/notification-context";
import MessengerCustomerChat from "react-messenger-customer-chat";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(session);
  return (
    <SessionProvider session={session}>
      <NotificationContextProvider>
        <Layout>
          <Head>
            <title>Techonsolutions</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta
              name="description"
              content="Techonsolutions information technology IT solutions and services Nairobi Kenya"
            />
          </Head>
          <Component {...pageProps} />
          <MessengerCustomerChat
            pageId="106857868629963"
            appId="3334556346773365"
          />
        </Layout>
      </NotificationContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
