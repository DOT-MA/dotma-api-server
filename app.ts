import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as logger from "morgan";


// // Setting up body parser for parsing json
// app.use(bodyParser.urlencoded({"extended":true})); // parse application/x-www-form-urlencoded
// app.use(bodyParser.json()); // parse application/json

// app.get("/oopsie", async (req, res) => {
//     const url = await ContentRetrival.getRandomImage();
//     console.log(url);
//     res.status(200).send("<img src="" + url +"" />");
// });

import { router as index } from "routes/index";
import { router as externalApi } from "routes/externalApi";

const app = express();

// middleware setup
app.use(express.static(__dirname + "/public"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/test", express.static(__dirname + "/public"));

app.use("/", index);
app.use("/externalApi", externalApi);

if (process.env.NODE_ENV !== "test") {
    app.use(logger("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err: any = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
});

export default app;
