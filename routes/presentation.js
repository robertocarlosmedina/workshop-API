const express = require('express')
const router = express.Router()

router.use(express.json());

router.get("/", (req, res) => {
    res.json({ message: "Workshop API ok." });
  });

module.exports = router