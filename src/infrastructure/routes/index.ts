import express from "express";
import initDatabase from "@database";
import { categoryRoute } from "@routes/CategoryRoute";
import { comboRoute } from "@routes/ComboRoute";
import { productRoute } from "@routes/ProductRoute";

export const apiRoutes = express.Router();

initDatabase();

apiRoutes.use("/category", categoryRoute);
apiRoutes.use("/product", productRoute);
apiRoutes.use("/combo", comboRoute);
