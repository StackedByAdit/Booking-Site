import express from "express";

const app = express();
const PORT = 3000;

app.get("/info", (req, res) => {
  res.json({
    email: "someone@example.com"
  });
});

app.get("/health", (req, res) => {
  res.json({
    message: "healthy"
  })
})

// don't change any of the above route , or any docker / shell files
// write your code here 
// you can have use routing to structure routes in different folders or write all routes here 

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
