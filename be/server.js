const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));
app.use("/vocab", require("./routes/vocab.routes"));
app.use("/user", require("./routes/user.routes"));
app.use("/practice", require("./routes/practice.routes"));

sequelize.sync().then(() => {
  console.log("DB connected & synced");
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  });
});
