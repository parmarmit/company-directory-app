import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Search,
  User,
  Mail,
  Phone,
  Building2,
  Clock3,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

const Applications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================
  // GET APPLICATIONS
  // ==========================

  const getApplications = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/applications`,
      );

      setApplications(response.data.applications);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  // ==========================
  // UPDATE STATUS
  // ==========================

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/applications/${id}/status`,
        {
          status,
        },
      );

      alert(`Application ${status}`);

      getApplications();
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // SEARCH
  // ==========================

  const filteredApplications = applications.filter((application) => {
    const company = application.companyId?.name || "";
    const applicant = application.fullName || "";

    return (
      company.toLowerCase().includes(search.toLowerCase()) ||
      applicant.toLowerCase().includes(search.toLowerCase())
    );
  });

  // ==========================
  // STATS
  // ==========================

  const stats = useMemo(() => {
    return {
      total: applications.length,

      pending: applications.filter(
        (application) => application.status === "Pending",
      ).length,

      approved: applications.filter(
        (application) => application.status === "Approved",
      ).length,

      rejected: applications.filter(
        (application) => application.status === "Rejected",
      ).length,
    };
  }, [applications]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}

      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Applications</h1>

            <p className="text-gray-500">Manage all job applications</p>
          </div>

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-4xl font-bold">{stats.total}</h2>

            <p className="text-gray-500 mt-2">Total Applications</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-4xl font-bold text-yellow-500">
              {stats.pending}
            </h2>

            <p className="text-gray-500 mt-2">Pending</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-4xl font-bold text-green-600">
              {stats.approved}
            </h2>

            <p className="text-gray-500 mt-2">Approved</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-4xl font-bold text-red-600">
              {stats.rejected}
            </h2>

            <p className="text-gray-500 mt-2">Rejected</p>
          </div>
        </div>

        {/* SEARCH */}

        <div className="relative mb-8">
          <Search className="absolute left-4 top-4 text-gray-400" size={20} />

          <input
            type="text"
            placeholder="Search applicant or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white rounded-xl border pl-12 pr-4 py-4 outline-none"
          />
        </div>

        {/* APPLICATIONS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredApplications.map((application) => {
            const company = application.companyId;

            return (
              <div
                key={application._id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col"
              >
                {/* Company */}

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                    {company?.name
                      ?.split(" ")
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">{company?.name}</h2>

                    <p className="text-blue-600">{company?.category}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-blue-600" />
                    <span>{application.fullName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-blue-600" />
                    <span>{application.email}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-blue-600" />
                    <span>{application.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Building2 size={18} className="text-blue-600" />
                    <span>{company?.name}</span>
                  </div>
                </div>

                <div className="border-t my-5"></div>

                {/* Status */}

                {application.status === "Pending" && (
                  <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full w-fit">
                    <Clock3 size={18} />
                    Pending
                  </span>
                )}

                {application.status === "Approved" && (
                  <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full w-fit">
                    <CircleCheckBig size={18} />
                    Approved
                  </span>
                )}

                {application.status === "Rejected" && (
                  <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full w-fit">
                    <CircleX size={18} />
                    Rejected
                  </span>
                )}

                {/* Buttons */}

                <div className="flex gap-3 mt-6">
                  <button
                    disabled={application.status !== "Pending"}
                    onClick={() => updateStatus(application._id, "Approved")}
                    className={`flex-1 py-3 rounded-xl text-white transition ${
                      application.status === "Pending"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Approve
                  </button>

                  <button
                    disabled={application.status !== "Pending"}
                    onClick={() => updateStatus(application._id, "Rejected")}
                    className={`flex-1 py-3 rounded-xl text-white transition ${
                      application.status === "Pending"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}

        {filteredApplications.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-12 text-center mt-10">
            <h2 className="text-3xl font-bold text-gray-700">
              No Applications Found
            </h2>

            <p className="text-gray-500 mt-3">
              There are no applications matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
