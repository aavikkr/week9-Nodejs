const movieTitle = document.querySelector(".movie-title");
const releaseDate = document.querySelector(".release-date");
const movieGenres = document.querySelector(".genres");
const movieDuration = document.querySelector(".movie-duration") 
const moviePoster = document.querySelector(".movie-poster-container img"); 
const movieInfoQuote = document.querySelector(".movie-info-quote"); 
const movieInfoOverview = document.querySelector(".movie-info-overview");
const footerYear = document.querySelector(".year"); //kuidas aasta teha automaatseks

window.onload = () => { //kui veebilehe aken on ära laetud, paneme selle käsu käima
    let url = "https://api.themoviedb.org/3/movie/1011985?api_key=6a6c8ee1cff0ffdd4d8f2e87490dfa98";
    // const muutujat hiljem muuta ei saa, aga let laseb väärtuse hiljem ümber muuta

    //Päring serverile:
    fetch(url) // teeb serverile päringut ja ootab serverilt vastust
    .then(response => { //kui saab vastuse
        return response.json(); //teeme vastuse json'iks
    })

    .then(data => { //siis saame jsonis andmed kätte
        console.log(data);
        movieTitle.textContent = data.original_title; //siin saame täpsustada data. järel, mis väärtusi tahame sealt dokust kätte saada
        
        let date = new Date(data.release_date); //kuupäeva vormistamiseks, object Date on süsteemis olemas
        releaseDate.textContent = `${date.getFullYear()} ${data.production_countries[0].iso_3166_1}`; //0 asukoht
        movieDuration.textContent = `${data.runtime} minutes`; // lause, andmed muutuja seest ja sõna ise juurde pandud
        movieInfoQuote.textContent = data.tagline; //ainult andmed
        movieInfoOverview.textContent = data.overview;

        let posterUrl = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`; //teeme uue muutuja
        moviePoster.src = posterUrl; //pildi allika puhul
        moviePoster.alt = `${data.title} Poster`; //alt teksti puhul
        
        
        //genres on massiiv, neli elementi
        let genresToDisplay = " "; //siia hakkame lugema

        data.genres.forEach(genre => { //genres on jsonist, peame läbi loop'ima, genre on elemendi nimi, mille ise panime
            genresToDisplay = genresToDisplay + `${genre.name}, `; //koma lisab loetelu vahele koma ja järel on tühik
            //console.log(genresToDisplay);
        });

        let genresUpdated = genresToDisplay.slice(0, -2) + "."; //alustades 0'st, lõikab lausest viimase elementi (-2) ehk viimase koma ja paneb . asemele
        //console.log(genresUpdated);

        movieGenres.textContent = genresUpdated; // näitame neid nüüd lehel

        let currentYear = new Date().getFullYear(); //tagastab käesoleva aasta
        footerYear.textContent = currentYear;

    });

}