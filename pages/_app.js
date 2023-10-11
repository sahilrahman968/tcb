import NavBar from "components/navBar"
import "../styles/globals.css"
import Footer from "components/footer"

export default function App({ Component, pageProps }) {
  return <div className="app_container">
    <NavBar/>
      <Component {...pageProps} />
    <Footer/>
  </div>
}
