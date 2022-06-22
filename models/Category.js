import { Schema, model, models } from 'mongoose';

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = models.Category || model('Category', categorySchema);
