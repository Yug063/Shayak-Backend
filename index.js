const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dbConfig = require('./config/database');

dotenv.config(); 
dbConfig.connect()

const PORT = process.env.PORT || 5000; 

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));

app.use(express.json()); 
app.use(cookieParser()); 

const authRoutes = require("./routes/authRoutes"); 
const chatRoutes = require("./routes/chatRoutes"); 

app.use("/api/v1/user", authRoutes); 
app.use("/api/v1/chat", chatRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});