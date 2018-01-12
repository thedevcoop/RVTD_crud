const pool = require("../db/index");

const { Router } = require("express");

const router = Router();

// Read all
router.get("/json", (request, response, next) => {
  pool.getConnection(function(err, connection) {
    connection.query("SELECT * FROM people", (err, res, fields) => {
      connection.release();
      if (err) return next(err);
      response.json(res);
    });
  });
});

// Read one
router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.getConnection(function(err, connection) {
    connection.query(
      "SELECT * FROM people WHERE id = ?",
      [id],
      (err, res, fields) => {
        connection.release();
        if (err) return next(err);
        response.json(res);
      }
    );
  });
});

// Create
router.post("/", (request, response, next) => {
  const { firstName, lastName, streetAddress, city, state, zip } = request.body;
  pool.getConnection(function(err, connection) {
    connection.query(
      "INSERT INTO people(firstName, lastName, streetAddress, city, state, zip) VALUES(?,?,?,?,?,?)",
      [firstName, lastName, streetAddress, city, state, zip],
      (err, res, fields) => {
        connection.release();

        if (err) return next(err);
        response.json({
          person: {
            id: res.insertId,
            firstName,
            lastName,
            streetAddress,
            city,
            state,
            zip
          }
        });
      }
    );
  });
});

// Update
router.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const { firstName, lastName, streetAddress, city, state, zip } = request.body;
  pool.getConnection(function(err, connection) {
    connection.query(
      "UPDATE people SET firstName=(?), lastName=(?), streetAddress=(?), city=(?), state=(?), zip=(?) WHERE id=(?)",
      [firstName, lastName, streetAddress, city, state, zip, id],
      (err, res, fields) => {
        connection.release();
        if (err) return next(err);
        console.log("YOOOO", request.body);
        response.json({
          person: {
            id: id,
            firstName,
            lastName,
            streetAddress,
            city,
            state,
            zip
          }
        });
      }
    );
  });
});

// Delete
router.delete("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.getConnection(function(err, connection) {
    connection.query(
      "DELETE FROM people WHERE id = ?",
      [id],
      (err, res, fields) => {
        console.log("WE REMOVED IT");
        connection.release();
        if (err) return next(err);
        response.json(res);
      }
    );
  });
});

module.exports = router;
