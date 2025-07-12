import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />
          <Route path="/winner-declaration" element={<WinnerDeclaration />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/e-tender" element={<ETender />} />
          <Route path="/e-tender/create" element={<ETender />} />
          <Route path="/e-tender/edit-view" element={<ETender />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/authorization/generate-token" element={<ApprovalConfirmationPage />} />
          <Route path="/authorization/token-display" element={<TokenDisplayPage />} />
          <Route path="/authorization/verify-token" element={<VerifyTokenPage />} />
          <Route path="/user/tender" element={<UserTender />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
