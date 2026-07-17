import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, MapPin, Mail, Globe } from "lucide-react";
import api from "../../services/api";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/api/companies");
      setCompanies(response.data.companies);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Explore Companies</h1>

        <p className="text-gray-500 mt-3 text-lg">
          Discover companies and apply for your dream job.
        </p>

        <p className="text-sm text-gray-400 mt-2">
          {filteredCompanies.length} Companies Available
        </p>
      </div>

      {/* Search */}
      {/* Search */}
      <div className="mb-10 relative">
        <Search
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-full pl-14 pr-6 py-4 outline-none shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
        />
      </div>

      {/* Empty State */}
      {filteredCompanies.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-700">No Company Found</h2>

          <p className="text-gray-500 mt-2">
            Try searching with another keyword.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {filteredCompanies.map((company) => {
            const initials = company.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .substring(0, 2)
              .toUpperCase();

            return (
              <div
                key={company._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col"
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto">
                  {initials}
                </div>

                {/* Company Name */}
                <h2 className="text-2xl font-bold text-center mt-5 text-gray-800">
                  {company.name}
                </h2>

                {/* Category */}
                <div className="flex justify-center mt-3">
                  <span className="bg-blue-100 text-blue-700 text-sm px-4 py-1 rounded-full font-medium">
                    {company.category}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-6 space-y-4 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="text-blue-600 mt-0.5 flex-shrink-0"
                    />

                    <p className="leading-6">
                      {company.address || "Not Available"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-blue-600 flex-shrink-0" />

                    <p className="truncate">
                      {company.email || "Not Available"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-blue-600 flex-shrink-0" />

                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline truncate"
                      >
                        {company.website
                          .replace("https://", "")
                          .replace("http://", "")}
                      </a>
                    ) : (
                      <span>Not Available</span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {company.tags && company.tags.length > 0 ? (
                    company.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No Tags Available
                    </span>
                  )}
                </div>

                {/* Button */}
                <div className="mt-8">
                  <Link
                    to={`/company/${company._id}`}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Companies;
