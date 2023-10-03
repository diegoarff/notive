import express from "express";
import cors from "cors";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";
import mainRouter from "./routes/index.routes";

// Inits
const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(passportMiddleware);
// Routes
app.get("/", (req, res) => {
  res.send(`The API is at http://localhost:${app.get("port")}`);
});

app.use(mainRouter);

export default app;
