const cl=console.log;

const addMovie = document.getElementById('addMovie')
const movieName = document.getElementById('movieName')
const movieImg = document.getElementById('movieImg')
const movieRating = document.getElementById('movieRating')
const movieDesciption = document.getElementById('movieDesciption')
const movieContainer = document.getElementById('movieContainer')
const backDrop = document.getElementById('backDrop')
const movieForm = document.getElementById('movieForm')
const addMoviebtn = document.getElementById('addMoviebtn')
const updateMoviebtn = document.getElementById('updateMoviebtn')
const formClose = document.querySelectorAll('.formClose')

// let movieArray=[
//     {
//     movieName: "Kutumb",
//     movieImg: "https://c.saavncdn.com/693/Kutumb-Marathi-2012-20181122091816-500x500.jpg",
//     movieRating: 8,
//     movieDesciption: "The Avengers unite to reverse the damage caused by Thanos.",
//     movieId:"01"
//   },
//   {
//     movieName: "Dagdi Chawl",
//     movieImg: "https://upload.wikimedia.org/wikipedia/en/2/20/Dagdi_Chawl_Poster.jpeg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
//     movieRating: 7,
//     movieDesciption: "A team of astronauts travels through space to find a new home for humanity.",
//     movieId:"02"
//   },
//   {
//     movieName: "Pushpa",
//     movieImg: "https://i.pinimg.com/originals/6f/80/b2/6f80b2077a8b017cf7826614d53d626c.jpg",
//     movieRating: 9,
//     movieDesciption: "A skilled thief enters people's dreams to steal valuable information.",
//     movieId:"03"
//   },
//   {
//     movieName: "The real tevar",
//     movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx2cNQYuTwYFIq5vA1ikhCzAndmUDqHSMLlnvTJHp5WOsywuq725lAcyE&s=10",
//     movieRating: 6,
//     movieDesciption: "A young lion learns to accept his responsibility as the future king.",
//     movieId:"04"
//   },
//   {
//     movieName: "Soldier",
//     movieImg: "https://i.pinimg.com/736x/ec/9b/de/ec9bde06a791729865e4d4720b565e82.jpg",
//     movieRating: 5,
//     movieDesciption: "Three friends experience friendship, education, and the challenges of college life.",
//     movieId:"05"
//   }

// ];

// localStorage.setItem('movieArray', JSON.stringify(movieArray))

let movieArray = JSON.parse(localStorage.getItem('movieArray')) || []

function setRating(rating){
    if(rating >5 && rating <=10){
        return "badge badge-success"
    }else if(rating >=3 && rating <=5){
        return "badge badge-warning"
    }else{
        return "badge-danger"
    }
}

//read

function oncreateMovie(arr){
    let result ="";
    arr.forEach(ele=>{
        result +=`<div class="col-md-3 mb-3">
                <div class="card movieCard" id="${ele.movieId}">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="movieTitle">${ele.movieName}</h4>
                        <h5><span class="badge ${setRating(ele.movieRating)}">${ele.movieRating}</span></h5>
                    </div>
                    <div class="card-body">
                        <figure class="py-0">
                            <img src="${ele.movieImg}" alt="movie">
                            <figcaption>
                                <h5>${ele.movieName}</h5>
                                <p>${ele.movieDesciption}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="editMovie(this)" class="btn btn-sm net-sec-btn">Edit</button>
                        <button onclick="deleteMovie(this)" class="btn btn-sm net-pri-btn">Remove</button>
                    </div>
                </div>
            </div>`
    });
    movieContainer.innerHTML = result;
}
oncreateMovie(movieArray)

//create 

