import { Router } from "express";
import {
  addAnimal,
  deleteAnimal,
  getAllAimals,
  getAnimal,
  updateAnimal,
  updateAnimalImage,
} from "../controllers/animals.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/add").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  addAnimal
);

router.route("/get-all").get(getAllAimals);
router.route("/get/:id").get(getAnimal);
router.route("/update/:id").put(updateAnimal);
router
  .route("/update/image/:id")
  .put(upload.single("image"), updateAnimalImage);

router.route("/delete/:id").delete(deleteAnimal);

export default router;
