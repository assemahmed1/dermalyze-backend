const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    diagnosis: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Improving", "Stable", "Critical"],
      default: "Stable",
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    images: [
      {
        url: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);