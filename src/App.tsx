// src/App.tsx

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import WinnerDeclaration from "./pages/WinnerDeclaration";
import Refund from "./pages/Refund";
import ETender from "./pages/ETender";
import Authorization from "./pages/Authorization";
import ApprovalConfirmationPage from "./pages/ApprovalConfirmation";
import TokenDisplayPage from "./pages/TokenDisplay";
import VerifyTokenPage from "./pages/VerifyToken";
import UserTender from "./pages/UserTender";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import CreateNewPassword from "./pages/CreateNewPassword";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

// Route Guards
import { RedirectIfAuth, RequireAuth } from "./routes/ProtectedRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route
            path="/login"
            element={
              <RedirectIfAuth>
                <Login />
              </RedirectIfAuth>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectIfAuth>
                <Register />
              </RedirectIfAuth>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />

          {/* Authorization workflow routes */}
          <Route path="/authorization" element={<Authorization />} />
          <Route
            path="/authorization/generate-token"
            element={<ApprovalConfirmationPage />}
          />
          <Route
            path="/authorization/token-display"
            element={<TokenDisplayPage />}
          />
          <Route
            path="/authorization/verify-token"
            element={<VerifyTokenPage />}
          />

          {/* Admin-only routes */}
          <Route
            path="/winner-declaration"
            element={
              <RequireAuth allowedRoles={["departmental"]}>
                <WinnerDeclaration />
              </RequireAuth>
            }
          />
          <Route
            path="/refund"
            element={
              <RequireAuth allowedRoles={["departmental"]}>
                <Refund />
              </RequireAuth>
            }
          />
          <Route
            path="/e-tender"
            element={
              <RequireAuth allowedRoles={["departmental"]}>
                <ETender />
              </RequireAuth>
            }
          />
          <Route
            path="/e-tender/create"
            element={
              <RequireAuth allowedRoles={["departmental"]}>
                <ETender />
              </RequireAuth>
            }
          />
          <Route
            path="/e-tender/edit-view"
            element={
              <RequireAuth allowedRoles={["departmental"]}>
                <ETender />
              </RequireAuth>
            }
          />

          {/* User-only routes */}
          <Route
            path="/user/tender"
            element={
              <RequireAuth allowedRoles={["general"]}>
                <UserTender />
              </RequireAuth>
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
