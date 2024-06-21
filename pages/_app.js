import { Provider } from "react-redux";
import { store } from "@/app/store";
import "@/styles/globals.css";
import UserPersist from "@/components/shared/persistent/UserPersist";
import { Toaster } from "react-hot-toast";
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserPersist>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        <Component {...pageProps} />
        <Toaster />
      </UserPersist>
    </Provider>
  );
}