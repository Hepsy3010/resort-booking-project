const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://hepsyrajan3029:hepsy@cluster0.n2yjjq9.mongodb.net/bookingroom';
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var connection = mongoose.connection;

connection.on('error', () => {
  console.log('MongoDB connection failed');
});

connection.on('connected', () => {
  console.log('MongoDB connection successful');
});

module.exports = mongoose;
