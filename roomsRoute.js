const express = require("express");
const router = express.Router();
const cors = require("cors"); // Import the cors middleware
const Room = require('../Models/room');

// Use cors middleware
router.use(cors());

router.get("/getallrooms", async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.send(rooms);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post("/getroombyid", async (req, res) => {
    const roomid = req.body.roomid;
    try {
        const room = await Room.findOne({ _id: roomid }); // Change to room.findOne
        if (!room) { // Correct the condition to check if room is not found
            return res.status(404).json({ message: "Room not found" });
        }
        res.send(room);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


module.exports = router;
