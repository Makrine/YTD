API_KEY = "AIzaSyBi7F2RvjqICAyatrf9lR_gq7t4J4vaD9k"

function searchVideos() {
    // Get the user input
    const searchTerm = document.getElementById("prompt").value;
    
    if(searchTerm == "")
    {
        alert("Please enter a search term");
        return;
    }
    
    // Load the YouTube API client library
    gapi.load("client", function() {
      // Initialize the API client
      gapi.client.init({
        apiKey: API_KEY,
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
        // Display the video thumbnails and titles in a table
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
          const titleButton = document.createElement("button");
          titleButton.textContent = title;
          titleButton.onclick = function() {
            getDownloadLink(videoId);
          };
          titleButton.classList.add("title");
          titleCell.appendChild(titleButton);
  
          row.appendChild(thumbnailCell);
          row.appendChild(titleCell);
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
  
  
  
  