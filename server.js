const express = require("express");
const api = require("./routes/api/index.js");

const server = express();
const PORT = process.env.PORT || 3001;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api", api);

server.listen(PORT, () => {

    console.log(`Server listening at port ${PORT}`);

});