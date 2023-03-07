// Import the Product and ProductStat models
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";

// Define an asynchronous function that retrieves all products with their corresponding statistics
export const getProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    // Map over each product to retrieve its corresponding statistics
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        // Retrieve the ProductStat object that matches the product's ID
        const stat = await ProductStat.find({
          productId: product._id,
        });
        // Return an object that includes the product's original data and the statistics object
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

export const getCustomers = async (req, res) => {

  try {
    const customers = await User
    .find({role: "user"})
    .select("-password");
    res.status(200).json(customers);

   
  } catch (error) {
    // If an error occurs, send the response to the client with a 404 status code and an error message
    res.status(404).json({ message: error.message });
  }
};