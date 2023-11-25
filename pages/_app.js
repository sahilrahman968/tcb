import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import UserContextProvider from "providers/UserContextProvider"

export default function App({ Component, pageProps }) {
  return <SessionProvider>
    <UserContextProvider>
      <div className="app_container">
        <div className="app_content_area">
          <Component {...pageProps} />
        </div>
      </div>
    </UserContextProvider>
  </SessionProvider>
}
