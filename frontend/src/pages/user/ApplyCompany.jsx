import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const ApplyCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await api.post("/api/applications", {
        companyId: id,
        userId: user._id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });

      alert(response.data.message);

      navigate("/my-applications");
    } catch (error) {
      alert(error.response?.data?.message || "Application Failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      <div className="bg-white shadow rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center">Apply Company</h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Fill your details to apply.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyCompany;
