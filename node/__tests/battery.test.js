const request = require("supertest");
const App = require("../src/app");
const payload = require("./payload");
const httpStatus = require("http-status-codes");

describe("Sequencia: FreteController", () => {
  it("Testando conexão da API", async () => {
    const res = await request(App.server)
      .get("/");
    expect(res.status).toBe(httpStatus.OK);
  });

  it("Inserindo transportadoras", async () => {
    const res = await request(App.server)
      .post("/quote")
      .send(payload);

    expect(res.status).toBe(httpStatus.CREATED);
  });

  it("Consulta de métricas", async () => {
    const res = await request(App.server).get(`/metrics${payload.last_quote}`);
    console.log(res.body);
    expect(res.status).toBe(httpStatus.OK);
  });

});