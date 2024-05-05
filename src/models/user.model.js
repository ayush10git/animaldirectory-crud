import mongoose, { Schema } from "mongoose";

const animalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    species: {
      type: String,
      required: true,
    },
    habitat: {
      type: String,
      required: true,
      trim: true,
    },
    diet: {
      type: String,
      required: true,
    },
    average_lifespan: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export const Animal = mongoose.model("Animal", animalSchema);
