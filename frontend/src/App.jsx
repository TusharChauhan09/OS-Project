import React from "react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import PageReplacementVisualizer from "./pages/PageReplacementVisualizer"
import Difference from "./pages/Difference";
import About from './pages/About';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/algorithm" element={<Home />} />
        <Route path="/" element={<About />} />
        <Route path="/difference" element={<Difference />} />
      </Routes>
      <Footer />
    </BrowserRouter>  
    </>
  )
}

export default App
