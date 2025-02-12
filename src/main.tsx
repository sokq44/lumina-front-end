import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

import MainPage from "@/pages/main-page";
import UserPage from "@/pages/user-page";
import LoginPage from "@/pages/login-page";
import ArticlePage from "@/pages/article-page";
import ProfilePage from "@/pages/profile-page";
import WritingPage from "@/pages/writing-page";
import SettingsPage from "@/pages/settings-page";
import RegisterPage from "@/pages/register-page";
import NotFoundPage from "./pages/not-found-page";
import MyArticlesPage from "./pages/my-articles-page";
import VerifyEmailPage from "@/pages/verify-email-page";
import EmailVerifiedPage from "@/pages/email-verified-page";
import ChangePasswordPage from "@/pages/change-password-page";
import SuggestedArticlesPage from "@/pages/suggested-articles-page";
import PasswordChangeInitPage from "@/pages/password-change-init-page";

import Container from "@/components/container";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import InformBadger from "@/components/inform-badge/inform-badger";

import "./index.css";

// TODO: Logo design.
// TODO: Check pages' layouts (change-password-page, email-verified-page)

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
        element: <SuggestedArticlesPage />,
      },
      {
        path: "my-articles",
        element: <MyArticlesPage />,
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
        element: <Container>Security</Container>,
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
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="font-funnel">
      <ThemeProvider>
        <InformBadger>
          <RouterProvider router={router} />
          <Toaster />
        </InformBadger>
      </ThemeProvider>
    </main>
  </StrictMode>
);
