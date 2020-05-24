var fileList = {
  //'ItemName': 'data/en/ItemName.json?ver=' + fileVersion,
  // @todo: Add filelist
};

var loadedData = {};

for (let [key, url] of Object.entries(fileList)) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      loadedData[key] = data;
    });
}

let preload = null;
$(function () {
  preload = setInterval(function () {
    if (Object.keys(fileList).length === Object.keys(loadedData).length) {
      start();
    }
  }, 100);
});

var templates = {};

/**
 * Initializes and starts the application.
 */
function start() {
  clearInterval(preload);

  // @todo: init other stuff
  initTemplates();
  initTypeAhead();
  initDarkMode();
  initUI();

  $('.loading').hide();
  $('.main').show();
}


/**
 * Handles when an item is selected in the autocomplete.
 *
 * @param e
 * @param suggestion
 */
function onTypeaheadSelect(e, suggestion) {
  var $typeahead = $('.typeahead');
  $typeahead.typeahead('val', '');

  // @todo: Do guild search logic

  $typeahead.trigger('focus');
}

/**
 * For a given template, populate the template then return the HTML to be
 * inserted.
 *
 * @returns {*}
 */
function applyTemplate(template, data) {
  return templates[template](data);
}

/**
 * Initialize the autocomplete functionality.
 */
function initTypeAhead() {
  // @todo: populate with list of guild names.
  var autocompleteData = [];

  var autocompleteBH = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.nonword('value'),
    queryTokenizer: Bloodhound.tokenizers.nonword,
    //identify: function(obj) { return obj.value; },
    local: autocompleteData
  });

  var $typeahead = $('.typeahead');

  $typeahead.typeahead({
      hint: true,
      highlight: true,
      minLength: 1,
    },
    {
      limit: 50,
      name: 'items',
      source: autocompleteBH,
      display: 'value',
      templates: {
        empty: '<div class="empty-message">Nothing found.</div>',
        suggestion: templates['GuildTypeahead'],
      }
    }
  );

  $typeahead.on('typeahead:select', onTypeaheadSelect);
}

/**
 * Initialize the various templates that are used.
 */
function initTemplates() {
  Handlebars.registerHelper('cssclass', function (aString) {
    return aString.toLowerCase().replace(' ', '-').replace('\'', '');
  });

  var templateSelectors = {
    'GuildTypeahead': '.template-guild-typeahead',
  };

  for (let [key, selector] of Object.entries(templateSelectors)) {
    var $template = $(selector);
    templates[key] = Handlebars.compile($template.html());
  }
}

/**
 * Initializes and loads the dark mode functionality.
 */
function initDarkMode() {
  var $body = $('body');
  var darkModeKey = 'guildDarkMode';
  console.log('dark mode inited');
  $body.on('click', '.toggle-dark-mode', function () {
    $('.toggle-dark-mode').hide();
    $('.toggle-light-mode').show();
    $body.addClass('dark-mode');
    localStorage.setItem(darkModeKey, '1');
  });

  $body.on('click', '.toggle-light-mode', function () {
    $('.toggle-dark-mode').show();
    $('.toggle-light-mode').hide();
    $body.removeClass('dark-mode');
    localStorage.setItem(darkModeKey, '');
  });

  if (localStorage.getItem(darkModeKey) === '1') {
    $('.toggle-dark-mode').hide();
    $('.toggle-light-mode').show();
    $body.addClass('dark-mode');
  }
}

/**
 * Initializes the interactive elements.
 */
function initUI() {
  var $body = $('body');

  // @todo: Hook up buttons.

  // Init calculating modal, but don't show yet.
  $('#calculatingModal').modal({
    'show': false
  });
}
