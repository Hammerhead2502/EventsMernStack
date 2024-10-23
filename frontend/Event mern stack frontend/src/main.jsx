/* eslint-disable react/prop-types */
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomeComponents/HomePage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./LoginComponents/Login";
import SignUp from "./LoginComponents/SignUp";
import Nav_Bar from "./UtilComponents/Nav_Bar";
import { Outlet } from "react-router-dom";
import store from "./lib/store/store";
import { Provider } from "react-redux";
import Events from "./EventsComponents/Events";
import EventDetails from "./EventsComponents/EventDetails";
import SeatPicker from "./TicketsComponents/SeatPicker";
import AddToCart from "./TicketsComponents/AddToCart";
import PlaceOrder from "./TicketsComponents/PlaceOrder";
import MyOrders from "./ProfileComponents/MyOrders";
import ProtectedRoutes from "./UtilComponents/ProtectedRoutes";
import AdminPanel from "./AdminComponents/AdminPanel";
import AdminRoutes from "./UtilComponents/AdminRoutes";
import EventPanel from "./AdminComponents/EventPanel";
import Footer from "./UtilComponents/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import OverviewPage from "./AdminComponents/Overview";
import UserPanel from "./AdminComponents/UserPanel";

const router = createBrowserRouter([
  {
    element: <NavWrapper />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:val",
        element: <HomePage />,
      },

      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/details/:ev",
        element: <EventDetails />,
      },
      {
        path: "/select-seats/:ev",
        element: <SeatPicker />,
      },
      {
        path: "/add-to-cart",
        element: <AddToCart />,
      },
      {
        path: "/place-order",
        element: <PlaceOrder />,
      },

      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/my-orders",
            element: <MyOrders />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminRoutes />,
    children: [
      {
        path: "admin",
        element: <AdminPanel />,
        children: [
          {
            path: "events",
            element: <EventPanel />,
          },
          {
            path: "overview",
            element: <OverviewPage />,
          },
          {
            path: "users",
            element: <UserPanel />
          }
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENTID}>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </GoogleOAuthProvider>
);

function NavWrapper() {
  return (
    <div>
      <Nav_Bar />
      <Outlet />
      <Footer />
    </div>
  );
}

