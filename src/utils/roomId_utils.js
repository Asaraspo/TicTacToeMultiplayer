const order = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

/**
 *
 * @param {string} id
 * @returns {string} newId
 * @function increments last entry of firebase to create a new room id which is not in use, used to create a unique room id without long waiting periods
 */
const nextId = (id) => {
  if (!id) {
    return "00000";
  }
  let i = 0;
  let length = id.length;
  let isTrue = true;
  while (isTrue) {
    if (length == 0) {
      return order[0].repeat(id.length + 1);
    }
    let index = order.indexOf(id[length - 1]);
    if (index < order.length - 1) {
      isTrue = false;
      return replaceAt(id, length - 1, order[index + 1]);
    } else {
      id = replaceAt(id, length - 1, order[0]);
      length--;
      i++;
    }
  }
};

const replaceAt = (string, index, newChar) => {
  return string.substring(0, index) + newChar + string.substring(index + 1);
};

export { nextId };
