import express from "express";
import cors from "cors";

// Routes imports
import authRoutes from "./routes/auth.routes";
import passport from "passport";
import strategy from "./middlewares/passport";

// Inits
const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
passport.use(strategy)
// Routes
app.get("/", (req, res) => {
  res.send(`The API is at http://localhost:${app.get("port")}`);
});

app.use("/auth", authRoutes);

export default app;
