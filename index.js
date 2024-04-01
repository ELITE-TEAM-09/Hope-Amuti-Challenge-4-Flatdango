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
  
  $(document).ready(function () {
    const movies = [
      {
        title: "THE STARKS-WINTER IS COMING",
        poster: "path_to_starks_poster.jpg",
        runtime: "120",
        info: "The story of the house from the land of ever winter.A story of the followers of the old gods",
        showtime: "7:00pm",
        tickets: 80,
      },
      {
        title: "THE LANNISTERS-HEAR ME ROAR",
        poster: "path_to_lannisters_poster.jpg",
        runtime: "110",
        info: "The story of the lions of the Casterly rock and their tale of survival despite all odds.",
        showtime: "8:00pm",
        tickets: 60,
      },
      {
        title: "THE TARGARYENS-FIRE AND BLOOD",
        poster: "path_to_targaryens_poster.jpg",
        runtime: "130",
        info: "The story of the last of the dragonlords and their struggle in a strange world fsr from their halls of fire.",
        showtime: "6:00pm",
        tickets: 100,
      },
      {
        title: "THE BARATHEONS-OURS IS THE FURY",
        poster: "path_to_baratheons_poster.jpg",
        runtime: "115",
        info: "The story of the noble family with a taste for the blood of kings.",
        showtime: "9:00pm",
        tickets: 50,
      },
      {
        title: "THE GREYJOYS-WE DO NOT SOW",
        poster: "path_to_greyjoys_poster.jpg",
        runtime: "105",
        info: "The story of the ironborn the wolves of their sea as they pillage their way through the world.",
        showtime: "5:00pm",
        tickets: 70,
      },
    ];
  
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
  