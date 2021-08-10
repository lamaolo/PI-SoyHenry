const router = require("express").Router();

const { Activity, Country } = require("../db");

router.post("/", (req, res, next) => {
  const { name, difficulty, description, season, duration, countries } =
    req.body;

  if (!name || !difficulty || !countries || !description) {
    return next({
      message: "Los campos `name`, `difficulty` y `countries` son obligatorios",
      status: 400,
    });
  } else {
    Activity.create({
      name,
      difficulty,
      description,
      season,
      duration,
    })
      .then((createdActivity) => {
        createdActivity.setCountries(countries.map((c) => c.toUpperCase()));
        res.json({ data: createdActivity, error: null });
      })
      .catch((error) => next({ message: error.message }));
  }
});

router.get("/", (req, res, next) => {
  Activity.findAll({ include: { model: Country, attributes: ["name"] } })
    .then((activities) => {
      res.json({ data: activities, error: null });
    })
    .catch((error) => next({ message: error.message, status: 500 }));
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  if (!id)
    return next({ message: "El parametro ID es obligatorio", status: 400 });

  Activity.findByPk(id, { include: Country })
    .then((activity) => {
      if (!activity) {
        return next({
          message: "No existe ninguna actividad con el ID especificado",
          status: 404,
        });
      }
      res.json({ data: activity, error: null });
    })
    .catch((error) => next({ message: error.message }));
});

router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  const toUpdate = {};
  const { countries } = req.body;

  for (const key in req.body) {
    if (req.body[key]) toUpdate[key] = req.body[key];
  }

  Activity.findByPk(id)
    .then((activity) => {
      activity.setCountries(countries).then(() => {
        activity
          .update(toUpdate)
          .then(() => res.json({ data: "Actualizao", error: null }));
      });
    })
    .catch((error) => next({ message: error.message }));
});

module.exports = router;
