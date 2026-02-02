import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParticleCanvas from "./components/ParticleCanvas";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";

function App() {
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:8000/auth/login";
  };

  return (
    <Router>
      <ParticleCanvas />
      <Routes>
        <Route path="/" element={<LandingPage loginWithGoogle={loginWithGoogle} />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
