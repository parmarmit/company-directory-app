import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddCompany from "./pages/AddCompany";
import EditCompany from "./pages/EditCompany";
import ViewCompany from "./pages/ViewCompany";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-company" element={<AddCompany />} />

        <Route path="/edit-company/:id" element={<EditCompany />} />

        <Route path="/view-company/:id" element={<ViewCompany />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
