import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Animal } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addAnimal = asyncHandler(async (req, res) => {
  const { name, species, habitat, diet, average_lifespan, description } =
    req.body;

  if (
    !name ||
    !species ||
    !habitat ||
    !diet ||
    !average_lifespan ||
    !description
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingAnimal = await Animal.findOne({ name });

  if (existingAnimal) throw new ApiError(409, "Animal already in directory");

  const imageLocalPath = req.files?.image[0]?.path;

  if (!imageLocalPath) throw new ApiError(400, "Image is required");

  const image = await uploadOnCloudinary(imageLocalPath);

  const animal = await Animal.create({
    name,
    image: image.url,
    species,
    habitat,
    diet,
    average_lifespan: average_lifespan + "years",
    description,
  });

  if (!animal)
    throw new ApiError(500, "Something went wrong while adding the animal");

  return res
    .status(201)
    .json(new ApiResponse(200, animal, "Animal added successfully"));
});

const getAllAimals = asyncHandler(async (req, res) => {
  const animals = await Animal.find({});

  return res
    .status(200)
    .json(new ApiResponse(200, animals, "All animals fetched successfully"));
});

const getAnimal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const animal = await Animal.findById(id);

  return res
    .status(200)
    .json(new ApiResponse(200, animal, "Animal fetched successfully"));
});

const updateAnimal = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { name, species, habitat, diet, average_lifespan, description } =
    req.body;

  let updateFields = {
    name,
    species,
    habitat,
    diet,
    average_lifespan,
    description,
  };

  const animal = await Animal.findByIdAndUpdate(
    id,
    {
      $set: updateFields,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, animal, "Animal details updated successfully"));
});

const updateAnimalImage = asyncHandler(async (req, res) => {
  const imageLocalPath = req.file?.path;
  console.log(imageLocalPath);

  if (!imageLocalPath) {
    throw new ApiError(400, "Image file is missing");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image.url) {
    throw new ApiError(400, "Error while uploading on image");
  }

  const animal = await Animal.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: image.url,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, animal, "Animal's image updated successfully"));
});

const deleteAnimal = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new ApiError(400, "Enter valid id");
  }

  await Animal.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Animal deleted successfully."));
});

export {
  addAnimal,
  getAllAimals,
  getAnimal,
  updateAnimal,
  updateAnimalImage,
  deleteAnimal,
};
