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
import PasswordChangePage from "@/pages/password-change-page";
import SuggestedArticlesPage from "@/pages/suggested-articles-page";
import PasswordChangeInitPage from "@/pages/password-change-init-page";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import InformBadger from "@/components/inform-badge/inform-badger";
import DialogueProvider from "@/components/dialogues/dialogue-provider";

import "@/index.css";

/**
 * <=== GENERAL ===>
 *
 * @todo logo design
 *
 * @todo preview of the profile picture before uploading (profile-page)
 *
 * @todo play with the colours of the app a little bit (find the best theme)
 *
 * @todo improve layouts of the page informing that email was sent when changing password or verifying
 *
 * @fixme loading JSON content for the articles except for the plain HTML
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
    element: (
      <DialogueProvider>
        <UserPage />
      </DialogueProvider>
    ),
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
    path: "/settings",
    element: <SettingsPage />,
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "account",
        element: (
          <Link to={"/password"} className="sliding-link">
            Change your password
          </Link>
        ),
      },
    ],
  },
  {
    path: "/password",
    element: <PasswordChangeInitPage />,
  },
  {
    path: "/password/:token",
    element: <PasswordChangePage />,
  },
  {
    path: "/article",
    element: <ArticlePage />,
  },
  {
    path: "writing",
    element: <WritingPage />,
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
