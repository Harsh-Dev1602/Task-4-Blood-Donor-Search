import express from 'express';
import { register, login , logout} from "../controllers/user.controller.js";
import { searchDonors } from '../controllers/donor.controller.js';


const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get('/search', searchDonors);


export default router;