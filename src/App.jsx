import "./App.css";
import { useState } from "react";
// Je renomme BrowserRouter en Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import Home from "./pages/Home";
import Details from "./pages/Details";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";

// Import components
import Header from "./components/Header";
import Cookies from "js-cookie";

function App() {
  //Déclarations
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [minval, setMinVal] = useState(0);
  const [maxval, setMaxVal] = useState(999999);
  const [active, setActive] = useState("");
  const [publishMem, setPublishMem] = useState(false);
  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove(token);
      setToken(null);
    }
  };
  return (
    // Router doit contenir tout mon site
    <Router>
      {/* Mon Header apparait sur toutes les pages */}
      <Header
        visible={visible}
        token={token}
        search={search}
        minval={minval}
        maxval={maxval}
        active={active}
        publishMem={publishMem}
        setVisible={setVisible}
        setToken={setToken}
        setSearch={setSearch}
        handleToken={handleToken}
        setMinVal={setMinVal}
        setMaxVal={setMaxVal}
        setActive={setActive}
        setPublishMem={setPublishMem}
      />
      {/* Le composant Routes doit contenir toutes mes routes, il affiche un seul de ses enfants à la fois */}
      <Routes>
        {/* path=chemin element=le composant à afficher si l'url correspond au chemin */}
        <Route
          path="/"
          element={
            <Home
              search={search}
              minval={minval}
              maxval={maxval}
              active={active}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Home
              search={search}
              minval={minval}
              maxval={maxval}
              active={active}
            />
          }
        />
        <Route path="/details" element={<Details />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route
          path="/login"
          element={
            <Login
              publishMem={publishMem}
              handleToken={handleToken}
              setPublishMem={setPublishMem}
            />
          }
        />
        <Route path="/Publish" element={<Publish />} />
        {/* La route offer/:id necessite l'envoie d'un params */}
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="*" element={<p>Error 404</p>} />
      </Routes>
    </Router>
  );
}

export default App;
