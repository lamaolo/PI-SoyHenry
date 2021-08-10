const router = require("express").Router();
const axios = require("axios");
const { Sequelize } = require("sequelize");

const { Country, Activity } = require("../db");
const API_BASE = process.env.API;

//?name=abc
router.get("/", (req, res, next) => {
  const { name } = req.query;

  if (name) {
    Country.findAll({
      where: {
        "country.name": Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("country.name")),
          "LIKE",
          name.toLowerCase() + "%"
        ),
      },
      include: {
        model: Activity,
      },
    })
      .then((countries) => {
        if (!countries.length) {
          next({
            message: "No se encontro ningun pais con el termino ingresado.",
            status: 404,
          });
        } else {
          res.json({ data: countries, error: null });
        }
      })
      .catch((error) => next({ message: error.message, status: 500 }));
  } else {
    Country.findAll({
      include: Activity,
    })
      .then((countries) => {
        if (!countries.length) {
          axios(`${API_BASE}/all`)
            .then(({ data }) => {
              // Mapeo respuesta de la API para que matchee con el model de la DB.
              const mappedCountries = data.map((country) => ({
                id: country.alpha3Code,
                name: country.name,
                image: country.flag,
                continent: country.region,
                capital: country.capital,
                subregion: country.subregion,
                area: country.area,
                population: country.population,
              }));

              Country.bulkCreate(mappedCountries);

              console.log("Respondiendo con data de la API");
              res.json({ data: mappedCountries, error: null });
            })
            .catch((error) => next({ message: error.message, status: 500 }));
        } else {
          // Si ya tengo la info en la DB; devuelvo esa info.
          console.log("Respondiendo con data de la DB");
          res.json({ data: countries, error: null });
        }
      })
      .catch((error) => next({ message: error.message, status: 500 }));
  }
});

router.get("/:idPais", (req, res, next) => {
  const { idPais } = req.params;

  Country.findOne({
    where: {
      id: idPais.toUpperCase(),
    },
    include: Activity,
  }).then((pais) => {
    if (!pais) {
      next({ message: "No existe pais con ese ID.", status: 404 });
    } else {
      res.json({ data: pais, error: null });
    }
  });
});

//type = asc || desc
router.get("/filter/population/:type", (req, res, next) => {
  const { type } = req.params;

  if (type.toUpperCase() !== "ASC" && type.toUpperCase() !== "DESC") {
    next({ message: "El tipo debe ser ASC o DESC.", status: 400 });
  }

  Country.findAll({
    order: [["population", type.toUpperCase()]],
  })
    .then((countries) => {
      res.json({ data: countries, error: null });
    })
    .catch((error) => next({ message: error.message, status: 500 }));
});

module.exports = router;