function onAddmovie(eve){
    eve.preventDefault()
    let movieObj={
        movieName:movieName.value,
        movieImg:movieImg.value,
        movieRating:movieRating.value,
        movieDesciption:movieDesciption.value,
        movieId:Date.now().toString(),
    }
    movieArray.push(movieObj)
    localStorage.setItem('movieArray', JSON.stringify(movieArray))
    movieForm.reset()
    onMovieToggle()

    let newCard = document.createElement('div')
    newCard.className = 'col-md-3 mb-3'
    newCard.innerHTML = `<div class="card movieCard" id="${movieObj.movieId}">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="movieTitle">${movieObj.movieName}</h4>
                        <h5><span class="badge badge-success">${movieObj.movieRating}</span></h5>
                    </div>
                    <div class="card-body">
                        <figure class="py-0">
                            <img src="${movieObj.movieImg}" alt="movie">
                            <figcaption>
                                <h5>${movieObj.movieName}</h5>
                                <p>${movieObj.movieDesciption}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="editMovie(this)" class="btn btn-sm net-sec-btn">Edit</button>
                        <button onclick="deleteMovie(this)" class="btn btn-sm net-pri-btn">Remove</button>
                    </div>
                </div>`

    movieContainer.append(newCard)

    Swal .fire({
        text:'Card Added successfully',
        icon:'success',
        timer:3000
    });
}

//edit

function editMovie(ele){
let editId = ele.closest('.movieCard').id;
let editObj = movieArray.find(o=>o.movieId === editId);
localStorage.setItem('editId', editId);
onMovieToggle()
movieName.value = editObj.movieName,
movieImg.value = editObj.movieImg,
movieDesciption.value = editObj.movieDesciption,
movieRating.value = editObj.movieRating,
addMoviebtn.classList.add('d-none');
updateMoviebtn.classList.remove('d-none');
}
 
//update 

function onupdateMovie(){
    let updateId = localStorage.getItem('editId')
    let updateObj={
        movieName:movieName.value,
        movieImg:movieImg.value,
        movieRating:movieRating.value,
        movieDesciption:movieDesciption.value,
        movieId:updateId
    };
    let getIndex = movieArray.findIndex(u=>u.movieId === updateId)
    movieArray[getIndex]=updateObj;
    localStorage.setItem('movieArray', JSON.stringify(movieArray))
    let movieCard = document.getElementById(updateId);
    movieCard.innerHTML = ` <div class="card movieCard" id="${updateObj.movieId}">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="movieTitle">${updateObj.movieName}</h4>
                        <h5><span class="badge ${setRating(updateObj.movieRating)}">${updateObj.movieRating}</span></h5>
                    </div>
                    <div class="card-body">
                        <figure class="py-0">
                            <img src="${updateObj.movieImg}" alt="movie">
                            <figcaption>
                                <h5>${updateObj.movieName}</h5>
                                <p>${updateObj.movieDesciption}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="editMovie(this)" class="btn btn-sm net-sec-btn">Edit</button>
                        <button onclick="deleteMovie(this)" class="btn btn-sm net-pri-btn">Remove</button>
                    </div>
                </div>`
                onMovieToggle()
                updateMoviebtn.classList.add('d-none')
                addMovie.classList.remove('d-none')

    Swal .fire({
        text:'Card updated successfully',
        icon:'success',
        timer:3000
    });
}

//delete

function deleteMovie(ele){
    let deleteId = ele.closest('.movieCard').id;
    let getconfirmation = confirm(`Are you sure, you want to remove id ${deleteId}`)
    if(getconfirmation){
        let getIndex = movieArray.findIndex(d=>d.movieId === deleteId)
        movieArray.splice(getIndex, 1)
        localStorage.setItem('movieArray', JSON.stringify(movieArray));
        ele.closest('.movieCard').parentElement.remove();
    }

    Swal .fire({
        title:'Card deleted successfully !!!',
        icon:'success',
        timer:3000
    });
}


function onMovieToggle(){
    backDrop.classList.toggle('active')
    movieForm.classList.toggle('active')
    movieForm.reset();
}

addMovie.addEventListener('click', onMovieToggle)
formClose.forEach(ele=>{
    ele.addEventListener('click', onMovieToggle)
})

movieForm.addEventListener('submit', onAddmovie)
updateMoviebtn.addEventListener('click', onupdateMovie)