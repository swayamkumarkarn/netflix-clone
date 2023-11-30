//const  format -- 'https://api.themoviedb.org/3/movie/latest?api_key=5a89029c4014c62b4600138c1b72bcbc'
const apikey = "5a89029c4014c62b4600138c1b72bcbc";
const apiEndpoint = 'https://api.themoviedb.org/3';
const imgPaths = "https://image.tmdb.org/t/p/original";




const apiPaths = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList : (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending :`${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
    searchOnYoutube : (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyAZ404TafGB-1xXMfyPv36_m2SZRmI9Ino`,

}




// boots up the app
function init() {
    // fetch(apiPaths.fetchAllCategories)
    // .then(res =>res.json())
    // .then(res => console.table(res))
    // .catch(err => console.error(err));

    fetchTrendingMovies();
    fetchAndBuildAllSections();


}

function fetchTrendingMovies(){
    fetchAndBuildMovieSections(apiPaths.fetchTrending,"Trending Now")
    .then(list => {
        const randomIndex =parseInt(Math.random() * list.length);
        buildBannerSection(list[randomIndex])
    }).catch(err => console.error(err));
    
}

function fetchAndBuildAllSections() {
    fetch(apiPaths.fetchAllCategories)
        .then(res => res.json())
        .then(res => {
            const categories = res.genres;
            if (Array.isArray(categories) && categories.length) {
                const randomInt =parseInt(Math.random() * categories.length);
                categories.slice(randomInt,randomInt+4).forEach(category => {
                    fetchAndBuildMovieSections(apiPaths.fetchMoviesList(category.id),category.name);
                })
            }
            //console.table(categories);
        })
        .catch(err => {
            console.log(err);
        })
}

