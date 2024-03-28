import "./App.css";
// Je renomme BrowserRouter en Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import Home from "./pages/Home";
import Details from "./pages/Details";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Import components
import Header from "./components/Header";

function App() {
  const str = "tom";

  return (
    // Router doit contenir tout mon site
    <Router>
      {/* Mon Header apparait sur toutes les pages */}
      <Header />
      {/* Le composant Routes doit contenir toutes mes routes, il affiche un seul de ses enfants à la fois */}
      <Routes>
        {/* path=chemin element=le composant à afficher si l'url correspond au chemin */}
        <Route path="/" element={<Home str={str} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* La route offer/:id necessite l'envoie d'un params */}
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="*" element={<p>Error 404</p>} />
      </Routes>
    </Router>
  );
}

export default App;
