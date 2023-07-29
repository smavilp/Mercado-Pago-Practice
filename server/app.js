const cors = require("cors");
const express = require("express");
const apiRoutes = require("./routes/index");

app = express();
app.use(express.json());
app.use(cors());
apiRoutes(app);

app.listen(8000, () => console.log(`Server running on port 8000`));
app.get("/", (req, res) => res.send("Server running"));
