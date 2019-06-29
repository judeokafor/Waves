import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  token: {
    type: String,
  },
});
userSchema.pre('save', async function hashPassword(next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(this.password, salt);
      this.password = hash;
      next();
    } else {
      next();
    }
  } catch (error) {
    return next(error);
  }
  return false;
});
const User = mongoose.model('User', userSchema);
export default User;
