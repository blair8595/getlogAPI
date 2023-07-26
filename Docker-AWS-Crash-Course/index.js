const express = require("express");
const app = express();
const { Kafka } = require('kafkajs');


const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['KAFKABROCKER1', 'KAFKABROCKER2', 'KAFKABROCKER3']
})

const producer = kafka.producer()

const initKafka = async () => {
  await producer.connect()
}

app.get("/rtlog/", (req, res) => {
  res.send("This is my log app");
});

app.get("/rtlog/me", (req, res) => {
  res.send("Hi I am hyeonsup");
});

app.get("/rtlog/reactAlbTest", (req, res) => {
  res.send(req.query.userId + '  ' + req.query.id);
});


app.get("/rtlog/game", async(req, res) => {
  res.send("Hi game log");
});

app.get("/rtlog/game/login", async(req, res) => {
  await producer.send({
    topic: 'rtlog-login',
    messages: [
      { value: req.query.jsonData },
    ],
  })
  res.send('produced to kafka this record : ' + req.query.jsonData + '\n')
});

app.get("/rtlog/game/regi", async(req, res) => {
  await producer.send({
    topic: 'rtlog-regi',
    messages: [
      { value: req.query.jsonData },
    ],
  })
  res.send('produced to kafka this record : ' + req.query.jsonData + '\n')
});

app.get("/rtlog/game/trans", async(req, res) => {
  await producer.send({
    topic: 'rtlog-trans',
    messages: [
      { value: req.query.jsonData },
    ],
  })
  res.send('produced to kafka this record : ' + req.query.jsonData + '\n')
});

app.get("/rtlog/game/vtrans", async(req, res) => {
  await producer.send({
    topic: 'rtlog-vtrans',
    messages: [
      { value: req.query.jsonData },
    ],
  })
  res.send('produced to kafka this record : ' + req.query.jsonData + '\n')
});



//below is for web page
app.get("/rtlog/paydone", async(req, res) => {
  await producer.send({
    topic: 'rtlog-c',
    messages: [
      { value: req.query.jsonData },
    ],
  })
  res.send('produced to kafka this record : ' + req.query.jsonData + '\n')
});

app.get("/rtlog/detailview", async(req, res) => {
  await producer.send({
    topic: 'rtlog-d',
    messages: [
      { value: req.query.jsonData },
    ],
  })
  res.send('produced to kafka this record : ' + req.query.jsonData + '\n')
});

app.get("/rtlog/listview", async(req, res) => {
  await producer.send({
    topic: 'rtlog-l',
    messages: [
      { value: req.query.jsonData },
    ],
  })
  res.send('produced to kafka this record : ' + req.query.jsonData + '\n')
});

app.listen(8080, () => {
  console.log("listening");
});

initKafka()