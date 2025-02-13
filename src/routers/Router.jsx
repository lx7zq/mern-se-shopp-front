import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Index";
import Cart from "../pages/Cart/Index";
import SignUp from "../components/SignUp";
import SignIn from "../components/SingIn";
import Setting from "../pages/Setting/Index";
// import Profile from "../pages/Profile/Index";
import { MyProfile } from "../pages/Profile/MyProfile";
import ProtectPage from "../pages/ProtectPage/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: (
          <ProtectPage>
            <Cart />
          </ProtectPage>
        ),
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/update-profile",
        element: <Setting />,
      },
      {
        path: "/profile",
        element: (
          <ProtectPage>
            <MyProfile />,
          </ProtectPage>
        ),
      },
    ],
  },
]);

export default router;
