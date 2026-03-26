const cardList = [
  {
    title: "Lamborghini",
    image: "Images/Lamborghini.jpg",
    link: "About Lamborghini",
    description:
      
    'A high-performance Italian supercar with a bold, sharp design and a very powerful engine. It is built for extreme speed and luxury.'
  },
  {
    title: "Tesla",
    image: "Images/tesla.jpg",
    link: "About Tesla",
    description:
      "A fully electric luxury sedan known for its incredibly fast acceleration and high-tech features. It represents the future of clean energy and smart driving.",
  },
];

const clickMe = () => {
  alert("Thanks for clicking me. Hope you have a nice day!");
};

const addCards = (items) => {
  items.forEach((item) => {
    const itemToAppend =
      '<div class="col s4 center-align">' +
      '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' +
      item.image +
      '">' +
      '</div><div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' +
      item.title +
      '<i class="material-icons right">more_vert</i></span><p><a href="#">' +
      item.link +
      "</a></p></div>" +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' +
      item.title +
      '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' +
      item.description +
      "</p>" +
      "</div></div></div>";

    $("#card-section").append(itemToAppend);
  });
};

$(document).ready(function () {
  $(".materialboxed").materialbox();
  $(".modal").modal();

  $("#clickMeButton").click(() => {
    clickMe();
  });

  addCards(cardList);

  $(document).on("click", ".card .activator", function (event) {
    event.preventDefault();
    $(this).closest(".card").find(".card-reveal").stop(true, true).slideDown(200);
  });

  $(document).on("click", ".card .card-reveal .card-title", function () {
    $(this).closest(".card-reveal").stop(true, true).slideUp(200);
  });
});
