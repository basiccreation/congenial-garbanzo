
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetInput = $("#street").val();
    var cityInput = $("#city").val();
    var gkey = "AIzaSyBEZIIjRbO6D1Z5rUndEO2aD29JBoM5B2w";
    var beginningStreetUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=";
    var picUrl = '"' + beginningStreetUrl + streetInput + "," + cityInput + "&" + gkey + '"';
    $("#street").val('');
    $("#city").val('');
    //$( "h1" ).text( picUrl );
    $body.append('<img class="bgimg" src= picUrl >');

    return false;
};

$('#form-container').submit(loadData);
