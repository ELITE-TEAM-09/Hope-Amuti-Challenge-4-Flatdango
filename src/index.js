
document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'http://localhost:3000';
    const filmsURL = `${baseURL}/films`;
    const filmDetailsURL = `${baseURL}/films/1`;
  
    // Function to make GET requests
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Function to update movie details on the page
    const updateMovieDetails = (movie) => {
      const movieDetailsContainer = document.getElementById('movie-details');
      movieDetailsContainer.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title} Poster" />
        <h2>${movie.title}</h2>
        <p>${movie.description}</p>
        <p>Runtime: ${movie.runtime} mins</p>
        <p>Showtime: ${movie.showtime}</p>
        <p>Available Tickets: ${movie.capacity - movie.tickets_sold}</p>
        <button id="buy-ticket">Buy Ticket</button>
      `;
  
      // Add event listener for Buy Ticket button
      const buyTicketBtn = document.getElementById('buy-ticket');
      buyTicketBtn.addEventListener('click', async () => {
        const updatedTicketsSold = movie.tickets_sold + 1;
        // Implement PATCH request here to update tickets_sold on the server
        console.log(`Buying ticket for ${movie.title}`);
      });
    };
  
    // Function to render movie menu
    const renderMovieMenu = (films) => {
      const filmsList = document.getElementById('films');
      filmsList.innerHTML = films
        .map(
          (film) => `<li class="film item" data-id="${film.id}">${film.title}</li>`
        )
        .join('');
  
      // Add event listener for movie items in the menu
      const filmItems = document.querySelectorAll('.film.item');
      filmItems.forEach((filmItem) => {
        filmItem.addEventListener('click', async () => {
          const filmId = filmItem.getAttribute('data-id');
          const filmDetails = await fetchData(`${filmsURL}/${filmId}`);
          updateMovieDetails(filmDetails);
        });
      });
    };
  
    // Initial setup - fetch movie details and render menu
    fetchData(filmDetailsURL).then(updateMovieDetails);
    fetchData(filmsURL).then(renderMovieMenu);
});

// JQuery code
$(document).ready(function () {
  const movies = [
    {
      title: "The Giant Gila Monste",
      poster: "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg",
      runtime: "108",
      info: "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
      showtime: "2:00PM",
      tickets: "03",
    },
    {
        title: "Manos: The Hands Of Fate",
        poster: "https://www.gstatic.com/tv/thumb/v22vodart/47781/p47781_v_v8_ac.jpg",
        runtime: "118",
        info: "A family gets lost on the road and stumbles upon a hidden, underground, devil-worshiping cult led by the fearsome Master and his servant Torgo.  ",
        showtime: "2:45PM",
        tickets: "06",
      },
      {
        title: "Time Chasers",
        poster: "https://www.gstatic.com/tv/thumb/v22vodart/23342/p23342_v_v8_ab.jpg",
        runtime: "93",
        info: "An inventor comes up with a time machine, but must prevent its abuse at the hands of an evil C.E.O.",
        showtime: "09:30PM",
        tickets: "19",
      },
      {
        title: "The Touch Of Satan",
        poster: "https://www.gstatic.com/tv/thumb/v22vodart/43468/p43468_v_v8_aa.jpg",
        runtime: "101",
        info: "A young man meets a farm girl who is actually a witch.",
        showtime: "09:00PM",
        tickets: "70",
      },
      {
        title: "Santa Claus Conquers The Martians",
        poster: "https://www.gstatic.com/tv/thumb/v22vodart/4232/p4232_v_v8_aa.jpg",
        runtime: "96",
        info: "The Martians kidnap Santa Claus because there is nobody on Mars to give their children presents.",
        showtime: "03:30PM",
        tickets: "51",
      },
      {
        title: "Track Of The Moon Beast",
        poster: "",
        runtime: "112",
        info: "",
        showtime: "",
        tickets: "96",
      },
      {
        title: "The Skydivers",
        poster: "https://www.gstatic.com/tv/thumb/v22vodart/40518/p40518_v_v8_aa.jpg",
        runtime: "94",
        info: "A woman seeks revenge on her former lover, who owns a skydiving business.",
        showtime: "10:30PM",
        tickets:"72" ,
      },
      {
        title: "The Killer Shrews",
        poster: "https://www.gstatic.com/tv/thumb/v22vodart/1466/p1466_v_v8_ab.jpg",
        runtime: "115",
        info: "On an isolated island, a small group of people are terrorized by giant voracious shrews in the midst of a hurricane.",
        showtime: "08:30PM",
        tickets: "08",
      },
      {
        title: "Project Moon Base",
        poster: "https://www.gstatic.com/tv/thumb/v22vodart/46755/p46755_v_v8_aa.jpg",
        runtime: "99",
        info: "A saboteur posing as a scientist strives to destroy the world's first space station.",
        showtime: "07:30PM",
        tickets: "77",
      },
      
  $(".film.item").on("click", function () {
    const index = $(this).index();
    const movie = movies[index];

    $("#poster").attr("src", movie.poster);
    $("#title").text(movie.title);
    $("#runtime").text(movie.runtime + " minutes");
    $("#film-info").text(movie.info);
    $("#showtime").text(movie.showtime);
    $("#num").text(movie.tickets);
  });
});
