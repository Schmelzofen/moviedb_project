const { default: axios } = require('axios');
const express = require('express');
const app = express();
const genres = require("./genres.json")

function logReq(req, res, next) {
    console.log(req.method, req.url)
    next()
}

app.set('view engine', 'ejs');
app.use(logReq)
app.use(express.urlencoded())
app.use(express.static(__dirname + '/public'))

/* 
- Detailseite auf Klick
- Suchfunktion um nach Filmtitel oder Sonstiges zu filtern
    Detail: https://api.themoviedb.org/3/movie/76341?api_key=4d4d2fb5edb26b269c0108ed712239f9&language=de
    Suche: https://api.themoviedb.org/3/search/movie?api_key=4d4d2fb5edb26b269c0108ed712239f9&language=de-de&query=fight&page=1&include_adult=false
    Popular: https://api.themoviedb.org/3/movie/popular?api_key=4d4d2fb5edb26b269c0108ed712239f9&language=de-de&page=1
    Top: https://api.themoviedb.org/3/movie/top_rated?api_key=4d4d2fb5edb26b269c0108ed712239f9&language=de-de&page=1
    Genre: https://api.themoviedb.org/3/genre/movie/list?api_key=4d4d2fb5edb26b269c0108ed712239f9&language=de
*/

app.get("/", (req, res) => {
    axios("https://api.themoviedb.org/3/movie/popular?api_key=4d4d2fb5edb26b269c0108ed712239f9&language=de-de&page=1")
        .then((response) => {
            const movieArray = response.data
            res.render("pages/index", {
                movieArray: movieArray.results,
                genres,
            })
        })
    function showHello() {
        console.log(inputField.value)
    }
})

app.get("/movie/:id", (req, res) => {
    const id = req.params.id
    axios(`https://api.themoviedb.org/3/movie/${id}?api_key=4d4d2fb5edb26b269c0108ed712239f9&language=de`)
        .then((response) => {
            const movieDetail = response.data
            const movieArray = []
            movieArray.push(movieDetail)
            res.render("pages/detail", {
                movieDetail,
                movieArray,
                genres,
            })
        })
})

app.get("/movie/genre/:id", (req, res) => {
    const id = req.params.id
    axios(`https://api.themoviedb.org/3/discover/movie?api_key=4d4d2fb5edb26b269c0108ed712239f9&with_genres=${id}&language=de`)
        .then((response) => {
            const data = response.data
            res.render("pages/genre", {
                data: data.results,
                genres,
            })
        })
})

app.post('/search', function (req, res) {
    const query = req.body.search[0].replace(/\s/g, '+')
    console.log(query)
    axios(`https://api.themoviedb.org/3/search/movie?api_key=4d4d2fb5edb26b269c0108ed712239f9&language=de-de&query=${query}&page=1&include_adult=false`)
        .then((response) => {
            const movieArray = response.data
            res.render("pages/index", {
                movieArray: movieArray.results,
                genres,
            })
        })
});


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server listening on port: ' + PORT));