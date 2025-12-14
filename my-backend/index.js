import express from "express";
import cors from "cors";
import { admin, db } from "./firebase.js";

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send({ message: "Backend is LIVE 🚀" });
});

// Example: Create user scan entry
app.post("/scan", async (req, res) => {
  try {
    const { url, userId } = req.body;

    await db.collection("scans").add({
      url,
      userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.send({ status: "success", message: "Scan saved" });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
