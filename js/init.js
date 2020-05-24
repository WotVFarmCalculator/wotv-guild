var fileList = {
  'Unit': config['dataUrl'] + 'data/Unit.json',
  'PlayerLvTbl': config['dataUrl'] + 'data/PlayerLvTbl.json',
  'UnitLvTbl': config['dataUrl'] + 'data/UnitLvTbl.json',
  'Job': config['dataUrl'] + 'data/Job.json',
  'GuildStatueInfo': config['dataUrl'] + 'data/GuildStatueInfo.json',
  'GuildStatueExperienceTBL': config['dataUrl'] + 'data/GuildStatueExperienceTBL.json',
  'UnitAbilityBoard': config['dataUrl'] + 'data/UnitAbilityBoard.json',
  'Skill': config['dataUrl'] + 'data/Skill.json',
  'Buff': config['dataUrl'] + 'data/Buff.json',
  'NBeastLvTbl': config['dataUrl'] + 'data/NBeastLvTbl.json',
  'NetherBeastAbilityBoard': config['dataUrl'] + 'data/NetherBeastAbilityBoard.json',
  'VisionCard': config['dataUrl'] + 'data/VisionCard.json',
  'VisionCardLvTbl': config['dataUrl'] + 'data/VisionCardLvTbl.json',
  'Artifact': config['dataUrl'] + 'data/Artifact.json',
  'ArtifactLvTbl': config['dataUrl'] + 'data/ArtifactLvTbl.json',
};

var data = {};
var templates = {};
var action = 'rankings';
var actionParams = {};

loadFileList(fileList, start);

/**
 * Initializes and starts the application.
 */
function start(loadedData) {
  Object.assign(data, loadedData);

  initTemplates();
  initDarkMode();
  initUI();

  // Perform state-based routing based on query params.
  var params = new URLSearchParams(window.location.search);
  if (params.has('action') && config['validActions'].contains(params.get('action'))) {
    action = params.get('action');
  }

  switch (action) {
    case 'rankings':
      initRankings();
      break;
    case 'guild':
      initGuild();
      break;
    case 'battle':
      initBattle();
      break;
  }

  $('.loading').hide();
  $('.main').show();
}

/**
 * Initialize the various templates that are used.
 */
function initTemplates() {
  Handlebars.registerHelper('cssclass', function (aString) {
    // @todo: this fails when there are multiple instances to replace...
    return aString.toLowerCase().replace(' ', '-').replace('\'', '');
  });

  var $templates = $('template');
  $templates.each(function (i, elem) {
    var $template = $(this);
    var templateKey = $template.data('template');
    templates[templateKey] = Handlebars.compile($template.html());
  });
}

/**
 * Initializes and loads the dark mode functionality.
 */
function initDarkMode() {
  var $body = $('body');

  $body.on('click', '.toggle-dark-mode', function () {
    $('.toggle-dark-mode').hide();
    $('.toggle-light-mode').show();
    $body.addClass('dark-mode');
    localStorage.setItem(config['darkModeKey'], '1');
  });

  $body.on('click', '.toggle-light-mode', function () {
    $('.toggle-dark-mode').show();
    $('.toggle-light-mode').hide();
    $body.removeClass('dark-mode');
    localStorage.setItem(config['darkModeKey'], '');
  });

  if (localStorage.getItem(config['darkModeKey']) === '1') {
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
