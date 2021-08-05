// /* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require("chai");
// const session = require("supertest-session");
// const app = require("../../src/app.js");
// const { Country, conn } = require("../../src/db.js");

// const agent = session(app);

// const countries = [
//   {
//     id: "ARG",
//     name: "Argentina",
//     image: "https://restcountries.eu/data/arg.svg",
//     continent: "Americas",
//     capital: "Buenos Aires",
//     subregion: "South America",
//     area: 2780400,
//     population: 43590400,
//     createdAt: "2021-08-05T01:07:57.413Z",
//     updatedAt: "2021-08-05T01:07:57.413Z",
//     activities: [],
//   },
//   {
//     id: "ESP",
//     name: "Spain",
//     image: "https://restcountries.eu/data/esp.svg",
//     continent: "Europe",
//     capital: "Madrid",
//     subregion: "Southern Europe",
//     area: 505992,
//     population: 46438422,
//     createdAt: "2021-08-05T01:07:57.413Z",
//     updatedAt: "2021-08-05T01:07:57.413Z",
//     activities: [],
//   },
// ];

// describe("Test countries routes", () => {
//   before(() =>
//     conn.authenticate().catch((err) => {
//       console.error("Unable to connect to the database:", err);
//     })
//   );

//   describe("GET /api/countries", () => {
//     Country.sync({ force: true }).then(() => {
//       Country.bulkCreate(countries).then(() => {
//         it("should get 200", () => agent.get("/api/countries").expect(200));

//         it("responds with the list of countries", () => {
//           agent.get("/api/countries").then((res) => {
//             expect(res.body.data).to.be.equal(countries);
//           });
//         });
//       });
//     });
//   });
// });
