const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const User = require("./models/userData");

//stating the path --------------------------
const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//middleware ----------------------------
app.use(express.static(staticPath));
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.urlencoded({ extended: false }));

//routing --------------------------
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/contact", async (req, res) => {
  try {
    const userInfo = new User(req.body);
    const data = await userInfo.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(400).send(error);
  }
});

//listening the port --------------------------
app.listen(port, () => {
  console.log(`server is live at ${port}`);
});
