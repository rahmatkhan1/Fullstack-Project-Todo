const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Atlas Connection
mongoose.connect("mongodb+srv://khanrahmat51:NE2lS1b4b60W0T3H@cluster0.b9sk25m.mongodb.net/todoDB?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ Connection error:", err));

// Schema & Model
const todoSchema = new mongoose.Schema({
  itemName: String,
  itemDescription: String,
});

const Todo = mongoose.model("Todo", todoSchema);

// Route
app.post("/submittodoitem", async (req, res) => {
  try {
    const { itemName, itemDescription } = req.body;
    const newTodo = new Todo({ itemName, itemDescription });
    await newTodo.save();
    res.json({ message: "✅ To-Do item saved successfully in Atlas!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error saving To-Do item", error });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
