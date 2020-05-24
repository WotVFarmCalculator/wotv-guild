var config = {
  'apiUrl': 'https://bhtcookie.blob.core.windows.net/bhtguild/',
  'rankings': 'guildrankings.json',
  'guild': 'guild/{{guildId}}.json',
  'battle': 'guild/{{guildId}}/{{battleId}}.json',
  // @todo: Go by commit or by master branch?
  //'dataUrl': 'https://raw.githubusercontent.com/WotVFarmCalculator/wotvfarmcalculator.github.io/21fd8434f6a3fe8af2a1352f9f83ff9ad64fa8e8/',
  'dataUrl': 'https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/',
  'validActions': [
    'rankings',
    'guild',
    'battle'
  ],
  'darkModeKey': 'guildDarkMode',
};
