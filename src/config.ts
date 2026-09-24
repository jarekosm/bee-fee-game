export const CONFIG = {
  world: {
    width: 500,
    height: 450,
    backgroundColor: '#ffd200',
    knightWidth: 0.15, // szerokość rycerza w stosunku do szerokości świata
    foodWidth: 0.1, // szerokość jedzonka w stosunku do szerokości świata
    foodStartSpeed: 1,
    foodStartAmount: 5,
  },
  assets: {
    food: { alias: 'food', src: 'food.png' },
    knight: { alias: 'knight', src: 'knight.png' },
  },
} as const;
