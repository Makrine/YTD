API_KEY = "5e89df95d3msh042ea4cb320d766p13c714jsn5d60c5ffe334"

function getVideoInfo_and_downlaod()
{
    // get the video link from the input field
    var link = document.getElementById("link").value;
    if(link == "")
    {
        alert("Please enter a link");
        return;
    }
    var videoId = getVideoId(link);
    if(videoId == null)
    {
        alert("Please enter a valid link");
        return;
    }

    
    // var downloadLink = API_1(videoId);
    // if(downloadLink != null)
    // {
    //     download(downloadLink);
    //     return;
    // }

    downloadLink = API_2(videoId);
    if(downloadLink != null)
    {
        download(downloadLink);
        return;
    }

}


function API_1(videoId)
{
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com"
        }
    };


    $.ajax(settings)
    .done(function (response) {
        var title = response["title"];
        var link = response["link"];

        // Find the element with id="title" and set its text to the title
        document.getElementById("title").innerHTML = title;

        return link;
    })
    .fail(function (xhr, status, error) {
        // Handle error response
        console.log(status + ": " + error);
        return null;
    });

}

function API_2(videoId)
{
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess?url=https%3A%2F%2Fyoutu.be%2F${videoId}&format=mp3&responseFormat=json&lang=en`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "t-one-youtube-converter.p.rapidapi.com"
        }
    };


    $.ajax(settings)
    .done(function (response) {
        var title = response["YoutubeAPI"]["titolo"];
        var link = response["file"];

        // Find the element with id="title" and set its text to the title
        document.getElementById("title").innerHTML = title;

        return link;
    })
    .fail(function (xhr, status, error) {
        // Handle error response
        console.log(status + ": " + error);
        return null;
    });

}

function download(link)
{
    window.open(link, '_blank');
}


function getVideoId(link)
{
    // regex to get id from youtube link
    var regex = /(?:v=|\/)([a-zA-Z0-9_-]{11})/;
    var match = link.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  }
  
  
