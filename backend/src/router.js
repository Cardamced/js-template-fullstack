const express = require("express");

const multer = require("multer");

const upload = multer({ dest: "./public/uploads/" });

const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const fs = require("fs");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

router.post("/avatar", upload.single("avatar"), (req, res) => {
  // On récupère le nom du fichier d'origine
  // const { originalname } = req.file;
  console.info(req.file);

  // On utilise la fonction rename de fs pour renommer le fichier
  const { originalname } = req.file;

  // On récupère le nom du fichier
  const { filename } = req.file;

  // On utilise la fonction rename de fs pour renommer le fichier
  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err;
      res.send("File uploaded");
    }
  );
});

/* ************************************************************************* */

module.exports = router;
