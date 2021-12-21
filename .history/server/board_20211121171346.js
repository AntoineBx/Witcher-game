class Board {
  constructor() {
    this.fields = [
        {type : "siege",side : 2, cards : []},
        {type : "ranged",side : 2, cards : []},
        {type : "infantry",side : 2, cards : []},
        {type : "infantry",side : 1, cards : []},
        {type : "ranged",side : 1, cards : []},
        {type : "siege",side : 1, cards : []},
    ],
    this.turn = 0;
  }
}

module.exports = Board;