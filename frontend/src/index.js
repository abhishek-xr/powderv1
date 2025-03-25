import React from "react";
import ReactDOM from "react-dom/client"; // Use ReactDOM from "react-dom/client" for React 18
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css"; // Import Tailwind CSS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
