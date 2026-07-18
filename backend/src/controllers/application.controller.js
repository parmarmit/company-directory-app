import Application from "../models/Application.model.js";

// Apply Company
export const applyCompany = async (req, res) => {
  try {
    const { companyId, userId, fullName, email, phone } = req.body;

    if (!companyId || !userId || !fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const application = await Application.create({
      companyId,
      userId,
      fullName,
      email,
      phone,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// GET ALL APPLICATIONS
// ============================

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("companyId")
      .populate("userId", "name email phone");

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// DELETE APPLICATION
// ============================

export const deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// UPDATE APPLICATION STATUS
// ============================

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Allow only Approved or Rejected
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Application ${status} successfully.`,
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET USER APPLICATIONS

export const getUserApplications = async (req, res) => {
  try {
    const { userId } = req.params;

    const applications = await Application.find({ userId }).populate(
      "companyId",
    );

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
