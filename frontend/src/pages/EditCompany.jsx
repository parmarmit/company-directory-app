import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCompany = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [company, setCompany] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    website: "",
    category: "",
  });

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/companies/${id}`,
      );

      setCompany(response.data.company);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/companies/${id}`, company);

      alert("Company Updated Successfully");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Company</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Company Name</label>

            <input
              type="text"
              name="name"
              value={company.name}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>

            <input
              type="text"
              name="phone"
              value={company.phone}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={company.email}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Website</label>

            <input
              type="text"
              name="website"
              value={company.website}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>

            <input
              type="text"
              name="category"
              value={company.category}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>

            <textarea
              name="address"
              value={company.address}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-md p-3"
              required
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
            >
              Update Company
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompany;
