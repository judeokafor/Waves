import mongoose from 'mongoose';
const { Schema } = mongoose;

const brandSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
    maxlength: 100,
  },
});
const Brand = mongoose.model('Brand', brandSchema);
export default Brand;
