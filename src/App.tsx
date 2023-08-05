import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppWrapper from "./components/layouts/AppWrapper";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
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
      </>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default App;
