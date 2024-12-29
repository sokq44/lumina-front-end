import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import MainPage from "@/pages/main-page";
import UserPage from "@/pages/user-page";
import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import VerifyEmailPage from "@/pages/verify-email-page";
import EmailVerifiedPage from "@/pages/email-verified-page";
import ChangePasswordPage from "@/pages/change-password-page";
import PasswordChangeInitPage from "@/pages/password-change-init-page";
import SettingsPage from "./pages/settings-page";
import ProfilePage from "@/pages/profile-page";
import "./index.css";
import ArticlesPage from "./pages/articles-page";
import WritingPage from "./pages/writing-page";
import ArticlePage from "./pages/article-page";

// TODO: Logo design
// TODO: Add a modal which asks whether the user is sure he wants to save the article.
// TODO: Mobile layouts for the article writing and reading pages.
// TODO: Viewing a particular article. Will be done by sending a get request to the back-end with the id.
// TODO: Deleting a particular article. Will be done by sending a DELETE request to the back-end with the id.
// TODO: Add "brief description" and "background image" to the article model.
// TODO: 404 Page

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
    children: [
      {
        path: "articles",
        element: <ArticlesPage />,
      },
    ],
  },
  {
    path: "/user/settings",
    element: <SettingsPage />,
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
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
    path: "user/writing",
    element: <WritingPage />,
  },
  {
    path: "/user/password",
    element: <PasswordChangeInitPage />,
  },
  {
    path: "/user/password/:token",
    element: <ChangePasswordPage />,
  },
  {
    path: "/article",
    element: <ArticlePage />,
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
