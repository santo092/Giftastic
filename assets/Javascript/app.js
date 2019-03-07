function giffy() {

  var apiKey = "TsBvcueNjMvDKeLSVCWCPC6xQnKmyM8g";
  var searchTerm = $(this).attr("data-title");
  console.log(searchTerm);
  var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key="
    + apiKey + "&limit=25&rating=PG-13&lang=en";

  $.ajax({ url: queryUrl, method: "GET" })
    .then(function (response) {
      $("#gif-holder").empty();

      for (var i = 0; i < response.data.length; i++) {

        var p = $("<p>");
        p.text("Rated: " + response.data[i].rating);

        var img = $("<img>");
        img.attr('src', response.data[i].images.fixed_height_still.url);
        $("#gif-holder").append(p, img);

      }

      for (var i in response.data) {
      
        var responseElem = response.data[i];

        img = $("<img>");

        img.attr({
          "src": responseElem.images.original_still.url,
          "data-still": responseElem.images.original_still.url,
          "data-animate": responseElem.images.original.url,
          "data-state": "still",
          "class": "gif"
        });

        $("#gif-holder img").on("click", function (event) {
          console.log(img.attr("data-state"))
          event.preventDefault();
       
          var state = $(this).attr("data-state");

          if (state === "still") {

            var newSrc = $(this).attr("data-animate");
            $(this).attr("src", newSrc);
            $(this).attr("data-state", "animate");

          } else {
            var newSrc = $(this).attr("data-still");
            $(this).attr("src", newSrc);
            $(this).attr("data-state", "still");
          }

        })
      }
    }

    )
}

var topics = ["Friends", "The Office","That 70's Show","Dexter",
"Chuck", "Lost", "Seinfeld","Breaking Bad", "Spongebob", "The Walking Dead"];

function makeButtons() {
  $("#buttons").empty();

  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.text(topics[i]);
    button.attr("data-title", topics[i]);
    button.addClass("btn-made");

    $("#buttons").append(button)


  }
}

makeButtons();

//add #gif-input to topics
$("#add-gif").on("click", function (event) {

  event.preventDefault();

  $("#gif-input").empty();

  var gif = $("#gif-input").val().trim();
  topics.push(gif);

  
  makeButtons();

})




$(document).on("click", ".btn-made", giffy);




