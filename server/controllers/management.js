import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";


// Function to get all users with the "admin" role
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Function to get a user's performance data
export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    /**
     * Fast operation
     * Best practies to use "aggregate" for complex queries
     * Similar to join in SQL
     */

    // Use aggregate to get user data with affiliate stats
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      {
        $unwind: "$affiliateStats",
      },
    ]);

    // Get sales transactions for the user
    const salesTransactions = await Transaction.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    // Filter out null transactions and return the user's data and sales transactions
    const filteredSalesTransactions = salesTransactions.filter(
      (transaction) => transaction !== null
    );
    res.status(200).json({
      user: userWithStats[0],
      sales: filteredSalesTransactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
