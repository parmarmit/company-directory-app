import express from "express";

import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  searchCompanies,
  getCompaniesWithPagination,
  deleteMultipleCompanies,
} from "../controllers/company.controller.js";
const router = express.Router();

router.post("/", createCompany);
router.get("/", getAllCompanies);

//search
router.get("/search", searchCompanies);
//pagination
router.get("/pagination/list", getCompaniesWithPagination);
//Multi Delete
router.delete("/multi/delete", deleteMultipleCompanies);

router.get("/:id", getCompanyById);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;
