
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import ItemDetails from "./pages/ItemDetails";
import BrowseItems from "./pages/BrowseItems";
import MyReports from "./pages/MyReports";
import MyClaims from "./pages/MyClaims";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";

function Page({ title }) {
  return (
    <main className="page-container">
      <h1>{title}</h1>
      <p>Welcome to FoundIt. This page is being built.</p>
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/items" element={<BrowseItems />} />
          <Route path="/items/:id" element={<ItemDetails />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/report-lost" element={<ReportLost />} />
            <Route path="/report-found" element={<ReportFound />} />
            <Route path="/my-reports" element={<MyReports />} />
            <Route path="/my-claims" element={<MyClaims />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<Page title="404 - Page Not Found" />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
