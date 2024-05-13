
import Footer from "../footer/Footer"
import Navbar from "../navbar/Navbar"





const Layout = ({children}) => {
  return (
    <div>
       <Navbar></Navbar>
            <div className="main-content min-h-screen">
                {children}
            </div>
            <Footer></Footer>
    </div>
  )
}

export default Layout
