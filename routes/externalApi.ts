import * as express from "express";

export const router = express.Router();

router.get("/testExternalApi", (req, res) => {
    const url = "https://raikou1.donmai.us/55/2e/552e74406af8a2b6b8b7fd547bc2c353.jpg";
    res.status(200).send(`<img src=${url}/>"`);
});
