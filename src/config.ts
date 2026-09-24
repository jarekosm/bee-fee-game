export const CONFIG = {
  world: {
    width: 500,
    height: 640,
    backgroundColor: '#ffd200',
    knightWidth: 0.25, // szerokość rycerza w stosunku do szerokości świata
    foodWidth: 0.1, // szerokość jedzonka w stosunku do szerokości świata
  },
  assets: {
    food: { alias: 'food', src: 'food.png' },
    knight: { alias: 'knight', src: 'knight.png' },
  },
} as const;
