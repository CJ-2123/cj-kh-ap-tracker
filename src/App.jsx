import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Tracker from "./components/Tracker.jsx";
import Hitlist from "./components/Hitlist.jsx";
import Home from "./components/Home.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/hitlist" element={<Hitlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
