import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppWrapper from "./components/layouts/AppWrapper";
import Business from "./pages/Business";
import BusinessWrapper from "./components/layouts/BusinessWrapper";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewProduct from "./pages/NewProduct";
import Shop from "./pages/Shop";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<AppWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:shopId">
            <Route index element={<Shop />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Route>
        <Route path="/business" element={<BusinessWrapper />}>
          <Route index element={<Business />} />
          <Route path="add-product" element={<NewProduct />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default App;
