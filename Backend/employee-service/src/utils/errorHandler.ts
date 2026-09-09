import mongoose from "mongoose";

export const handleEmployeeError = (error: any) => {
  // Invalid MongoDB ObjectId
  if (error instanceof mongoose.Error.CastError) {
    return {
      statusCode: 400,
      message: "Invalid employee ID",
    };
  }

  // Duplicate employeeId or email
  if (error?.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern || {})[0];

    return {
      statusCode: 409,
      message: `${duplicateField || "Employee"} already exists`,
    };
  }

  return {
    statusCode: 500,
    message: "Internal server error",
  };
};