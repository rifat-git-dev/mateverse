function calculateElo(player, opponent, result) {
  const K = 32;
  const expected = 1 / (1 + Math.pow(10, (opponent - player) / 400));
  return Math.round(player + K * (result - expected));
}

module.exports = calculateElo;