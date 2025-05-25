import { router } from "@/routes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import InformBadger from "@/components/providers/inform-badger";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "@/index.css";

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
