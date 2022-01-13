const express = require('express');
const app = express();
const PORT = 3000

function logReq(req, res, next) {
    console.log(req.method, req.url)
    next()
}
app.set('view engine', 'ejs');
app.use(logReq)
/* 
- Detailseite auf Klick
- Suchfunktion um nach Filmtitel oder Sonstiges zu filtern
*/

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => console.log('Server listening on port: ' + PORT));