/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

const agent = supertest(app);

const countries = [
  {
    id: "ARG",
    name: "Argentina",
    image: "https://restcountries.eu/data/arg.svg",
    continent: "Americas",
    capital: "Buenos Aires",
    subregion: "South America",
    area: 2780400,
    population: 43590400,
  },
  {
    id: "ESP",
    name: "Spain",
    image: "https://restcountries.eu/data/esp.svg",
    continent: "Europe",
    capital: "Madrid",
    subregion: "Southern Europe",
    area: 505992,
    population: 46438422,
  },
  {
    id: "ARM",
    name: "Armenia",
    image: "https://restcountries.eu/data/arm.svg",
    continent: "Asia",
    capital: "Yerevan",
    subregion: "Western Asia",
    area: 29743,
    population: 2994400,
  },
];

describe("Test countries routes", () => {
  after(async () => {
    conn.close();
  });
  describe("GET /api/countries", async () => {
    beforeEach(async () => {
      await Country.sync({ force: true });
      await Country.bulkCreate(countries);
    });

    it("should get 200", () => agent.get("/api/countries").expect(200));

    it("responds with the list of countries", () => {
      return agent.get("/api/countries").then((res) => {
        expect(res.body.data[0].id).to.equal("ESP");
        expect(res.body.data[0].name).to.equal("Spain");

        expect(res.body.data[1].id).to.equal("ARM");
        expect(res.body.data[1].name).to.equal("Armenia");

        expect(res.body.data[2].id).to.equal("ARG");
        expect(res.body.data[2].name).to.equal("Argentina");
      });
    });

    it("responds with the list of countries whose name starts with the specified string", () => {
      return agent.get("/api/countries?name=ar").then((res) => {
        expect(res.body.data[0].id).to.equal("ARG");
        expect(res.body.data[0].name).to.equal("Argentina");

        expect(res.body.data[1].id).to.equal("ARM");
        expect(res.body.data[1].name).to.equal("Armenia");
      });
    });

    it("error should be null", () => {
      return agent.get("/api/countries").then((res) => {
        expect(res.body.error).to.be.equal(null);
      });
    });
  });

  describe("GET /api/countries/:idPais", async () => {
    beforeEach(async () => {
      await Country.sync({ force: true });
      await Country.bulkCreate(countries);
    });

    it("should get 200", () => agent.get("/api/countries/arg").expect(200));

    it("should responds with the details of the country", () => {
      return agent.get("/api/countries/arg").then((res) => {
        expect(res.body.data.id).to.equal("ARG");
        expect(res.body.data.name).to.equal("Argentina");
        expect(res.body.data.capital).to.equal("Buenos Aires");
      });
    });

    it("responds with the details of the country", () => {
      return agent.get("/api/countries/esp").then((res) => {
        expect(res.body.data.id).to.equal("ESP");
        expect(res.body.data.name).to.equal("Spain");
        expect(res.body.data.capital).to.equal("Madrid");
      });
    });

    it("error should be null", () => {
      return agent.get("/api/countries/arg").then((res) => {
        expect(res.body.error).to.be.equal(null);
      });
    });

    it("data should be null if an invalid ID is passed", () => {
      return agent.get("/api/countries/argen").then((res) => {
        expect(res.body.error).to.be.equal("No existe pais con ese ID.");
        expect(res.body.data).to.be.equal(null);
      });
    });
  });
});
