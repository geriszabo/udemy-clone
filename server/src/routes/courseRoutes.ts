import express from "express"
import multer from "multer"
import { createCourse, deleteCourse, getCourse, listCourses, updateCourse, getUploadVideoUrl } from "../controllers/courseController"
import { requireAuth } from "@clerk/express"

const router = express.Router()
const upload = multer({storage: multer.memoryStorage()})

router.get("/", listCourses)
router.post("/", requireAuth(), createCourse)
router.put("/:courseId", requireAuth(), upload.single("image"), updateCourse )
router.delete("/:courseId", requireAuth(), deleteCourse)

router.post(
    "/:courseId/sections/:sectionId/chapters/:chapterId/get-upload-url",
    requireAuth(),
    getUploadVideoUrl
  );

router.get("/:courseId", getCourse)

export default router