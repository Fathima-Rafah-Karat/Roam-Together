// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/index";
// import Auth from "./pages/Auth";
// import Dashboard from "./pages/Dashboard";
// import TripDetails from "./pages/TripDetails";
// import TripChat from "./pages/TripChat";
// import OrganizerDashboard from "./pages/OrganizerDashboard";
// import OrganizerVerification from "./pages/OrganizerVerification";
// import AdminVerifications from "./pages/AdminVerifications";
// import AdminDashboard from "./pages/AdminDashboard";
// import TravelDiary from "./pages/TravelDiary";
// import Community from "./pages/Community";
// import Emergency from "./pages/Emergency";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/auth" element={<Auth />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/trip/:id" element={<TripDetails />} />
//           <Route path="/trip/:id/chat" element={<TripChat />} />
//           <Route path="/organizer" element={<OrganizerDashboard />} />
//           <Route path="/organizer/verify" element={<OrganizerVerification />} />
//           <Route path="/admin/verifications" element={<AdminVerifications />} />
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="/diary" element={<TravelDiary />} />
//           <Route path="/community" element={<Community />} />
//           <Route path="/emergency" element={<Emergency />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;







import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import TripDetails from "./pages/TripDetails";
import TripChat from "./pages/TripChat";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import OrganizerVerification from "./pages/OrganizerVerification";
import AdminVerifications from "./pages/AdminVerifications";
import AdminDashboard from "./pages/AdminDashboard";
import TravelDiary from "./pages/TravelDiary";
import Community from "./pages/Community";
import Emergency from "./pages/Emergency";
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trip/:id" element={<TripDetails />} />
          <Route path="/trip/:id/chat" element={<TripChat />} />
          <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
          <Route path="/organizer/verify" element={<OrganizerVerification />} />
          <Route path="/admin/verifications" element={<AdminVerifications />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/diary" element={<TravelDiary />} />
          <Route path="/community" element={<Community />} />
          <Route path="/emergency" element={<Emergency />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
