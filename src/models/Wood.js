import mongoose from 'mongoose';
const { Schema } = mongoose;

const woodSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
    maxlength: 100,
  },
});
const Wood = mongoose.model('Wood', woodSchema);
export default Wood;
