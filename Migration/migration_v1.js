const UserModel = require("../mongodbConnectMigration");

// Define the migration logic
const runMigration = async () => {
  try {
    // Update all user documents in the 'users' collection
    const updateResult = await UserModel.updateMany(
      {}, // Empty filter to update all documents
      {
        $set: {
          investmentPackage: "no plan",
          profit: 0, // Set new field "profit" to zero
          totalPackages: 0, // Set new field "totalPackages" to zero
          activePackages: 0, // Set new field "activePackages" to zero
        },
      }
    );

    console.log("Migration completed successfully", updateResult);
  } catch (error) {
    console.error("Error during migration:", error);
  }
};

runMigration();