function buildBannerSection(movie){
    const bannerCont=document.getElementById('banner-section');
    bannerCont.style.backgroundImage = `url(${imgPaths}${movie.backdrop_path})`;
    const div = document.createElement('div');
    div.innerHTML=`
           <h2 class="banner__title">${movie.title}</h2>
           <p class="banner__info">Trending in Movies | Released - ${movie.release_date}</p>
           <p class="banner__overview">${movie.overview && movie.overview.length>200 ?movie.overview.slice(0,200).trim()+'...':movie.overview}</p>
       
           <div class="action-button-cont">
               <button class="action-button"> 
                   <svg  xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 92.2 122.88" style="enable-background:new 0 0 92.2 122.88;height:22px;width:22px;" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style>
                       <g><polygon class="st0" points="92.2,60.97 0,122.88 0,0 92.2,60.97"/></g></svg> &nbsp;&nbsp; Play</button>
               <button class="action-button"> <svg  x="0px" y="0px" width="22px" height="22px" viewBox="0 0 122.88 122.881" enable-background="new 0 0 122.88 122.881" xml:space="preserve">
                   <g><path d="M57.454,89.262c-0.212-0.51-0.319-1.059-0.319-1.645c0-0.588,0.106-1.137,0.319-1.646c0.21-0.506,0.526-0.969,0.945-1.389 h0L58.4,84.58h0c0.419-0.42,0.883-0.734,1.39-0.945c0.51-0.213,1.06-0.318,1.646-0.318c0.591,0,1.142,0.105,1.652,0.318 c0.5,0.207,0.957,0.516,1.371,0.924c0.008,0.008,0.016,0.014,0.022,0.021c0.419,0.418,0.734,0.883,0.945,1.391 c0.213,0.51,0.318,1.059,0.318,1.646c0,0.586-0.105,1.135-0.318,1.645c-0.211,0.506-0.525,0.971-0.945,1.391 c-0.421,0.42-0.888,0.74-1.398,0.953c-0.509,0.213-1.059,0.32-1.647,0.32c-0.586,0-1.134-0.107-1.642-0.32 c-0.498-0.209-0.957-0.52-1.371-0.93c-0.008-0.008-0.016-0.016-0.024-0.023C57.98,90.234,57.665,89.77,57.454,89.262L57.454,89.262 z M61.44,5.165c-3.894,0-7.67,0.366-11.326,1.098c-3.661,0.732-7.193,1.825-10.592,3.277l0.001,0.004 c-3.455,1.486-6.672,3.224-9.646,5.22c-2.98,2-5.744,4.271-8.284,6.821l-0.01,0.01h0c-2.55,2.541-4.821,5.303-6.821,8.284 c-1.996,2.974-3.733,6.191-5.22,9.646c-0.018,0.042-0.037,0.082-0.056,0.123c-1.426,3.361-2.501,6.852-3.225,10.468 c-0.732,3.656-1.098,7.432-1.098,11.325c0,3.895,0.366,7.67,1.098,11.326c0.732,3.66,1.825,7.193,3.277,10.592l0.003-0.002 c1.486,3.455,3.224,6.672,5.22,9.646c2,2.98,4.271,5.744,6.821,8.283l0.01,0.01l0,0c2.54,2.551,5.303,4.822,8.284,6.822 c2.974,1.994,6.191,3.732,9.646,5.219c0.042,0.018,0.083,0.037,0.123,0.057c3.361,1.426,6.852,2.5,10.468,3.225 c3.656,0.732,7.432,1.098,11.326,1.098s7.67-0.365,11.325-1.098c3.661-0.732,7.192-1.826,10.593-3.277l-0.002-0.004 c3.455-1.486,6.672-3.225,9.646-5.219c2.979-2,5.743-4.271,8.283-6.822l0.01-0.01l0,0c2.549-2.539,4.821-5.303,6.82-8.283 c1.996-2.975,3.734-6.191,5.221-9.646c0.018-0.041,0.036-0.082,0.056-0.121c1.427-3.361,2.501-6.854,3.225-10.469 c0.732-3.656,1.099-7.432,1.099-11.326c0-3.893-0.366-7.669-1.099-11.325c-0.732-3.661-1.825-7.192-3.277-10.592l-0.003,0.001 c-1.486-3.455-3.225-6.672-5.221-9.646c-1.999-2.98-4.271-5.743-6.82-8.284l-0.01-0.01l0,0c-2.54-2.549-5.304-4.821-8.283-6.821 c-2.975-1.996-6.191-3.734-9.646-5.22c-0.041-0.018-0.082-0.037-0.123-0.056c-3.361-1.426-6.852-2.501-10.468-3.225 C69.11,5.531,65.334,5.165,61.44,5.165L61.44,5.165z M49.106,1.199C53.098,0.4,57.21,0,61.44,0c4.229,0,8.342,0.4,12.334,1.199 c3.936,0.788,7.764,1.971,11.48,3.549c0.047,0.017,0.093,0.035,0.14,0.055c3.705,1.594,7.198,3.486,10.473,5.684 c3.265,2.191,6.286,4.674,9.061,7.457l0.01,0.01c2.782,2.774,5.266,5.796,7.456,9.061c2.198,3.274,4.09,6.767,5.684,10.473 l-0.003,0.001l0.003,0.009c1.606,3.757,2.808,7.628,3.604,11.609c0.799,3.992,1.198,8.104,1.198,12.334 c0,4.23-0.399,8.344-1.198,12.334c-0.788,3.936-1.971,7.764-3.549,11.48c-0.017,0.047-0.035,0.094-0.056,0.141 c-1.594,3.705-3.485,7.197-5.684,10.473c-2.19,3.264-4.674,6.285-7.456,9.061l-0.01,0.01c-2.774,2.783-5.796,5.266-9.061,7.457 c-3.274,2.197-6.768,4.09-10.473,5.684l-0.002-0.004l-0.009,0.004c-3.757,1.605-7.628,2.807-11.609,3.604 c-3.992,0.799-8.104,1.199-12.334,1.199c-4.23,0-8.343-0.4-12.334-1.199c-3.935-0.789-7.763-1.971-11.48-3.549 c-0.047-0.018-0.093-0.035-0.14-0.055c-3.706-1.594-7.198-3.486-10.473-5.684c-3.264-2.191-6.286-4.674-9.06-7.457l-0.01-0.01 c-2.783-2.775-5.266-5.797-7.457-9.061c-2.198-3.275-4.09-6.768-5.684-10.473l0.004-0.002l-0.004-0.01 c-1.605-3.756-2.807-7.627-3.604-11.609C0.4,69.783,0,65.67,0,61.439c0-4.229,0.4-8.342,1.199-12.334 c0.788-3.935,1.971-7.763,3.548-11.479c0.017-0.047,0.036-0.093,0.055-0.14c1.594-3.706,3.486-7.199,5.684-10.473 c2.19-3.264,4.674-6.286,7.457-9.061l0.01-0.01c2.774-2.783,5.796-5.266,9.06-7.457c3.275-2.198,6.768-4.09,10.473-5.684 l0.002,0.003l0.008-0.003C41.254,3.197,45.125,1.996,49.106,1.199L49.106,1.199z M64.107,77.82 c-0.005,1.012-0.717,1.65-1.627,1.924c-0.331,0.1-0.687,0.148-1.04,0.148s-0.709-0.049-1.04-0.148 c-0.91-0.273-1.622-0.912-1.627-1.924l-3.417-44.679c-0.001-0.01-0.001-0.021-0.001-0.031h-0.001c0-1.094,1.63-1.758,3.715-2.018 c0.75-0.093,1.561-0.14,2.371-0.14s1.621,0.047,2.37,0.14c2.086,0.26,3.716,0.924,3.716,2.018c0,0.018-0.002,0.036-0.004,0.053 L64.107,77.82L64.107,77.82z"/></g></svg>
                   &nbsp;&nbsp; More Info</button>
            </div>

            <div class="banner_fadeBottom">

            </div>

           `;
    div.className="banner-content container";
    bannerCont.append(div);
}

