import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginRegdMain from "./LoginRegd/LoginRegdMain";
import Dashboard from "./Landing/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginRegdMain />} />
          <Route path="/login" element={<LoginRegdMain />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
