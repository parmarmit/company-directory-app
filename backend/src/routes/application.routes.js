import express from "express";

import {
  applyCompany,
  getUserApplications,
  getApplications,
  deleteApplication,
  updateApplicationStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.post("/", applyCompany);

router.get("/user/:userId", getUserApplications);

router.get("/", getApplications);

router.delete("/:id", deleteApplication);

router.put("/:id/status", updateApplicationStatus);

export default router;
