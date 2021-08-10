const { Activity, conn } = require("../../src/db");

describe("Activity model", () => {
  before(() => {
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  });

  describe("Required fields", () => {
    beforeEach(async () => {
      await Activity.sync({ force: true });
    });

    it("Should throw an error if a required field is null", (done) => {
      Activity.create({
        name: "Remo",
        difficulty: "2",
        season: "Verano",
      })
        .then(() => {
          done("No deberia haberse creado.");
        })
        .catch(() => {
          done();
        });
    });

    it("Should create a new Activity if all required fields are passed", (done) => {
      Activity.create({
        name: "Remo",
        difficulty: "2",
        season: "Verano",
        duration: "120", // minutes
        description: "Descripcion de prueba",
      })
        .then(() => {
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });
});
