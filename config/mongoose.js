const mongoose = require("mongoose");

// Function to establish database connection

main().catch((err) => console.log(err));
async function main() {
  // Connect to MongoDB Atlas database
  await mongoose.connect(
    `mongodb+srv://chandrasekhar:chadru11235@cluster0.cq1slu9.mongodb.net/employee_review?retryWrites=true&w=majority`
  );
  console.log(`Connected to DB : employee_review`);
}

const db = mongoose.connection;

// Export the mongoose connection instance

module.exports = db;
