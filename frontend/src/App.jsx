import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import UserLayout from "./layouts/UserLayout";

// Admin Pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AddCompany from "./pages/admin/AddCompany";
import EditCompany from "./pages/admin/EditCompany";
import ViewCompany from "./pages/admin/ViewCompany";
import Applications from "./pages/admin/Applications";

// User Pages
import Home from "./pages/user/Home";
import Companies from "./pages/user/Companies";
import CompanyDetails from "./pages/user/CompanyDetails";
import UserLogin from "./pages/user/Login";
import Register from "./pages/user/Register";
import Profile from "./pages/user/Profile";
import MyApplications from "./pages/user/MyApplications";
import ApplyCompany from "./pages/user/ApplyCompany";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= USER ROUTES ================= */}

        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/companies" element={<Companies />} />

          <Route path="/company/:id" element={<CompanyDetails />} />

          <Route path="/login" element={<UserLogin />} />

          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/my-applications" element={<MyApplications />} />

          <Route path="/apply/:id" element={<ApplyCompany />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}

        <Route path="/admin/login" element={<Login />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route path="/admin/add-company" element={<AddCompany />} />

        <Route path="/admin/edit-company/:id" element={<EditCompany />} />

        <Route path="/admin/view-company/:id" element={<ViewCompany />} />

        <Route path="/admin/applications" element={<Applications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
