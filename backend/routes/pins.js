const router = require("express").Router();
const Pin = require("../models/Pin");

// create a pin

router.post("/", async (req, res) => {
  console.log(req.body);
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/filter", async (req, res) => {
  console.log(req.body.f);
  const filter = req.body.f;
  console.log("hi");
  let query = {};
  if (filter == "wifi") {
    query = {
      //nonexistentfield: { $exists: false },
      $expr: {
        $gte: [
          {
            $divide: [
              "$resources.wifi.yes",
              {
                $add: [
                  "$resources.wifi.yes",
                  { $add: ["$resources.wifi.no", 0.1] },
                ],
              },
            ],
          },
          0.6,
        ],
      },
    };
  }
  if (filter == "outlet") {
    query = {
      //nonexistentfield: { $exists: false },
      $expr: {
        $gte: [
          {
            $divide: [
              "$resources.outlet.yes",
              {
                $add: [
                  "$resources.outlet.yes",
                  { $add: ["$resources.outlet.no", 0.1] },
                ],
              },
            ],
          },
          0.6,
        ],
      },
    };
  }
  if (filter == "washrooms") {
    query = {
      //nonexistentfield: { $exists: false },
      $expr: {
        $gte: [
          {
            $divide: [
              "$resources.washroom.yes",
              {
                $add: [
                  "$resources.washroom.yes",
                  { $add: ["$resources.washroom.no", 0.1] },
                ],
              },
            ],
          },
          0.6,
        ],
      },
    };
  }
  if (filter == "food") {
    query = {
      //nonexistentfield: { $exists: false },
      $expr: {
        $gte: [
          {
            $divide: [
              "$resources.food.yes",
              {
                $add: [
                  "$resources.food.yes",
                  { $add: ["$resources.food.no", 0.1] },
                ],
              },
            ],
          },
          0.6,
        ],
      },
    };
  }
  if (filter == "hrs") {
    query = {
      //nonexistentfield: { $exists: false },
      $expr: {
        $gte: [
          {
            $divide: [
              "$resources.twentyfourhr.yes",
              {
                $add: [
                  "$resources.twentyfourhr.yes",
                  { $add: ["$resources.twentyfourhr.no", 0.1] },
                ],
              },
            ],
          },
          0.6,
        ],
      },
    };
  }
  if (filter == "hrs") {
    query = {
      //nonexistentfield: { $exists: false },
      $expr: {
        $gte: [
          {
            $divide: [
              "$resources.menstrual.yes",
              {
                $add: [
                  "$resources.menstrual.yes",
                  { $add: ["$resources.menstrual.no", 0.1] },
                ],
              },
            ],
          },
          0.6,
        ],
      },
    };
  }

  console.log(query);
  try {
    const pins = await Pin.find(query);
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all pins

router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  id = req.body._id;

  console.log(req.body.resources);

  try {
    const updatedPin = await Pin.findByIdAndUpdate(
      req.body._id,
      {
        $inc: {
          "resources.wifi.yes": req.body.resources.wifiYes,
          "resources.wifi.no": req.body.resources.wifiNo,
          "resources.washroom.yes": req.body.resources.washroomsYes,
          "resources.washroom.no": req.body.resources.washroomsNo,
          "resources.outlets.yes": req.body.resources.outletsYes,
          "resources.outlets.no": req.body.resources.outletsNo,
          "resources.menstrual.yes": req.body.resources.menstrualYes,
          "resources.menstrual.no": req.body.resources.menstrualNo,
          "resources.food.yes": req.body.resources.foodYes,
          "resources.food.no": req.body.resources.foodNo,
          "resources.twentyfourhr.yes": req.body.resources.hrsYes,
          "resources.twentyfourhr.no": req.body.resources.hrsNo,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
