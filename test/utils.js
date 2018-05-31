function getRandomChar() {
  var randomInt = Math.round(Math.random() * 93) + 32;
  return String.fromCharCode(randomInt);
}

function getRandomWord(randomFlag, min, max) {
  var str = '';
  var range = min;
  for (var i = 1; i < range; i++) {
    var char = getRandomChar();
    if (char != '/') {
      str += char
    } else {
      str += 'a'
    }
  }
  return str;
}

module.exports = getRandomWord;
