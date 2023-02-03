// Exercise 1: Haz una array con solo los directores- con Map
function getAllDirectors(array) {
  let directores = array.map((movie) => movie.director); // arreglo de array, ahora contendra directores

  return directores;
}


// Exercise 2: Consigue las películas de cierto director.
//BUSCAR con  FILTER

function getMoviesFromDirector(array, director) {
  const result2 = array.filter((movie) => movie.director === director); //arreglo array, ahora pelis+directores
  return result2;
}




// Exercise 3:Calcular la media de las películas de un director determinadocon-CON reduce
function moviesAverageOfDirector(array, director) {
  //Filtro  películas por el director dado
  const peliculasDirector = array.filter((movie) => movie.director === director);

  //Calculo la suma de las calificaciones de las películas
  const sumaCalificaciones = peliculasDirector.reduce(
    (total, movie) => total + movie.score,
    0
  );
  // promedio de las calificaciones  películas
  const puntuacionMedia = sumaCalificaciones / peliculasDirector.length;

  //Redondear promedio 2 decimales
  const redondeo = Math.floor(puntuacionMedia)
  return redondeo;
}


// Exercise 4:  Orden alfabético por título 
//Tester dice: solo debe devolver el título de las pelís,cada valor debe ser una cadena
function orderAlphabetically(array) {
  const ordenaMovies = array
    .map((movie) => movie.title) // utilizo map para crear un arreglo que contenga solo pelis.
    .sort() //esta operación ordena los títulos de las películas en orden alfabético.
    .slice(0, 20) // esta operación recorta el arreglo de array resultante en 20 pelis.

  return ordenaMovies
}



// Exercise 5: Order by year, ascending
function orderByYear(array) {
  const ordenaYears = array //array obejeto peliculas
    .map((movies) => movies) //creo array ident. a la origin
    .sort((a, b) => { // función comparación para indicar 2 elementos consecutivos de la array
      const ordena = a.year - b.year; //se ordena por año
      if (ordena === 0) {
        if (a.title < b.title) return -1; // si el año de a y b son iguales se ordena por titulo
        else return 1;
      } else return ordena;
    });
  return ordenaYears;
}



// Exercise 6: Calcular el promedio de las películas por categoría
function moviesAverageByCategory(array, category) {
  const catMovies = array.filter(({
    genre
  }) => genre.includes(category));

  function tieneScore({
    score
  }) {
    if (score) return true;
  }

  const moviesPuntuacion = catMovies.filter((movie) => tieneScore(movie));

  const mediaScore =
    moviesPuntuacion.reduce((score, media) => score + media.score, 0) /
    moviesPuntuacion.length;


  return Math.floor(mediaScore);
}



//NIVELL 2
// Exercise 7: Modificar la duración de las películas a minutos.

function hoursToMinutes(movies) {
  return movies.map((movie) => {
    // Obtenemos la propiedad de duración de la película actual
    const duration = movie.duration;
    let hours = 0;
    let minutes = 0;

    // Comprueba si la cadena de duración incluye el carácter 'h'
    if (duration.includes('h')) {
      // Si lo hace, analiza las horas de la cadena
      hours = parseInt(duration.split('h')[0]);
      // Comprueba si la cadena de duración incluye el carácter 'min'
      if (duration.includes('min')) {
        // Si lo hace, analiza los minutos de la cadena
        minutes = parseInt(duration.split('min')[0].split(' ')[1]);
      }
    } else {
      // Si la cadena de duración no incluye 'h' o 'min',
      // asume que la duración está en horas y la analiza como un entero
      hours = parseInt(duration);
    }
    // Calcula la duración total en minutos multiplicando las horas por 60
    // y agregando los minutos
    const totalMinutes = hours * 60 + minutes;

    // Devuelve un nuevo objeto con todas las mismas propiedades que la película original
    // excepto la propiedad de duración, que se reemplaza con los minutos totales
    return {
      ...movie,
      duration: totalMinutes
    };
  });
}



//NIVELL 3
// Exercise 8: Consigue la mejor película de un año, la mejor puntuacion
function bestFilmOfYear(array, year) {
  const yearOfTheMovie = array.filter((movie) => movie.year === year);

  if (yearOfTheMovie.length > 1)
    yearOfTheMovie.sort((Film1, Film2) =>
      Film1.score === Film2.score ? 0 : Film1.score > Film2.score ? -1 : 1
      //compara primero si 1 y 2 son iguales?, si lo son devuelve 0 : se compara si 1.mayor que 2? si es mayor dev -1,si es menor 1
    );

  const bestFilm = yearOfTheMovie.filter(
    (movie) => movie.score === yearOfTheMovie[0].score
  );

  return bestFilm;
}





// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getMoviesFromDirector,
    moviesAverageOfDirector,
    orderAlphabetically,
    orderByYear,
    moviesAverageByCategory,
    hoursToMinutes,
    bestFilmOfYear,
  };
}