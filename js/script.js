function loadData() {

    var $body = $("body");
    var $wikiElem = $("#wikipedia-links");
    var $nytHeaderElem = $("#nytimes-header");
    var $nytElem = $("#nytimes-articles");
    var $greeting = $("#greeting");

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load Google Street View image
    var streetInput = $("#street").val();
    var cityInput = $("#city").val();
    var gkey = "74e83c0fbef64668ab64f1bd10492c4e";
    var beginningStreetUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=";
    var picUrl = beginningStreetUrl + streetInput + "," + cityInput + "&" + gkey;

    $body.append("<img class='bgimg' src='" + picUrl + "'>");


    // Load New York Times articles
    var nytkey = "74e83c0fbef64668ab64f1bd10492c4e";
    var nytSearchTerm = (cityInput).replace(" ", "+");
    var nytUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + nytSearchTerm + "&sort=newest&&api-key=" + nytkey;

    $.getJSON(nytUrl, function(data) {
        $nytHeaderElem.text("New York Times Articles About " + cityInput);
        var articles = data.response.docs;
        var article;
        for (var i = 0; i < articles.length; i++) {
            article = articles[i];
            $nytElem.append("<li class='article'>" + "<a href='" + article.web_url + "'>" + article.headline.main + "</a>" + "<p>" + article.snippet + "</p>" + "</li>");
        };
        //$("#details").html(JSON.stringify(articles, null, 4));
    }).error(function(e) {
        $nytHeaderElem.text("Apologies, no New York Times Articles could not be found at this time");
     });
    //Load Wikipedia articles
      var wikiSearchTerm = cityInput;
      var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=wikiCallback&format=json&search=' + wikiSearchTerm.replace(" ", "%20") + "'";

      $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            success: function(response) {
            var wikiList = response[1];
            var wikiArticle;
            for (var i = 0 ; i < wikiList.length ; i++) {
                wikiArticle = wikiList[i];
                var url = "http://en.wikipedia.org/wiki/" + wikiArticle;
                $wikiElem.append("<li class='article'><a href='"+ url + "'>"+ wikiArticle +"</a>");
            };
            $("#details").html(JSON.stringify(response, null, 4));

            }

        });


    //dont touch anything below --------------------
    $("#street").val("");
    $("#city").val("");

    return false;
};
$("#form-container").submit(loadData);
