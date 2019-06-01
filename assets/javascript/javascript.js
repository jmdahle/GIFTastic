// global variables
APIKey = "bBMi6wGJpfD3ADkUakOfv5anBDNAOYAi";
APIUrl = "https://api.giphy.com/v1/gifs/search";
topics = ["wierd","bizarre", "crazy", "nutty", "amazing","scary", "creepy", "odd", "wtf"];
currentTopic = "";
numberDisplayed = 0; // number gifs currently displayed
var c = 1; // counter for column

function topicBtns () {
    $("#areaBtn").empty();
    for (i = 0; i < topics.length; i++) {
        var gifBtn = $("<button>");
        gifBtn.attr("topic",topics[i]); // store topic name in "topic" attribute
        gifBtn.text(topics[i].toUpperCase()); // text = TOPIC
        gifBtn.on("click",chooseTopic); // call function chooseTopic when clicked
        gifBtn.attr("class","btn btn-info search"); // bootstrap btn
        gifBtn.attr("type","button"); // bootstrap btn
        $("#areaBtn").append(gifBtn);
    }
}

function addGifs(gifArray) {
    for (var i = 0; i < gifArray.length; i++) {
        // console.log(gifArray[i].images.fixed_width.url,gifArray[i].images.fixed_width_still.url);
        var newDiv = $("<div>");
        var newGif = $("<img>");
        var newRating = $("<p>");
        newGif.attr("src",gifArray[i].images.fixed_width_still.url);
        newGif.attr("alt","gif");
        newGif.attr("altsrc",gifArray[i].images.fixed_width.url)
        newGif.attr("state","off");
        newGif.on("click",toggleGif);
        newRating.html("Rating: " + gifArray[i].rating);
        $(newDiv).append(newGif);
        $(newDiv).append(newRating);
        // add to column
        $("#gifcol"+c).append(newDiv);
        c++;
        // cycle back to col1 after col3
        if (c > 3) {c=1}
        // increment numberDisplayed
        numberDisplayed++;
    }
    // show add more button 
    $("#btnAddMore").show()
}

function toggleGif() {
    if ($(this).attr("state") === "off") {
        $(this).attr("state","on");
    } else {
        $(this).attr("state","off");
    }
    srcCurrent = $(this).attr("src");
    srcReplace = $(this).attr("altsrc");
    $(this).attr("src", srcReplace);
    $(this).attr("altsrc", srcCurrent);
}

function chooseTopic() {
    // clear existing gifs
    $("#gifcol1").empty();
    $("#gifcol2").empty();
    $("#gifcol3").empty();
    // re-set numberDisplayed
    numberDisplayed = 0;
    // console.log(this);
    // set topic
    currentTopic = $(this).attr("topic");
    addMore(10);
}

function addMore(n) {
    var searchUrl = APIUrl + "?q=" + currentTopic + "&limit=" + n +"&offset=" + numberDisplayed + "&api_key="+ APIKey;
    console.log(searchUrl);
    $.ajax({
        url: searchUrl,
        method: "GET"
    }).then( function(response) {
        // console.log(response);
        // clear the gif area
        $("#areaGif").empty();
        // send the gif array to addGifs
        addGifs(response.data);
    });
}

// START HERE!
// everything is inside document.ready funciton to ensure page loads before any code is executed
$(document).ready(function () {
    topicBtns();
    $("#btnAddMore").hide();

    $("#newTopicBtn").on("click", function () {
        // don't add a duplicate or zero length string
        if ((topics.indexOf($("#newTopic").val().trim().toLowerCase()) === -1) && ($("#newTopic").val().trim().toLowerCase().length > 0)) {
            topics.push($("#newTopic").val().trim().toLowerCase());
            $("#newTopic").val("")
            $("#newTopic").focus();
            topicBtns();
        }
    });

    $("#btnAddMore").on("click",function() {
        if(currentTopic.length > 0) {    
        addMore(10);
        }
    });
});