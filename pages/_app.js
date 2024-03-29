import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/layout";
import { NotificationContextProvider } from "../store/notification-context";
import MessengerCustomerChat from "react-messenger-customer-chat";
import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import "../styles/swipercourousel.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  
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
              content="Techonsolutions is information technology IT solutions and services in Nairobi Kenya such as 
                Networking, installations, web-development, consultancy, software, cloud-computing, graphics design,
                CCTV surveillance, cybersecurity, computer repairs and more"
            />

             {/* Facebook Open Graph tags */} 
                <meta property="og:title" content="Techonsolutions" />
                <meta property="og:description" content="At TechonSolutions, we are dedicated to delivering cutting-edge IT solutions
                that empower businesses and individuals alike. Whether you're a startup seeking a digital edge or an established
                organization looking to optimize your IT infrastructure, we're here to elevate your possibilities and transform your
                IT landscape." />
                <meta property="og:image" content="/images/techonsol.jpg" />

             {/* Twitter Cards */} 
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Techonsolutions" />
                <meta name="twitter:description" content="At TechonSolutions, we are dedicated to delivering cutting-edge IT solutions
                that empower businesses and individuals alike. Whether you're a startup seeking a digital edge or an established
                organization looking to optimize your IT infrastructure, we're here to elevate your possibilities and transform your
                IT landscape." />
                <meta name="twitter:image" content="https://www.techonsolutions.com/images/techonsol.jpg" />

             {/* Schema Markup */} 
                <script type="application/ld+json" dangerouslySetInnerHTML={{
  __html: JSON.stringify({
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "TechonSolutions",
    "url": "https://techonsolutions.com/",
    "description": "IT services and solutions company",
    "logo": "/images/techonsol.jpg", // Use a relative path
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nairobi",
      "addressLocality": "City",
      "addressRegion": "",
      "postalCode": "",
      "addressCountry": "Kenya"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254 113270070",
      "contactType": "Customer service and Enquiry"
    }
  })
}} />
  
          </Head>

             {/* Google Analytics */}

          <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-CF64JTKL46`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-CF64JTKL46');
            `}
          </Script>
  
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
