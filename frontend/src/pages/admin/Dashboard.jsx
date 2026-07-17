import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/company-logo.png";

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // Get All Companies
  const getCompanies = async () => {
    try {
      setLoading(true);

      const response = await await axios.get(
        `${import.meta.env.VITE_API_URL}/api/companies/pagination/list?page=${page}&limit=4`,
      );

      setCompanies(response.data.companies);
      setTotalPages(response.data.totalPages);
      setTotalCompanies(response.data.totalCompanies);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompanies();
  }, [page]);

  // Search Company
  const searchCompany = async (value) => {
    try {
      if (value === "") {
        getCompanies();
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/companies/search?search=${value}`,
      );

      setCompanies(response.data.companies);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Company
  const deleteCompany = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/companies/${id}`);

      alert("Company Deleted Successfully");

      getCompanies();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete All Companies
  const deleteAllCompanies = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all companies?",
    );

    if (!confirmDelete) return;

    try {
      const ids = companies.map((company) => company._id);

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/companies/multi/delete`,
        {
          data: { ids },
        },
      );

      alert("All Companies Deleted");

      getCompanies();
    } catch (error) {
      console.log(error);
    }
  };

  // View Company
  const viewCompany = (id) => {
    navigate(`/admin/view-company/${id}`);
  };

  // Edit Company
  const editCompany = (id) => {
    navigate(`/admin/edit-company/${id}`);
  };

  // Add Company
  const addCompany = () => {
    navigate("/admin/add-company");
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-lg font-medium text-gray-600">
          Loading Companies...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold">Company Directory</h1>

              <p className="text-sm text-gray-500">Admin Dashboard</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Search */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Company..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                searchCompany(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <button
            onClick={addCompany}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            Add Company
          </button>

          <button
            onClick={deleteAllCompanies}
            className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700"
          >
            Delete All
          </button>

          <button
            onClick={() => navigate("/admin/applications")}
            className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700"
          >
            Applications
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Companies: {totalCompanies}
          </h3>
        </div>

        <h2 className="text-2xl font-bold mb-6">Company List</h2>

        {companies.length === 0 ? (
          <div className="bg-white p-10 rounded-lg shadow text-center">
            <h2 className="text-4xl mb-3">📂</h2>

            <h3 className="text-xl font-semibold text-gray-600">
              No Companies Found
            </h3>

            <p className="text-gray-400 mt-2">
              Click Add Company to create a new record.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {company.name}
                </h2>

                <p className="mb-2">
                  <strong>Email:</strong> {company.email}
                </p>

                <p className="mb-2">
                  <strong>Phone:</strong> {company.phone}
                </p>

                <p className="mb-4">
                  <strong>Address:</strong> {company.address}
                </p>

                {company.category && (
                  <p className="mb-2">
                    <strong>Category:</strong> {company.category}
                  </p>
                )}

                {company.website && (
                  <p className="mb-4">
                    <strong>Website:</strong>{" "}
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => viewCompany(company._id)}
                    className="w-20 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  >
                    View
                  </button>

                  <button
                    onClick={() => editCompany(company._id)}
                    className="w-20 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCompany(company._id)}
                    className="w-20 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
