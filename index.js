import express from "express";

const app = express();
const PORT = 3000;

// write your code here 
// you can have use routing to structure routes in different folders or write all routes here 

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
