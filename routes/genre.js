const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validateGenre } = require("../models/genres");
const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");

//Sending all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort();
  res.send(genres);
});

//sending particular genre
router.get("/:id", validateObjectId, async (req, res) => {
  //   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //     res.status(404).send("Invalid ID");
  //   }
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(404).send("Genre not found");
    return;
  }
  res.send(genre);
});

//Adding/posting new genre
router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let genre = new Genre({ name: req.body.name });

  genre = await genre.save();
  res.send(genre);
});

//Putting genre
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );
  //let genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("Genre not found");
    return;
  }

  res.send(genre);
});

//Deleting given genre
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) {
    res.status(404).send("Genre not found");
    return;
  }
  res.send(genre);
});

module.exports = router;
