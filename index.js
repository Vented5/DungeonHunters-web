import express from "express";
import path from "path";

const app = express();
const PORT = 80; // Puerto de producción

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
