import connectDB from "@/libs/db";
import Rent from "@/models/rent.model";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { rentId } = req.query;

    const rent = await Rent.findById(rentId);
    if (!rent) {
      return res.status(404).json({ message: 'Rent not found' });
    }

    return res.status(200).json({ blockedDates: rent.blockedDates });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}