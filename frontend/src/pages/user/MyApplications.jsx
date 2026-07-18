// PART 1 START
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import {
  Search,
  BriefcaseBusiness,
  Clock3,
  CircleCheckBig,
  CircleX,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Eye,
  Trash2,
} from "lucide-react";

const MyApplications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  const fetchApplications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await api.get(`/api/applications/user/${user._id}`);

      setApplications(response.data.applications);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdraw = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to withdraw this application?",
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/api/applications/${id}`);

      alert(response.data.message);

      setApplications((prev) =>
        prev.filter((application) => application._id !== id),
      );
    } catch (error) {
      console.log(error);

      alert("Failed to withdraw application.");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((application) =>
    application.companyId?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const stats = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter((a) => a.status === "Pending").length,
      approved: applications.filter((a) => a.status === "Approved").length,
      rejected: applications.filter((a) => a.status === "Rejected").length,
    };
  }, [applications]);
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">My Applications</h1>

          <p className="text-gray-500 mt-2">
            Track all your submitted job applications.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <BriefcaseBusiness className="text-blue-600 mb-3" size={28} />
            <h2 className="text-3xl font-bold">{stats.total}</h2>
            <p className="text-gray-500">Total Applications</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <Clock3 className="text-yellow-500 mb-3" size={28} />
            <h2 className="text-3xl font-bold">{stats.pending}</h2>
            <p className="text-gray-500">Pending</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <CircleCheckBig className="text-green-600 mb-3" size={28} />
            <h2 className="text-3xl font-bold">{stats.approved}</h2>
            <p className="text-gray-500">Approved</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <CircleX className="text-red-500 mb-3" size={28} />
            <h2 className="text-3xl font-bold">{stats.rejected}</h2>
            <p className="text-gray-500">Rejected</p>
          </div>
        </div>

        {/* Search */}

        <div className="relative mb-10">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Cards */}

        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="bg-white rounded-3xl shadow-md p-12 text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <BriefcaseBusiness size={40} className="text-blue-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                No Applications Yet
              </h2>

              <p className="text-gray-500 mt-3 max-w-md">
                You haven't applied to any companies yet. Start exploring
                opportunities and submit your first application.
              </p>

              <button
                onClick={() => navigate("/companies")}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                Browse Companies
              </button>
            </div>

            <p className="text-gray-500 mt-2">Try searching another company.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7">
            {filteredApplications.map((application) => {
              const company = application.companyId;

              const initials = company.name
                .split(" ")
                .slice(0, 2)
                .map((word) => word[0])
                .join("")
                .toUpperCase();

              return (
                <div
                  key={application._id}
                  className="bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 h-full flex flex-col"
                >
                  {/* Avatar */}

                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-2xl font-bold flex items-center justify-center mx-auto">
                    {initials}
                  </div>

                  {/* Company */}

                  <h2 className="text-2xl font-bold text-center mt-5">
                    {company.name}
                  </h2>

                  <p className="text-center text-blue-600 font-medium">
                    {company.category}
                  </p>

                  <div className="flex items-center justify-center gap-2 mt-2 text-gray-500 text-sm">
                    <MapPin size={16} />
                    {company.address?.split(",")[0]}
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-1 text-gray-500 text-sm">
                    <Globe size={16} />
                    {company.website?.replace("https://", "")}
                  </div>

                  <div className="border-t border-gray-200 my-6"></div>

                  {/* Applied */}

                  <div className="flex justify-between items-center mb-5">
                    <span className="font-semibold text-gray-500">Applied</span>

                    <span className="text-sm">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Status */}

                  <div className="mb-5">
                    {application.status === "Pending" && (
                      <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
                        <Clock3 size={16} />
                        Pending
                      </span>
                    )}

                    {application.status === "Approved" && (
                      <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                        <CircleCheckBig size={16} />
                        Approved
                      </span>
                    )}

                    {application.status === "Rejected" && (
                      <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                        <CircleX size={16} />
                        Rejected
                      </span>
                    )}
                  </div>

                  {/* Applicant */}

                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-3">
                      <User size={18} className="text-blue-600" />
                      {application.fullName}
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-blue-600" />
                      {application.email}
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-blue-600" />
                      {application.phone}
                    </div>
                  </div>

                  {/* Buttons */}

                  <div className="mt-auto flex gap-3 pt-8">
                    <button
                      onClick={() => navigate(`/company/${company._id}`)}
                      className="flex-1 flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 transition"
                    >
                      <Eye size={18} />
                      View
                    </button>

                    <button
                      onClick={() => handleWithdraw(application._id)}
                      className="flex-1 flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 transition"
                    >
                      <Trash2 size={18} />
                      Withdraw
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
