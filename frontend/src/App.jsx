import React from "react";
import NavBar from "./components/NavBar";
import Home from "./Pages/Home";
import PageReplacementVisualizer from "./pages/PageReplacementVisualizer"
import Difference from "./pages/Difference";
import About from './pages/About';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      {/* <FIFOPageReplacement/>
      <LRUPageReplacement /> */}
      {/* <PageReplacementVisualizer /> */}
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/algorithms" element={<PageReplacementVisualizer />} />
        <Route path="/difference" element={<Difference />} />
      </Routes>
    </BrowserRouter>  
    </>
  )
}

export default App
