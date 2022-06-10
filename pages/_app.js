import { MDXProvider } from '@mdx-js/react'
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  return <MDXProvider>
    <Component {...pageProps} />
  </MDXProvider>
}

export default MyApp
