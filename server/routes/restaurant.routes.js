const Restaurants = require("../controllers/restaurant.controller");

module.exports = app => {
    app.get("/api/projects", Restaurants.getAll);
    app.post("/api/projects/new", Restaurants.create);
    app.put("/api/projects/:_id", Restaurants.update);
    app.delete("/api/projects/:_id", Restaurants.remove);
}