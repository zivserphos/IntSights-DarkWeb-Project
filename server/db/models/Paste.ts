/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose, { Schema } from "mongoose";

const PasteSchema: Schema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
});

const PasteS = mongoose.model("paste", PasteSchema);

export default PasteS;
