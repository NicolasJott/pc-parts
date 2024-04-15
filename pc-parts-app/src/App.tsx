import { Box } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/context/ProtectedRoute";
import {
  About,
  Account,
  Checkout,
  ConfirmOrder,
  Information,
  Landing,
  Login,
  Payment,
  ProductPage,
  Products,
  Signup,
  Store,
} from "./pages";
import Shipping from "./pages/Shipping";

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

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="account" element={<Account />} />
              </Route>
            </Route>

            <Route path="checkout" element={<Checkout />}>
              <Route path="information" element={<Information />} />
              <Route path="shipping" element={<Shipping />} />
              <Route path="payment" element={<Payment />} />
            </Route>
            <Route path="checkout/confirm-order" element={<ConfirmOrder />} />
          </Routes>
        </Box>
      </AuthProvider>
    </Router>
  );
}

export default App;