function searchMovieTrailer(movieName,iframeId){
    if(!movieName) return;

    fetch(apiPaths.searchOnYoutube(movieName))
    .then(res => res.json())
    .then(res => {
        const bestResult = res.items[0];
        const youtubeUrl=`https://www.youtube.com/watch?v=${bestResult.id.videoId}`;
        console.log(youtubeUrl);
        document.getElementById(iframeId).src=`https://www.youtube.com/embed/${bestResult.id.videoId}?autoplay=0&controls=0`;
    })
    .catch(err=> console.error(err))

    

}

function fetchAndBuildMovieSections(fetchUrl, categoryName) {
    return fetch(fetchUrl)
    .then(res=> res.json())
    .then(res=> { 
        // console.log(res.results)
        const movies = res.results;

        if (Array.isArray(movies) && movies.length)
        {
            // console.log(movies,category.name);
            buildMoviesSection(movies,categoryName);
        }
        return movies;
    })
    .catch(err=>console.error(err))

    // console.log(fetchUrl, category);
}

function buildMoviesSection(list,categoryName){
    console.log(list,categoryName)
    const moviesCont = document.getElementById('movies-cont');
    const moviesListHTML = list.map(item =>{
        return  `
        <div class="movies-item" onmouseenter="searchMovieTrailer('${item.title} trailer','yt${item.id}')"> 
        <img class="move-item-image" src="${imgPaths}${item.backdrop_path}" alt="${item.title}"  > 
        <iframe id="yt${item.id}"></iframe>
        </div>`;
    }).join(" ");

    const moviesSectionHTML = `
    <h2 class="movies-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
    <div class="movies-row">
        ${moviesListHTML}
    </div>
    `

    const div = document.createElement("div");
    div.className = "movies-section";
    div.innerHTML = moviesSectionHTML;

    // append HTML into container
    moviesCont.append(div)

    console.log(moviesSectionHTML)
}


window.addEventListener('load', function () {
    init()
    window.addEventListener('scroll',function(){
        //header ui update 
        const header =document.getElementById('header');
        if(this.window.scrollY > 7) header.classList.add('black-bg');
        else header.classList.remove('black-bg');
    })
});