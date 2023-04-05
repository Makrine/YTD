API_KEY_YT = "AIzaSyBi7F2RvjqICAyatrf9lR_gq7t4J4vaD9k"

function searchVideos() {
    // Get the user input
    const searchTerm = document.getElementById("prompt").value;
    
    if(searchTerm == "")
    {
        alert(getLocalized("KEY_SEARCH_TERM"));
        return;
    }

    // Load the YouTube API client library
    gapi.load("client", function() {
      // Initialize the API client
      gapi.client.init({
        apiKey: API_KEY_YT,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
      }).then(function() {
        // Use the API client to search for videos
        return gapi.client.youtube.search.list({
          q: searchTerm,
          part: "snippet",
          type: "video",
          maxResults: 10
        });
      }).then(function(response) {
        // Display the video thumbnails, titles, and links in a table
        const results = document.getElementById("results");
        results.innerHTML = "";
        const videos = response.result.items;
        videos.forEach(video => {
          const videoId = video.id.videoId;
          const thumbnailUrl = video.snippet.thumbnails.default.url;
          const title = video.snippet.title;
          const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  
          const row = document.createElement("div");
          row.classList.add("result-row");
  
          const thumbnailCell = document.createElement("div");
          thumbnailCell.classList.add("result-cell");
          const thumbnail = document.createElement("img");
          thumbnail.src = thumbnailUrl;
          thumbnail.classList.add("thumbnail");
          thumbnailCell.appendChild(thumbnail);

const titleCell = document.createElement("div");
titleCell.classList.add("result-cell");

const songTitle = document.createElement("div");
songTitle.textContent = title;
songTitle.classList.add("title");

const downloadButton = document.createElement("button");
downloadButton.textContent = "Download";
downloadButton.onclick = function() {
  getDownloadLink(videoId);
};
downloadButton.classList.add("download");

titleCell.appendChild(songTitle);
titleCell.appendChild(downloadButton);


  
          const linkCell = document.createElement("div");
          linkCell.classList.add("result-cell");
          row.appendChild(linkCell);
  
          const linkButton = document.createElement("button");
          linkButton.textContent = "Copy Link";
          linkButton.classList.add("link");
          linkCell.appendChild(linkButton);
  
          linkButton.addEventListener("click", function() {
            const textField = document.createElement("textarea");
            textField.innerText = videoUrl;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand("copy");
            textField.remove();
            linkButton.style.backgroundColor = '#008CBA';
          });
  
          row.appendChild(thumbnailCell);
          row.appendChild(titleCell);
          row.appendChild(linkCell);
          results.appendChild(row);
        });
    }, function(error) {
        console.error("Error loading YouTube API client", error);
      });
    });
  }
  
  function resetSearch()
  {
        document.getElementById("prompt").value = "";
        document.getElementById("results").innerHTML = "";
        document.getElementById("result").innerHTML = "";
  }
  
  
  
  