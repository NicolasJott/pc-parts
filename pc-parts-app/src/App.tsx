import { Box } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer, NavBar } from "./components/navigation";
import { About } from "./pages/About";
import { Landing } from "./pages/Landing";
import { ProductPage } from "./pages/ProductPage";
import { Store } from "./pages/Store";

function App() {
  return (
    <Router>
      <Box bg={"#FAFAFA"} minH={"100vh"}>
        <NavBar />
        <Box>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:productId" element={<ProductPage />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
