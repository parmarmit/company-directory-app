import Company from "../models/company.model.js";

export const createCompany = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      website,
      email,
      category,
      tags,
      facebook,
      instagram,
      linkedin,
    } = req.body;

    // Validation
    if (!name || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Name,Phone and Address are required",
      });
    }

    // Duplicate check
    const existingCompany = await Company.findOne({
      name,
      phone,
    });

    if (existingCompany) {
      return res.status(409).json({
        success: false,
        message: "company already exists",
      });
    }

    //create company
    const company = await Company.create({
      name,
      phone,
      address,
      website,
      email,
      category,
      tags,
      facebook,
      instagram,
      linkedin,
    });

    // Success Response
    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET All Companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    return res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//GET Single Company
export const getCompanyById = async (req, res) => {
  try {
    // console.log("GET BY ID HIT");
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "company not found...",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//UPDATE Company Details
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "company not found...",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE Company
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search API
export const searchCompanies = async (req, res) => {
  try {
    // console.log("SEARCH API HIT");
    const { search } = req.query;

    const companies = await Company.find({
      name: {
        $regex: search || "",
        $options: "i",
      },
    });

    return res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Pagination Controller
export const getCompaniesWithPagination = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const totalCompanies = await Company.countDocuments();

    const companies = await Company.find().skip(skip).limit(limit);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalCompanies / limit),
      totalCompanies,
      companies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Multi Delete Controller
export const deleteMultipleCompanies = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide company ids",
      });
    }
    await Company.deleteMany({
      _id: {
        $in: ids,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Companies deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
