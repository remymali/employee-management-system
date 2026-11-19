import {Router} from "express";
import { register,login,adminonly, profile} from "../controllers/auth.controller";
import { authenticateToken, AuthenticatedRequest } from "../middleware/auth.middleware";
import { authoriseRole } from "../middleware/role.middleware";

const router= Router();

router.post("/register", register);
router.post("/login",login)
router.get("/profile", authenticateToken,profile);
router.get("/admin", authenticateToken, authoriseRole("Admin"),adminonly );
export default router;