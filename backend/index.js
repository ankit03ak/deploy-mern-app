const express = require("express")

const app = express();
require("./models/db.js")
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const Authrouter = require("./routes/Authrouter.js")
const ProductRouter = require("./routes/ProductRouter.js")
const PORT = process.env.PORT;

// app.get("/ankit", (req, res) =>{
//     res.send("hello Ankit");
// })

app.use(bodyParser.json())
app.use(cors())
app.use("/auth", Authrouter)
app.use("/products", ProductRouter)

app.listen(PORT, () => {
    console.log("Server is running at", PORT)
})