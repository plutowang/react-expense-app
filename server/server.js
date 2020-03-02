const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, "..", "public");

app.use(express.static(publicPath));

app.get("*", (request, response) => {
  response.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is up at http://localhost:${PORT}/`);
});
