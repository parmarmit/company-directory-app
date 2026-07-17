import express from "express";

import {
  applyCompany,
  getApplications,
  deleteApplication,
  updateApplicationStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.post("/", applyCompany);

router.get("/", getApplications);

router.delete("/:id", deleteApplication);

router.put("/:id/status", updateApplicationStatus);

export default router;
