export const CONFIG = {
  world: {
    width: 500,
    height: 450,
    backgroundColor: '#ffd200',
    knightWidth: 0.15, // szerokość rycerza w stosunku do szerokości świata
    knightSpeed: 0.36, // ułamek szerokości świata na sekundę
    foodWidth: 0.1, // szerokość jedzonka w stosunku do szerokości świata
    foodStartSpeed: 1, // todo: start w nazwie jest motywacją do tego, aby inkrementować to przy poziomach
    foodStartAmount: 5, // todo: start w nazwie jest motywacją do tego, aby inkrementować to przy poziomach
  },
  assets: {
    food: { alias: 'food', src: 'food.png' },
    knight: { alias: 'knight', src: 'knight.png' },
  },
} as const;
