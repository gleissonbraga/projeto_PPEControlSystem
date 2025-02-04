import  express  from "express";
import dotenv from 'dotenv'
// ROUTER
import { company_router } from "./router/CompanyRouter";
import { user_router } from "./router/UserRouter";


dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())


app.use('/empresa', company_router)
app.use('/usuario', user_router)




app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})