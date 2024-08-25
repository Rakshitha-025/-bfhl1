const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    const user_id = "john_doe_17091999";  // Example user_id
    const email = "john@xyz.com";
    const roll_number = "ABCD123";

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ "is_success": false });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowercaseAlphabets = alphabets.filter(item => item.toLowerCase() === item);

    // Find the highest lowercase alphabet
    let highestLowercaseAlphabet = null;
    if (lowercaseAlphabets.length > 0) {
        highestLowercaseAlphabet = lowercaseAlphabets.sort().pop();
    }

    const response = {
        "is_success": true,
        "user_id": user_id,
        "email": email,
        "roll_number": roll_number,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };

    res.json(response);
});

app.get('/bfhl', (req, res) => {
    res.json({ "operation_code": 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
