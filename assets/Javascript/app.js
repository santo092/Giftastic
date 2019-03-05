var giffy = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=5";



function displayGif() {
  $.ajax({ url: queryURL, method: "GET" })
    .then(function (response) {
      var imageUrl = response.data.image_original_url;
      var gifImage = $("<img>");
      gifImage.attr("src", imageUrl);
      $("#images").prepend(gifImage);
      console.log(response);
    })
}
function renderButtons() {
    $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < giffy.length; i++) {

    giffy[i]= $("<button>");
     $("#buttons-view").append(giffy[i]);
  }
}
$("#add-gif").on("click", function (event) {
  event.preventDefault();
  var gif = $("#gif-input").val().trim();

  giffy.push(gif);
  console.log(giffy);

  renderButtons();
});

$("#add-gif").on("click", displayGif)

// Calling the renderButtons function to display the initial buttons
renderButtons();

