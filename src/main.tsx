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
import NotFoundPage from "@/pages/not-found-page";
import MyArticlesPage from "@/pages/my-articles-page";
import VerifyEmailPage from "@/pages/verify-email-page";
import EmailVerifiedPage from "@/pages/email-verified-page";
import PasswordChangePage from "@/pages/password-change-page";
import SuggestedArticlesPage from "@/pages/suggested-articles-page";
import PasswordChangeInitPage from "@/pages/password-change-init-page";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import InformBadger from "@/components/inform-badge/inform-badger";
import DialogueProvider from "@/components/dialogues/dialogue-provider";

import "@/index.css";
import ErrorPage from "./pages/error-page";

/**
 * <=== GENERAL ===>
 *
 * @todo logo design
 *
 * @todo play with the colours of the app a little bit (find the best theme)
 *
 * @todo improve layouts of the page informing that email was sent when changing password or verifying
 *
 * <===============>
 *
 * <=== TEXT EDITOR ===>
 *
 * @todo tracking changes within an article
 *
 * @todo define prohibited protocols and urls for the Link extension
 *
 * @todo more user-friendly process of uploading pictures, banner image and profile image (lazy loading)
 *
 * <===================>
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/email/:token",
    element: <EmailVerifiedPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/email",
    element: <VerifyEmailPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user",
    element: (
      <DialogueProvider>
        <UserPage />
      </DialogueProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "articles",
        element: <SuggestedArticlesPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "my-articles",
        element: <MyArticlesPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "profile",
        element: (
          <DialogueProvider>
            <ProfilePage />
          </DialogueProvider>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "account",
        element: (
          <Link to={"/password"}>
            <Button variant="secondary">Change your password</Button>
          </Link>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/password",
    element: <PasswordChangeInitPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/password/:token",
    element: <PasswordChangePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/article",
    element: <ArticlePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "writing",
    element: <WritingPage />,
    errorElement: <ErrorPage />,
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
          <Toaster />
          <RouterProvider router={router} />
        </InformBadger>
      </ThemeProvider>
    </main>
  </StrictMode>
);
