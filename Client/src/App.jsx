import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RouterNav from "./Router/index";

function App() {

  return (
    <>
      <div className="container">
        <Navbar />
          <RouterNav />
        <Footer />
      </div>
    </>
  )
}

export default App;
