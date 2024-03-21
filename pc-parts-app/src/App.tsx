import { Box } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/context/ProtectedRoute";
import { Footer, NavBar } from "./components/navigation";
import { About } from "./pages/About";
import { Account } from "./pages/Account";
import { Landing } from "./pages/Landing";
import { ProductPage } from "./pages/ProductPage";
import { Store } from "./pages/Store";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Box bg={"#FAFAFA"} minH={"100vh"} minW={"100vw"}>
          <NavBar />
          <Box>
            <Routes>
              {/* Store Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/store" element={<Store />} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:productId" element={<ProductPage />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/account" element={<Account />} />
              </Route>
            </Routes>
          </Box>
          <Footer />
        </Box>
      </AuthProvider>
    </Router>
  );
}

export default App;
