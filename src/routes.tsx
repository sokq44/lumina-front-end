import { createBrowserRouter } from "react-router-dom";
import MainPage from "@/pages/main-page";
import UserPage from "@/pages/user-page";
import LoginPage from "@/pages/login-page";
import ErrorPage from "@/pages/error-page";
import ArticlePage from "@/pages/article-page";
import ProfilePage from "@/pages/profile-page";
import WritingPage from "@/pages/writing-page";
import AccountPage from "@/pages/account-page";
import SettingsPage from "@/pages/settings-page";
import RegisterPage from "@/pages/register-page";
import NotFoundPage from "@/pages/not-found-page";
import MyArticlesPage from "@/pages/my-articles-page";
import VerifyEmailPage from "@/pages/verify-email-page";
import EmailVerifiedPage from "@/pages/email-verified-page";
import PasswordChangePage from "@/pages/password-change-page";
import SuggestedArticlesPage from "@/pages/suggested-articles-page";
import PasswordChangeInitPage from "@/pages/password-change-init-page";
import DialogueProvider from "@/components/providers/dialogue-provider";
import EmailChangeInitPage from "./pages/email-change-init-page";
import EmailChangedPage from "./pages/email-changed-page";

export const router = createBrowserRouter([
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
    path: "/email/change",
    element: <EmailChangeInitPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/email/change/:token",
    element: <EmailChangedPage />,
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
        element: <AccountPage />,
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
    path: "/article/:id",
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
