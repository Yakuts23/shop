const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Witaj w moim backendzie!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});



