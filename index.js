const express = require("express");
const webpush = require("web-push");
const users = require('./users.json');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());
const port = 3333;

//setting up web push
const publicVapidKey =
  "BKEqSAwHtgTkbpsqjinkY3sn4buwl1q70En9Fuow_18NeSv0cuuvSaT1QR-D4xvk8OInm32BIfzTqRyQSRR8YY4";
const privateVapidKey = "lf64Rto6DPWe_ZNDbG-I63AhVkhotjAegIub_v-k4vk";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

//accepting subscribe request
app.post("/subscribe", (req,res) => {

  const subscription = req.body;
  res.status(201).json({});

  const payload = JSON.stringify({ title: "Testing push from server" });

  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));

})


app.get("/", (req, res) => {
    res.json(users);
})

/* 

app.get("/users/:id", (req, res) => {
    res.json(users.find((users) => {
        return +req.params.id == users.id;
    }))
})

app.post("/", (req, res) => {
    res.json(req.body);
})*/


app.listen(port, () => {
    console.log("Listening on port: ", port);
})


