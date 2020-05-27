var guildId = null;

/**
 * Load and render the guild detail.
 */
function initGuild() {
  var params = new URLSearchParams(window.location.search);
  if (params.has('guildId')) {
    guildId = parseInt(params.get('guildId'));
  }

  if (!guildId || !Number.isInteger(guildId)) {
    showError('Unable to load guild due to missing or invalid parameters.');
    return;
  }


  var fileList = {}
  fileList['Guild' + guildId] = config['apiUrl'] + config['guild'].replace('{{guildId}}', guildId)

  loadFileList(fileList, startGuild);
}

/**
 * Callback after data is ready for parsing.
 *
 * @param loadedData
 */
function startGuild(loadedData) {
  Object.assign(data, loadedData);
  var guildKey = 'Guild' + guildId;

  if (!data.hasOwnProperty(guildKey) || !data[guildKey].hasOwnProperty('body') || !data[guildKey]['body'].hasOwnProperty('records')) {
    showError('Unable to load rankings due to missing data.');
    console.error('Unable to load rankings');
    return;
  }

  var $content = $('.content');
  $content.append(applyTemplate('GuildBattleList', '{}'));

  var records = data[guildKey]['body']['records'];
  console.log(records);

  records.forEach(function (record) {
    var recordVM = record;

    recordVM.event_date = new Date(record.event_date * 1000).toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    recordVM.result = "Win";
    if (record.status === 2) {
      recordVM.result = "Loss";
    }

    //move guild_id to enemy_guild_id
    //add ally_guild_id
    recordVM.enemy_guild_id = record.guild_id;
    recordVM.ally_guild_id = guildId;

    $content.find('tbody').append(applyTemplate('GuildBattleRow', recordVM));

  });
}
