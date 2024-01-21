const router = require("express").Router();
const Pin = require("../models/Pin");

// create a pin

router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
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
