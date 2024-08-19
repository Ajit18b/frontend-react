import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginRegdMain from "./LoginRegd/LoginRegdMain";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginRegdMain />} />
          <Route path="/dashboard" element={<></>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
