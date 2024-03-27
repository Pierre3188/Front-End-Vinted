import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import Home from "./pages/Home";
import Details from "./pages/Details";
import Offer from "./pages/Offer";

// Import components
import Header from "./components/Header";

function App() {
  const str = "tom";

  return (
    <Router>
      {/* <header>HEADER</header> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home str={str} />} />
        <Route path="/details" element={<Details />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="*" element={<p>Error 404</p>} />
      </Routes>
    </Router>
  );
}

export default App;
