import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = models.User || model('User', userSchema);
