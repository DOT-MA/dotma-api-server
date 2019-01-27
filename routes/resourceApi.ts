import * as express from "express";
import * as request from "request";

export const router = express.Router();

router.get("/sound", (req, res) => {
    const options = {
        url: "https://raw.githubusercontent.com/DOT-MA/dotma-resources/master/sounds/tony/semicircle.mp3",
    };
    request.get(options, (err, result, body) => {
        res.setHeader("Content-Type", "audio/mpeg");
        res.status(200).send(result);
    });
});
