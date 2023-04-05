API_KEY_YT = "AIzaSyBi7F2RvjqICAyatrf9lR_gq7t4J4vaD9k"

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`)
    // Call the Geocoding API to retrieve the user's country
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
      .then(response => response.json())
      .then(data => {
        const country = data.address.country;
        console.log(`User is in ${country}`);
        if(country == "Georgia")
        {
            selectedLanguageCode = "GE";
            var languageSelect = document.getElementById("language-select");
            languageSelect.value = "GE";
        }
        else
        {
            selectedLanguageCode = "EN";
            var languageSelect = document.getElementById("language-select");
            languageSelect.value = "EN";
        }
      })
      .catch(error => {
        console.log(`Error retrieving country: ${error}`);
      });
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}