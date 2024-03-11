import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { Landing } from "./pages/Landing";
import { Store } from "./pages/Store";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home and 404 */}
        <Route path="/" element={<Landing />}>
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
