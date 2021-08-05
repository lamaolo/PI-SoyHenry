const { Country, conn } = require("../../src/db.js");

describe("Country model", () => {
  before(() => {
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  });
  describe("Validators", () => {
    beforeEach(async () => {
      await Country.sync({ force: true });
    });
    describe("Required fields", () => {
      it("Should throw an error if a required field is null", (done) => {
        Country.create({
          id: "ARG",
          name: "Argentina",
          subregion: "South America",
        })
          .then(() => {
            done(
              "Deberia lanzar un error si no se rellenan todos los campos requeridos"
            );
          })
          .catch(() => {
            done();
          });
      });

      it("Should create a row when all required fields are passed", (done) => {
        Country.create({
          id: "ARG",
          name: "Argentina",
          image: "https://restcountries.eu/data/arg.svg",
          continent: "Americas",
          capital: "Buenos Aires",
          subregion: "South America",
          area: 2780400,
          population: 43590400,
        })
          .then(() => {
            done();
          })
          .catch((error) => {
            done(error);
          });
      });

      it("ID must be a three characters string", (done) => {
        Country.create({
          id: "ARGENTINA",
          name: "Argentina",
          image: "https://restcountries.eu/data/arg.svg",
          continent: "Americas",
          capital: "Buenos Aires",
          subregion: "South America",
          area: 2780400,
          population: 43590400,
        })
          .then(() => {
            done("ID must be a three characters string");
          })
          .catch(() => {
            done();
          });
      });
    });
  });
});
