// Function runs on page load to view current popular movies in the US
// endpoint here: https://developer.themoviedb.org/reference/movie-popular-list
function getPopularMovies(){
    // the endpoint
    // TO DO
    // the place on the page where we'll display the movies
    let endpoint = 'https://api.themoviedb.org/3/movie/popular?api_key=2b30f62dad2c37f18879e8d52bf6886e&language=en-US&page=1'
    let popularMovies = document.getElementById("popular");
    let imgUrl = "https://image.tmdb.org/t/p/w400";

    const data = null;

    // ajax time!
    // create the object
    const xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
        console.log(this.response);
        let json = this.response;
        let html = "";
        //feature popular movie
        html += `
            <section id="feature">
                <h3>${json.results[0].tittle}</h3>
                <img src="${imgUrl}${json.results[0].poster_path}" alt="">
                <p>${json.results[0].overview}</p>
            </section>
        `;

        for(let i = 1; i < 19; i++){
            html += `
                <section class="movie">
                    <img src="${imgUrl}${json.results[i].poster_path}" alt"">
                    <div>
                        <h3>${json.results[i].tittle}</h3>
                        <p>
                             ${json.results[i].overview}
                            <span class="vote">Vote Average: ${json.results[i].vote_average}</span>
                        </p>
                    </div>
                </section>
            `;
        }
        popularMovies.innerHTML = html;
    }
    });

    xhr.responseType ="json";

    xhr.open('GET', endpoint);

    xhr.send(data);
}
//---------------------------------------------------------------------------------------
// function runs only after a year is entered/chosen and submitted through the form
// endpoint here: https://developer.themoviedb.org/reference/discover-movie (primary release day
function getBirthYearMovies(e){
    e.preventDefault();

    // Get the user's input/year value
    let year = encodeURI(document.getElementById("userYear").value)
    // the place on the page where we'll add the info
    let birthYearMovies = document.getElementById("birthYear");

    if(year < 1940 || year > 2024 || year == ""){
        birthYearMovies.innerHTML = `<p style="color: red; background-color: white;">Please enter a year between 1940 and 2022</p>`;
    }else{
        //  Build the endpoint we need
        let beginURL ="https://api.themoviedb.org/3/discover/movie?api_key=2b30f62dad2c37f18879e8d52bf6886e&primary_release_year=";
        let endURL = "&sort_by=revenue.desc&language=en-US&page=1&include_adult=false";
        let endpoint = `${beginURL}${year}${endURL}`;
        let imgUrl = "https://image.tmdb.org/t/p/w400";   

        // ajax time!
        const xhr = new XMLHttpRequest();

        // create the object

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE){
                console.log(this.response);
                let json = this.response;
                let html = "";
            
            for(let i =0; i < 3; i ++){
            if(json.results[i].poster_path === null){
                continue;

            }else{
                        html +=  `
                                <section class="yrMovie">
                                    <img src="${imgUrl}${json.results[i].poster_path}" alt"">
                                    <div>
                                        <h3>${json.results[i].tittle}</h3>
                                    </div>
                                </section>
                        `;
                }

            }
            birthYearMovies.innerHTML = html;
            }
        });

        xhr.responseType ="json";

        // Open the request
        xhr.open("GET", endpoint);

        // Send the request
        xhr.send(data);
    }
}

window.addEventListener("load", function(){
    getPopularMovies();
    document.getElementById("yearBtn").addEventListener("click", getBirthYearMovies);
});
