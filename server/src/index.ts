import express from "express"
import { connectDB } from "./utils/features.js";
import { config } from "dotenv";
import Stripe from "stripe";
import { NextFunction, Request, Response } from "express";
import paymentRoutes from "./routes/payment.js"
config({
  path: "./.env",
});
const port = process.env.PORT || 3000;
const stripeKey = process.env.STRIPE_KEY || "";
connectDB();
export const stripe = new Stripe(stripeKey);
// All Routes
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/payment", paymentRoutes);
app.get("/", (req: Request, res: Response, next: NextFunction) => {
res.send("Backend is running");
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})