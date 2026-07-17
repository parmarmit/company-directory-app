import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const CompanyDetails = () => {
  const { id } = useParams();

  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const response = await api.get(`/api/companies/${id}`);

      setCompany(response.data.company);
    } catch (error) {
      console.log(error);
    }
  };

  if (!company) {
    return <h2 className="text-center text-2xl mt-10">Loading...</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-white shadow rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800">{company.name}</h1>

        <p className="text-blue-600 font-medium mt-2">{company.category}</p>

        <hr className="my-6" />

        <div className="space-y-4">
          <p>
            <strong>Address :</strong> {company.address}
          </p>

          <p>
            <strong>Phone :</strong> {company.phone}
          </p>

          <p>
            <strong>Email :</strong> {company.email}
          </p>

          <p>
            <strong>Website :</strong>{" "}
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >
              {company.website}
            </a>
          </p>

          <div>
            <strong>Tags :</strong>

            <div className="flex flex-wrap gap-2 mt-2">
              {company.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <Link
              to={`/apply/${company._id}`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
