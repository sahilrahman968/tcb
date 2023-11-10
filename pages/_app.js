import NavBar from "components/navBar"
import "../styles/globals.css"
import Footer from "components/footer"
import { SessionProvider } from "next-auth/react"
import AdminContextProvider from "providers/AdminContextProvider"

export default function App({ Component, pageProps }) {
  return <SessionProvider>
    <AdminContextProvider>
      <div className="app_container">
        <div className="app_content_area">
          <Component {...pageProps} />
        </div>
      </div>
    </AdminContextProvider>
  </SessionProvider>
}
