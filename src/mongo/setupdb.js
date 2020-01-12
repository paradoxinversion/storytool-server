const mongoose = require("mongoose");

const setup = async testing => {
  await mongoose.connect(
    `mongodb://localhost/${testing ? "storytool-test" : "storytool"}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));

  return { db, mongoose };
};

module.exports = setup;
