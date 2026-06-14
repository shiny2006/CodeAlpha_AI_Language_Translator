const express = require("express");
const cors = require("cors");
const translate = require("translate-google");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {

    const { text, target } = req.body;

    try {

        const translatedText = await translate(text, {
            to: target
        });

        res.json({
            translatedText
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            translatedText: "Translation Failed"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});