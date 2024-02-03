const express = require("express");
const cors = require('cors');
const app = express();
const dbconfig = require('./db');
const roomsRoute = require('./routes/roomsRoute');
const usersRoute=require('./routes/usersRoute')
app.use(cors()); // Use cors middleware before defining routes
app.use(express.json());

app.use('/api/rooms', roomsRoute);
app.use('/api/users',usersRoute)

const port = process.env.PORT || 5000; // Use process.env.PORT if available, otherwise default to 5000
app.listen(port, () => console.log(`Node server started on port ${port}`));
