import express from "express";
import notesRoutes from "./src/routes/notesRoutes.js";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./src/middleware/rateLimiter.js";
import cors from "cors"
import path from "path"

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

if(process.env.NODE_ENV!== "production"){
app.use(cors({
  origin: "http://localhost:5173",
})
);}

app.use(express.json());  
app.use(rateLimiter);


// app.use((req,res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// })

app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname,"../frontend/dist","index.html"))
})
}
connectDB().then(() => {


app.listen(PORT, () => {
  console.log(`Server started on Port : ${PORT}`);
  
});
});


