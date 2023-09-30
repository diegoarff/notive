import express from "express";
import cors from "cors";

// Routes imports
import authRoutes from "./routes/auth.routes";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";
import NoteRouter from "./routes/note.routes";

// Inits
const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
passport.use(passportMiddleware)
// Routes
app.get("/", (req, res) => {
  res.send(`The API is at http://localhost:${app.get("port")}`);
});

app.use("/auth", authRoutes);
app.use("/notes", NoteRouter)
export default app;
