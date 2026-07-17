import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  Search,
  FileText,
  CircleCheckBig,
  MapPin,
  Globe,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/api/companies");
      setCompanies(response.data.companies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Latest 3 Companies
  const featuredCompanies = [...companies].slice(-3).reverse();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* ================= HERO ================= */}

      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            Find Your Dream Career
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mt-6 leading-tight">
            Welcome to <span className="text-blue-600">CareerConnect</span>
          </h1>

          <p className="text-gray-600 text-lg mt-6">
            Discover top companies, explore exciting opportunities, and apply
            for your dream job through one modern platform.
          </p>

          <div className="flex justify-center mt-10">
            <Link
              to="/companies"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl transition"
            >
              Explore Companies
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold">Featured Companies</h2>

            <p className="text-gray-500 mt-2">
              Explore recently added companies.
            </p>
          </div>

          <button
            onClick={() => navigate("/companies")}
            className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {featuredCompanies.map((company) => {
            const initials = company.name
              .split(" ")
              .slice(0, 2)
              .map((word) => word[0])
              .join("")
              .toUpperCase();

            return (
              <div
                key={company._id}
                className="bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col"
              >
                {/* Avatar */}

                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-2xl font-bold flex items-center justify-center mx-auto">
                  {initials}
                </div>

                {/* Company */}

                <h2 className="text-2xl font-bold text-center line-clamp-2 min-h-[60px] flex items-center justify-center">
                  {company.name}
                </h2>

                <p className="text-center text-blue-600 font-medium">
                  {company.category}
                </p>

                <div className="flex items-center justify-center gap-2 mt-3 text-gray-500 text-sm">
                  <MapPin size={16} />

                  {company.address?.split(",")[0]}
                </div>

                <div className="flex items-center justify-center gap-2 mt-2 text-gray-500 text-sm">
                  <Globe size={16} />

                  {company.website?.replace("https://", "")}
                </div>

                <div className="border-t border-gray-200 my-6"></div>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {company.tags?.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigate(`/company/${company._id}`)}
                  className="mt-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 transition"
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="bg-white mt-20 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">
              Why Choose CareerConnect?
            </h2>

            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Everything you need to discover companies, apply for jobs, and
              track your career journey in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}

            <div className="bg-gray-50 group rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110">
                <Search className="text-blue-600" size={30} />
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Explore Companies
              </h3>

              <p className="text-gray-600 leading-7">
                Browse trusted companies, view their details, categories,
                locations and choose the best opportunity for your career.
              </p>
            </div>

            {/* Card 2 */}

            <div className="bg-gray-50 group rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110">
                <FileText className="text-green-600" size={30} />
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Easy Application
              </h3>

              <p className="text-gray-600 leading-7">
                Apply to your favourite companies within seconds using a simple
                and clean application process.
              </p>
            </div>

            {/* Card 3 */}

            <div className="bg-gray-50 group rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110">
                <CircleCheckBig className="text-yellow-600" size={30} />
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Track Applications
              </h3>

              <p className="text-gray-600 leading-7">
                Monitor every application and instantly know whether it is
                Pending, Approved or Rejected.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
