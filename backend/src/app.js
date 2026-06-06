import express from "express";
import cors from "cors";
import companyRoutes from "./routes/company.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working...");
});

app.use("/api/companies", companyRoutes);
app.use("/api/auth", authRoutes);

export default app;
