import express from "express";
import cors from "cors";

import companyRoutes from "./routes/company.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working...");
});

app.use("/api/companies", companyRoutes);
app.use("/api/auth", authRoutes); // Admin
app.use("/api/users", userRoutes); // User
app.use("/api/applications", applicationRoutes);

export default app;
