import { router } from "@/routes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import InformBadger from "@/components/providers/inform-badger";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "@/index.css";

/**
 * @todo Create a dialogue telling the user how to use the text editor.
 * @todo Updated layouts for sugested and my articles pages for mobile devices.
 */

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
