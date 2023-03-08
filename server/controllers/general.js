// Import necessary models
import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

// Function to get a user by id
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Function to get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Set current month, year, and day values (hardcoded for now)
    const currentMonth = "November";
    const currentYear = "2021";
    const currentDay = "2021-11-15";

    // Get recent transactions
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ created: -1 });

    // Get overall statistics for the current year
    const overallStat = await OverallStat.find({ year: currentYear });

    // Destructure the overall statistics object
    const {
      totalCustomers,
      totalyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    // Get the statistics for the current month and day
    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });
    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    // Return all dashboard statistics
    res.status(200).json({
      totalCustomers,
      totalyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
