import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
