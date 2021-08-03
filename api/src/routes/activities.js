const router = require("express").Router();

const { Activity } = require("../db");

router.post("/", (req, res, next) => {
  const { name, difficulty, season, duration, countries } = req.body;

  if (!name || !difficulty || !countries) {
    next({
      message: "Los campos `name`, `difficulty` y `countries` son obligatorios",
      status: 400,
    });
  }

  Activity.create({
    name,
    difficulty,
    season,
    duration,
  })
    .then((createdActivity) => {
      createdActivity.setCountries(countries.map((c) => c.toUpperCase()));
      res.json({ data: createdActivity, error: null });
    })
    .catch((error) => next({ message: error.message, status: 500 }));
});

router.get("/", (req, res, next) => {
  Activity.findAll()
    .then((activities) => {
      res.json({ data: activities, error: null });
    })
    .catch((error) => next({ message: error.message, status: 500 }));
});

module.exports = router;
