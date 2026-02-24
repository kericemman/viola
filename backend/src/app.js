const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const routes = require("./routes");


const app = express();


app.use(helmet());


app.set("trust proxy", 1);

// Rate limiting (basic protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200
});

app.use(limiter);

app.use(cors({
  origin: [
    "https://romanbrendaviola.com",
    "https://romanbrendaviola.com",
    "https://www.romanbrendaviola.com",
    "http://localhost:5173",   
  ],
  credentials: true
}));
// ONLY for webhook
app.use(
  "/api/payments/webhook",
  express.raw({ type: "application/json" })
);

// Everything else
app.use(express.json());

app.use("/api", routes);

module.exports = app;
