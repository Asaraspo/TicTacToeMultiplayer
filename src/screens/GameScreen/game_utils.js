/**
 *
 * @param {array} state
 * @returns {string} winner
 * @function checks for winner
 */
const checkWinner = (state) => {
  if (
    (state[0] != "" && state[0] == state[1] && state[1] == state[2]) ||
    (state[0] != "" && state[0] == state[3] && state[3] == state[6]) ||
    (state[0] != "" && state[0] == state[4] && state[4] == state[8])
  ) {
    return state[0];
  }
  if (
    (state[1] != "" && state[1] == state[4] && state[4] == state[7]) ||
    (state[3] != "" && state[3] == state[4] && state[4] == state[5]) ||
    (state[6] != "" && state[6] == state[4] && state[4] == state[2])
  ) {
    return state[4];
  }
  if (
    (state[2] != "" && state[2] == state[5] && state[5] == state[8]) ||
    (state[6] != "" && state[6] == state[7] && state[7] == state[8])
  ) {
    return state[8];
  }
  return;
};

export { checkWinner };
