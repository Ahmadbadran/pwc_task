import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/footer";
import { Map } from "./components/Hero";
// import "./App.css";

export default function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}
