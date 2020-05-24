/**
 * Load and render the guild rankings.
 */
function initRankings() {

  var fileList = {
    'Rankings': config['apiUrl'] + config['rankings'],
  }

  loadFileList(fileList, startRankings);


  // @todo: get searching/filtering by guild name working
  //initTypeAhead();

  // @todo: add pagination once API supports it

}

/**
 * Callback after data is ready for parsing.
 *
 * @param loadedData
 */
function startRankings(loadedData) {
  Object.assign(data, loadedData);


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
