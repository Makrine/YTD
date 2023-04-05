let selectedLanguageCode = "GE";
let localizationMap = new Map();



document.addEventListener('DOMContentLoaded', function() {
    
    start();
    
    var languageSelect = document.getElementById("language-select");

    languageSelect.addEventListener('change', function() {
        selectedLanguageCode = languageSelect.value.toUpperCase();

        localizeAll();
      });
  });


async function loadLocalizationData() {
    const response = await fetch('localization.csv');
    const data = await response.text();
  
    const parsedData = Papa.parse(data, { header: true }).data;
  
    const localizationMap = new Map();
    parsedData.forEach(row => {
      localizationMap.set(row.KEY, {
        EN: row.EN,
        GE: row.GE,
        // Add more language codes as needed
      });
    });
  
    return localizationMap;
  }
  
  function getLocalizedString(key, languageCode) {
    const localizedStrings = localizationMap.get(key);
    if (localizedStrings) {
      return localizedStrings[languageCode];
    } else {
      return key; // Return the key itself if no localized string is found
    }
  }

  async function start()
  {
    localizationMap = await loadLocalizationData();
    localizeAll();
  }  


  function localize(id, key)
  {
    var item = document.getElementById(id);
    var localized = getLocalizedString(key, selectedLanguageCode);
    item.innerHTML = localized;
  }

  function getLocalized(key)
  {
    return getLocalizedString(key, selectedLanguageCode);
  }

  function localizeAll()
  {
    localize('download', 'KEY_DOWNLOAD');
    localize('reset', 'KEY_RESET');
    localize('reset2', 'KEY_RESET');
    localize('advanced', 'KEY_ADVANCED');
    localize('eneter-link', 'KEY_ENTER_LINK');
    localize('lang', 'KEY_LANG');
    localize('KEY_API_USE', 'KEY_API_USE');
    localize('KEY_API_USE2', 'KEY_API_USE2');
    localize('KEY_API_USE3', 'KEY_API_USE3');
    localize('search', 'KEY_SEARCH');
    localize("search-prompt", "KEY_SEARCH_PROMPT");
  }