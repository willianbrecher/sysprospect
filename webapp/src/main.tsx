import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./pages/AppRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { initApi } from "./bootstrap/bootstrapApi";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

const queryClient = new QueryClient();
initApi();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
