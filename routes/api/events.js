const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where you want to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


// @router  GET api/events
// @description: get all events
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user.events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @router  GET api/events/:eventId
// @description: get event by id
router.get("/:eventId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const eventId = req.params.eventId;

    // Find the event by ID
    const event = user.events.find((event) => event.id === eventId);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @router  POST api/events
// @description: add new event
router.post(
  "/",
  [auth,upload.single('picture'), [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(400).json({ msg: "User not Found!" });
      }
      const {
        title,
        description,
        location,
        organizer,
        speakers,
        category,
        status,
        date,
        fromTime,
        endTime
      } = req.body;
      const picturePath = req.file ? req.file.path : '';
      const newEvent = {
        title,
        description,
        location,
        organizer,
        speakers,
        category,
        status,
        picture: picturePath,
        date,
        fromTime,
        endTime
      };

      user.events.unshift(newEvent);
      await user.save();
      res.json(user.events);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @router  PUT api/events/:eventId
// @description: Update/edit event
router.put(
  "/:eventId",
  [auth,upload.single('picture'), [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: "User not Found!" });
      }

      const eventId = req.params.eventId;

      // Find the index of the event to be deleted
      const eventIndex = user.events.findIndex((event) => event.id === eventId);
      if (eventIndex === -1) {
        return res.status(404).json({ msg: "Event not found" });
      }
      user.events[eventIndex] = {
        ...user.events[eventIndex],
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        organizer: req.body.organizer,
        speakers: req.body.speakers,
        category: req.body.category,
        status: req.body.status,
        date: req.body.date,
        fromTime: req.body.fromTime,
        endTime: req.body.endTime
      };
      if (req.file) {
        user.events[eventIndex].picture = req.file.path;
      }

      await user.save();
      res.json(user.events);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @router  DELETE api/events/:eventId
// @description: delete event
router.delete("/:eventId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not Found!" });
    }

    const eventId = req.params.eventId;

    // Find the index of the event to be deleted
    const eventIndex = user.events.findIndex((event) => event.id === eventId);
    if (eventIndex === -1) {
      return res.status(404).json({ msg: "event not found" });
    }
    user.events.splice(eventIndex, 1);
    await user.save();
    res.json(user.events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
