requestAnimationFrame('dotenv').config();

function getVideoInfo()
{
    // get the video link from the input field
    var link = document.getElementById("link").value;
    var videoId = getVideoId(link);

    // regex to get id from youtube link
    var regex = /(?:v=|\/)([a-zA-Z0-9_-]{11})/;
    var id = link.match(regex)[1];



    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://youtube-mp36.p.rapidapi.com/dl?id=${id}`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": process.env.API_KEY,
            "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        var title = response["title"];
        var link = response["link"];

        // find element with id="title" and set its text to the title
        document.getElementById("title").innerHTML = title;

        download(link);
    });

}


function download(link)
{
    window.open(link, '_blank');

}


function getVideoId(link) {
    var regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
    var match = link.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  }
  
  