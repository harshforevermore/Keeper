import { useEffect } from "react";
import Navbar from "./components/Navbar";
import RouterNav from "./Router/index";

function App() {
  useEffect(() => {
    const setVhUnit = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVhUnit();
    window.addEventListener('resize', setVhUnit);

    return () => {
      window.removeEventListener('resize', setVhUnit);
    };
  }, []);

  return (
      <div className="container">
        <Navbar />
        <RouterNav />
      </div>
  )
}

export default App;
