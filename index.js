const express = require("express")
const dbConnection = require("./Db.js")
require("dotenv").config()
const cors = require("cors")
const userRouter = require("./Routers/UserRouters.js")
const notesRouter = require("./Routers/NotesRouter.js")
const filterRouter = require("./Routers/FilterNotes.js")
const userAuthentication = require("./Controller/userAutentication.js")

const app = express()
// Middlewares
app.use(express.json())
app.use(cors())

// API's
app.use("/api/user",userRouter)
app.use("/api/notes",userAuthentication,notesRouter)
app.use("/api/filter",userAuthentication,filterRouter)


// Db connection
dbConnection()



const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`App listening on port : ${port}`))
