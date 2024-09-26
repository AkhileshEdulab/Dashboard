import express from "express";
import { postTimeline,getAllTimelines,deleteTimeline} from "../controller/timelineContoroller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add",isAuthenticated,postTimeline)
router.get("/getall",getAllTimelines)
router.delete("/delete/:id",isAuthenticated,deleteTimeline)

export default router;
