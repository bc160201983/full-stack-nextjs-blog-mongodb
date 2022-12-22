import Layout from "../components/Layout";
import { AppProvider } from "../context/authContext";
import "../styles/globals.scss";
import "../styles/layout.scss";

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    );
  }
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
export default MyApp;
