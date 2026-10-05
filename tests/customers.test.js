const request = require("supertest");
const app = require("../app/server");

describe("Banking Customer Portal API", () => {

    test("GET /health should return status UP", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("UP");
    });

    test("GET /customers should return customer list", async () => {
        const response = await request(app).get("/customers");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("GET /customers/1 should return customer details", async () => {
        const response = await request(app).get("/customers/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.name).toBe("John Doe");
    });

});