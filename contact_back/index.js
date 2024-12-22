const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());

const Contact=require('./model')

mongoose
  .connect("mongodb+srv://deposittracker:<password>@clusterdummy.z7sma.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));




app.post("/contacts", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  try {
    const contact = new Contact({ firstName, lastName, email, phoneNumber, company, jobTitle });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      { firstName, lastName, email, phoneNumber, company, jobTitle },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running`);
});
