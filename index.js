import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

// import signupRoutes from "./routes/signup.js";
// import usersRoutes from "./routes/users.js";
// import loginRoutes from './routes/login.js'
import { dbConnect } from "./config/db.js";
import {loginUser} from "./controllers/login.js";
import { getUsers } from "./controllers/users.js";
import {createUser} from "./controllers/signup.js"

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

dbConnect();

app.post("/signup", createUser);
app.use("/users", getUsers);
app.post('/login', loginUser)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
