require("dotenv").config();
const port = process.env.PORT || 5000;
const express = require("express");
const dbConnect = require("./config/db");
const SprintRoute = require("./routes/sprint.routes")
const authRoutes = require("./routes/auth.routes");
const cors = require("cors")

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => res.send("hello"));
app.use("/sprints", SprintRoute)
app.use("/auth", authRoutes);

app.listen(port, async () => {
  await dbConnect();
  console.log(`server started on port ${port}`);
});
