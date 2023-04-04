// Load the CSV file using fetch()
fetch('localization.csv')
  .then(response => response.text())
  .then(data => {
    // Parse the CSV data using PapaParse
    const parsedData = Papa.parse(data, { header: true }).data;

    // Convert the parsed CSV data into a map
    const localizationMap = new Map();
    parsedData.forEach(row => {
      localizationMap.set(row.KEY, {
        EN: row.EN,
        GE: row.GE
        // Add more language codes as needed
      });
    });

    // Function to retrieve a localized string based on the selected language code
    function getLocalizedString(key, languageCode) {
      const localizedStrings = localizationMap.get(key);
      if (localizedStrings) {
        return localizedStrings[languageCode];
      } else {
        return key; // Return the key itself if no localized string is found
      }
    }

    // Example usage:
    const selectedLanguageCode = 'GE'; // Replace with the selected language code
    const localizedGreeting = getLocalizedString('KEY_DOWNLOAD', selectedLanguageCode); // Returns "გამარჯობა" for "GE"
    console.log(localizedGreeting);
  });
