import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ViewCompany = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [company, setCompany] = useState(null);

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/companies/${id}`,
      );

      setCompany(response.data.company);
    } catch (error) {
      console.log(error);
    }
  };

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Company Details</h1>

        <div className="space-y-5">
          <div>
            <p className="font-semibold text-gray-600">Company Name</p>
            <p className="text-lg">{company.name}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-600">Email</p>
            <p className="text-lg">{company.email || "N/A"}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-600">Phone</p>
            <p className="text-lg">{company.phone}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-600">Website</p>

            {company.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Website
              </a>
            ) : (
              <p>N/A</p>
            )}
          </div>

          <div>
            <p className="font-semibold text-gray-600">Category</p>
            <p className="text-lg">{company.category || "N/A"}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-600">Facebook</p>

            {company.facebook ? (
              <a
                href={company.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Facebook Profile
              </a>
            ) : (
              <p>N/A</p>
            )}
          </div>

          <div>
            <p className="font-semibold text-gray-600">Instagram</p>

            {company.instagram ? (
              <a
                href={company.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-pink-600 hover:underline"
              >
                Instagram Profile
              </a>
            ) : (
              <p>N/A</p>
            )}
          </div>

          <div>
            <p className="font-semibold text-gray-600">LinkedIn</p>

            {company.linkedin ? (
              <a
                href={company.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:underline"
              >
                LinkedIn Profile
              </a>
            ) : (
              <p>N/A</p>
            )}
          </div>

          <div>
            <p className="font-semibold text-gray-600">Tags</p>

            {company.tags?.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {company.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p>N/A</p>
            )}
          </div>

          <div>
            <p className="font-semibold text-gray-600">Address</p>
            <p className="text-lg">{company.address}</p>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
          >
            Back
          </button>

          <button
            onClick={() => navigate(`/edit-company/${company._id}`)}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
          >
            Edit Company
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCompany;
