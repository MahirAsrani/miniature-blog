import Head from 'next/head';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { ContextWrapper } from '../context/state';

function MyApp({ Component, pageProps }) {
  return (
    <ContextWrapper>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ContextWrapper>
  );
}

export default MyApp;
