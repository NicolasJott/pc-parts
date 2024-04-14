import { Box } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/context/ProtectedRoute";
import {
  About,
  Account,
  Checkout,
  Information,
  Landing,
  Login,
  ProductPage,
  Products,
  Signup,
  Store,
} from "./pages";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Box bg={"#FAFAFA"} minH={"100vh"} minW={"100vw"}>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Store Routes */}
            <Route path="/store" element={<Store />}>
              <Route path="home" element={<Landing />} />
              <Route path="products" element={<Products />} />
              <Route path="about" element={<About />} />
              <Route path="product/:productId" element={<ProductPage />} />
            </Route>

            <Route path="checkout" element={<Checkout />}>
              <Route path="information" element={<Information />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<Account />} />
            </Route>
          </Routes>
        </Box>
      </AuthProvider>
    </Router>
  );
}

export default App;
