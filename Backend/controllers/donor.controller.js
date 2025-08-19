import Donor from '../models/Donor.js';

export const searchDonors = async (req, res) => {
  try {
    const { gender, city, bloodGroup } = req.query;

    const query = {};
    if (gender) query.gender = gender;
    if (city) query.city = city;
    if (bloodGroup) query.bloodGroup = bloodGroup;

    const donors = await Donor.find(query);
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};