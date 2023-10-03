import express from "express";
import cors from "cors";
import passport from "passport";

// Routes imports
import AuthRouter from "./routes/auth.routes";
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
app.use(passport.initialize());
passport.use(passportMiddleware);
// Routes
app.get("/", (req, res) => {
  res.send(`The API is at http://localhost:${app.get("port")}`);
});

app.use("/auth", AuthRouter);
app.use("/notes", passport.authenticate("jwt", { session: false }), NoteRouter);

export default app;
