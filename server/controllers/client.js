import getCountryIso3 from "country-iso-2-to-3";

// Import the Product, ProductStat, User, and Transaction models
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

// Define an asynchronous function that retrieves all products with their corresponding statistics
export const getProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    // Retrieve the statistics for each product
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        // Find the corresponding statistics for the current product
        const stat = await ProductStat.find({
          productId: product._id,
        });
        // Return an object that includes the original product data and its corresponding statistics
        return {
          ...product._doc,
          stat,
        };
      })
    );

    // Send the response to the client with a 200 status code and an array of products with statistics
    res.status(200).json(productsWithStats);
  } catch (error) {
    // If an error occurs, send the response to the client with a 404 status code and an error message
    res.status(404).json({ message: error.message });
  }
};

// Define an asynchronous function that retrieves all customers with the "user" role
export const getCustomers = async (req, res) => {
  try {
    // Find all users with the role "user" and exclude the password field
    const customers = await User.find({ role: "user" }).select("-password");
    // Send the response to the client with a 200 status code and an array of customers
    res.status(200).json(customers);
  } catch (error) {
    // If an error occurs, send the response to the client with a 404 status code and an error message
    res.status(404).json({ message: error.message });
  }
};

// Define an asynchronous function that retrieves transactions with pagination and search/sorting options
export const getTransactions = async (req, res) => {
  try {
    // Get the pagination, search, and sorting options from the query parameters
    const { page = 1, pageSize = 10, sort = null, search = "" } = req.query;

    // Define a function to generate the formatted sort object
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "desc" ? -1 : 1,
      };
      return sortFormatted;
    };

    // Generate the formatted sort object
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    // Find transactions matching the search criteria, sort and paginate the results
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    // Count the total number of transactions matching the search criteria
    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    // Send the response to the client with a 200 status code and an object containing the transactions and total count
    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    // If an error occurs, send the response to the client with a 404 status code and an error message
    res.status(404).json({ message: error.message });
  }
};

// Define an asynchronous function that retrieves the location data of all users
export const getGeography = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    // Map over each user to group them by country using the "reduce" method
    const mappedLocations = users.reduce((acc, { country }) => {
      // Convert the country name to its ISO 3166-1 alpha-3 code using the "getCountryIso3" function
      const countryISO3 = getCountryIso3(country);
      // If the country code has not been encountered before, add it to the accumulator object and set the count to 0
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      // Increment the count for the current country code
      acc[countryISO3]++;
      return acc;
    }, {});

    // Convert the "mappedLocations" object to an array of objects with "id" and "value" properties
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    // Send the response to the client with a 200 status code and the formatted location data
    res.status(200).json(formattedLocations);

  } catch (error) {
    // If an error occurs, send the response to the client with a 404 status code and an error message
    res.status(404).json({ message: error.message });
  }
};
