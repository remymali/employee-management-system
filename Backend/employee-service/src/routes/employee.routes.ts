import { Router } from "express";
import { createEmployeeController ,getAllEmployeesController,getAllEmployeeById,editEmployee,deleteEmployee} from "../controllers/employee.controller";

const router = Router();

router.post("/", createEmployeeController);
router.get("/", getAllEmployeesController);
router.get("/:id", getAllEmployeeById);
router.put("/:id", editEmployee);
router.delete('/:id', deleteEmployee);

export default router;