import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  city: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model('Donor', donorSchema);