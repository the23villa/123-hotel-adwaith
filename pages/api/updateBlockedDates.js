import connectDB from "@/libs/db";
import Rent from "@/models/rent.model";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { rentId, startDate, endDate } = req.body;

    const rent = await Rent.findById(rentId);
    if (!rent) {
      return res.status(404).json({ message: "Rent not found" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Block all dates from start to the day before end
    for (
      let date = new Date(start);
      date < end;
      date.setDate(date.getDate() + 1)
    ) {
      const dateToBlock = new Date(date);
      if (
        !rent.blockedDates.some(
          (blockedDate) => blockedDate.getTime() === dateToBlock.getTime()
        )
      ) {
        rent.blockedDates.push(dateToBlock);
      }
    }

    await rent.save();

    return res
      .status(200)
      .json({ message: "Blocked dates updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
