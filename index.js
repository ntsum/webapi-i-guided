const express = require("express"); //commonJS module import

const db = require("./data/db");

const server = express();

server.use(express.json());
//add this line dont forget

server.get("/", (req, res) => {
  res.send("ITS ALIVE");
});

//GET /hubs => return a list of hubs in JSON format
server.get("/hubs", (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      res.json(hubs);
    })
    .catch(err => {
      //handle error
      res.json({
        error: err,
        message: "u broke it"
      });
    });
});
//. then and . catch always go together. DA BROS
//request and response always hang together. the homies
//first is ALWAYS req and second is always res

server.post("/hubs", (req, res) => {
  //one way to get data from the client is in the requests body
  //axios.post(url,data) => the data shows up as the body on the server
  const hubInformation = req.body;
  console.log("request body: ", hubInformation);
  db.hubs
    .add(hubInformation)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "u broke it huubhubb"
      });
    });
});

server.delete("/hubs/:id", (req, res) => {
    const hubId = req.params.id //req.params has the url parameters
  db.hubs
    .remove(hubId)
    .then(deleted => {
      res.status(204).end(); // sends back response to the client without sending any data
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "u broke it :("
      });
    });
});

server.listen(5000, () => {
  console.log("\n*** API running on port 5k ***\n");
});

//install express with yarn add express or npm i express
//run with yarn server
