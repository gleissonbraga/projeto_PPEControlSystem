import  express  from "express";
import dotenv from 'dotenv'
// ROUTER
import { company_router } from "./router/CompanyRouter";
import { user_router } from "./router/UserRouter";
import { employee_router } from "./router/EmployeeRouter";
import { category_epi_router } from "./router/CategoryEpiRouter";
import { product_epi_router } from "./router/ProductEpiRouter";
import { control_epi_router } from "./router/ControlEpiRouter";
import { LoginController } from "./controller/LoginController";
import { AuthMiddleware } from "./middleware/AuthMiddleware";

const loginController = new LoginController()
const authMiddleware = new AuthMiddleware()


dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.post('/login', loginController.login)

app.use(authMiddleware.authUser)

app.use('/empresa', company_router)
app.use('/usuario', user_router)
app.use('/funcionarios', employee_router)
app.use('/categoria_epi', category_epi_router)
app.use('/epis', product_epi_router)
app.use('/controle/epi', control_epi_router)




app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})