/**
 * Tracks the current chosen league.
 * @type {string}
 */
var league = 'legend';

/**
 * Maps internal banner ID to image name.
 */
var bannerMap = {
  'GE_REWARD9': 'alien',
  'GE_REWARD1': 'allyare',
  'GE_REWARD14': 'bhmt',
  'GE_REWARD15': 'cact',
  'GE_REWARD10': 'choc',
  'GE_DEFAULT5': 'crystalfaith',
  'GE_REWARD6': 'cyga',
  'GE_DEFAULT3': 'fenice',
  'GE_REWARD7': 'goga',
  'GE_REWARD3': 'guren',
  'GE_DEFAULT2': 'hourn',
  'GE_REWARD5': 'hyndra',
  'GE_REWARD12': 'ifri',
  'GE_REWARD13': 'ignt',
  'GE_REWARD8': 'indep',
  'GE_DEFAULT1': 'leonis',
  'GE_REWARD11': 'mogly',
  'GE_REWARD4': 'owis',
  'GE_REWARD2': 'rundall',
  'GE_DEFAULT4': 'wezett',
};


/**
 * Load and render the guild rankings.
 */
function initRankings() {
  var params = new URLSearchParams(window.location.search);
  if (params.has('league') && config.validLeagues.hasOwnProperty(params.get('league'))) {
    league = params.get('league');
  }

  // @todo: pass league to API once API supports it.
  var fileList = {
    'Rankings': config['apiUrl'] + config['rankings'],
  }

  loadFileList(fileList, startRankings);

  // @todo: get searching/filtering by guild name working
  //initTypeAhead();

  // @todo: add pagination if/when API supports it
}

/**
 * Callback after data is ready for parsing.
 *
 * @param loadedData
 */
function startRankings(loadedData) {
  Object.assign(data, loadedData);

  $('.title').text('Guild Rankings - ' + config.validLeagues[league]);

  var $content = $('.content');

  $content.append(applyTemplate('LeagueSelect', {
    'leagues': config.validLeagues,
  }));
  $content.append(applyTemplate('GuildList', {}));

  $('.league-selector select option[value=' + league + ']').attr('selected', 'selected');

  // Handle change of selected league - redirect with query string param.
  $('body').on('change', '.league-selector select', function () {
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set("league", $(this).val());
    window.location.search = searchParams.toString();
  });

  if (!data.hasOwnProperty('Rankings') || !data['Rankings'].hasOwnProperty('body') || !data['Rankings']['body'].hasOwnProperty('rankings')) {
    showError('Unable to load rankings due to missing data.');
    console.error('Unable to load rankings');
    return;
  }

  console.log(data['Rankings']);

  data['Rankings']['body']['rankings'].forEach(function (guildRanking) {

    guildRanking.banner = 'alien';
    if (bannerMap.hasOwnProperty(guildRanking.emblem_id)) {
      guildRanking.banner = bannerMap[guildRanking.emblem_id];
    }

    $content.find('tbody').append(applyTemplate('GuildRankingRow', guildRanking));
  });
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
