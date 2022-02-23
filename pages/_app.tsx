import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const supportedChainIds = [4];
const connectors = {
  injected: {},
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebWeb3Provider connectors={connectors} supportedChainIds={supportedChainIds}>
      <ToastContainer autoClose={2000} position="top-center" />
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  )
}

export default MyApp
