const {Item} = require("../models");
const request = require('supertest');
const {beforeEach} = require("@jest/globals");
const db = require("../db")
const app = require("../app");

describe("GET /items/", () => {
    beforeEach(() => {
        db.sync({force: true})
    })

    it("Returns a list of all items", async () => {
        const testItem = {
            "name": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            "price": 109.95,
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "category": "men's clothing",
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        }
        const item = await Item.create(  {
            "name": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            "price": 109.95,
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "category": "men's clothing",
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        })
        const response = await request(app)
            .get("/api/items/")
        expect(response.status).toBe(200);
        expect(response.body[0]).toMatchObject(testItem)
    })
})