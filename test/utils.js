const getRandomChar = () => {
  var randomInt = Math.round(Math.random() * 93) + 32;
  return String.fromCharCode(randomInt);
}

export const getRandomWord = (randomFlag, min, max) => {
  let str = '';
  const range = min;
  for (let i = 0; i < range; i++) {
    let char = getRandomChar();
    if (char != '/') {
      str += char
    } else {
      str += 'a'
    }
  }
  return str;
}

export const getErrorMsg = (str) => {
  return JSON.parse(str).error
}

