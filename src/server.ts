import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json(
    {
      message: "olá nlw 05"
    }
  );
});

app.post("/users", (request, response) => {
  return response.json({
    message: "Usuário salvo com sucesso"
  });
});

app.listen(3333, () => {
  console.log("The server is running on port 3333")
}) ;