API_KEY = "5e89df95d3msh042ea4cb320d766p13c714jsn5d60c5ffe334"
KEY = API_KEY

var userAPIKey = false;

function getVideoInfo_and_downlaod()
{
    // get the video link from the input field
    var link = document.getElementById("link").value;
    if(link == "")
    {
        alert(getLocalized("KEY_LINK_TERM"));
        return;
    }
    var videoId = getVideoId(link);
    if(videoId == null)
    {
        alert(getLocalized("KEY_LINK_VALID"));
        return;
    }

    checkUserApi();
   document.getElementById("result").innerHTML = getLocalized("KEY_GETTING_INFO");
    
    getDownloadLink(videoId);

    
}

async function getDownloadLink(videoId)
{
    try
    {
        var link = await API_1(videoId);
        if(link != null)
        {
            download(link);
            return;
        }

        var link = await API_2(videoId);
        if(link != null)
        {
            download(link);
            return;
        }

        if(userAPIKey)
            alert(getLocalized("KEY_API_VALID"));
        else
            alert(getLocalized("KEY_API_MAX"))
    }
    catch(error)
    {
        console.log(error);
        alert("Error");
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
            "X-RapidAPI-Key": KEY,
            "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com"
        }
    };


    return new Promise((resolve, reject) => {
        $.ajax(settings)
        .done(function (response) {
            var title = response["title"];
            var link = response["link"];

            // Find the element with id="title" and set its text to the title
            document.getElementById("result").innerHTML += "<p style='color: green;'>" + title + "</p>";
            document.getElementById("result").innerHTML += getLocalized("KEY_DOWNLOADING");

            resolve(link);
        })
        .fail(function (xhr, status, error) {
            // Handle error response
            console.log(status + ": " + error);
            resolve(null);
        });
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
            "X-RapidAPI-Key": KEY,
            "X-RapidAPI-Host": "t-one-youtube-converter.p.rapidapi.com"
        }
    };

    return new Promise((resolve, reject) => {
        $.ajax(settings)
        .done(function (response) {
            var title = response["YoutubeAPI"]["titolo"];
            var link = response["YoutubeAPI"]["urlMp3"];

            document.getElementById("result").innerHTML += "<p style='color: green;'>" + title + "</p>";
            document.getElementById("result").innerHTML += getLocalized("KEY_DOWNLOADING");

            resolve(link);
        })
        .fail(function (xhr, status, error) {
            // Handle error response
            console.log(status + ": " + error);
            resolve(null);
        });
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
  

  function checkUserApi()
  {
    // find the element with id="user-api-key" and set its text to the api key if it is not empty
    var user_api_key = document.getElementById("user-api-key").value;
    if(user_api_key != "")
    {
        userAPIKey = true;
        KEY = user_api_key;
    }
    else
    {
        userAPIKey = false;
        KEY = API_KEY;
    }
  }
  
function reset()
{
    document.getElementById("link").value = "";
    document.getElementById("result").innerHTML = "";
}
