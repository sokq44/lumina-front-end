import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import MainPage from "@/pages/main-page";
import UserPage from "@/pages/user-page";
import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import ModifyUserPage from "@/pages/modify-user-page";
import VerifyEmailPage from "@/pages/verify-email-page";
import EmailVerifiedPage from "@/pages/email-verified-page";
import ChangePasswordPage from "@/pages/change-password-page";
import PasswordChangeInitPage from "@/pages/password-change-init-page";
import "./index.css";
import SettingsPage from "./pages/settings-page";

// TODO: Logo design
// TODO: Login process and api integration
// TODO: User's panel page design & api integration

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/email/:token",
    element: <EmailVerifiedPage />,
  },
  {
    path: "/email",
    element: <VerifyEmailPage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "/user/settings",
    element: <SettingsPage />,
    children: [
      {
        path: "profile",
        element: <div>Profile</div>,
      },
      {
        path: "account",
        element: (
          <Link to={"/user/password"} className="sliding-link">
            Change your password
          </Link>
        ),
      },
      {
        path: "Security",
        element: <div>Security</div>,
      },
    ],
  },
  {
    path: "/user/modify",
    element: <ModifyUserPage />,
  },
  {
    path: "/user/password",
    element: <PasswordChangeInitPage />,
  },
  {
    path: "/user/password/:token",
    element: <ChangePasswordPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="font-funnel">
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </main>
  </StrictMode>
);
