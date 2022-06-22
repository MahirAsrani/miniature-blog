import { Schema, model, models } from 'mongoose';
import User from './User';
import Category from './Category';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    featureImage: String,

    category: { type: 'ObjectId', ref: Category },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: { type: 'ObjectId', ref: User },
  },
  { timestamps: true }
);

module.exports = models.Post || model('Post', postSchema);
