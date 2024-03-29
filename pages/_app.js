import '../styles/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout'
import { SWRConfig } from 'swr'
import RouteGuard from '../components/RouteGuard'

function MyApp({ Component, pageProps }) {
  return (
   <RouteGuard>
      <Layout>
        <SWRConfig value={{
          fetcher: async url => {
            const res = await fetch(url)
            if (!res.ok) {
              const error = new Error('An error occured while fetching the data.')
              error.info = await res.json()
              error.status = res.status
              throw error
            }
            return res.json()
          }
        }}>
          <Component {...pageProps} />
        </SWRConfig>
      </Layout>
   </RouteGuard>
  )
}

export default MyApp


