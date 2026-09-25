export const CONFIG = {
  world: {
    width: 500,
    height: 450,
    backgroundColor: '#ffd200',
    backgroundAlpha: 0.5, // ciemna cegła przepuszcza kolor tła
    knightWidth: 0.15, // szerokość rycerza w stosunku do szerokości świata
    knightSpeed: 0.5, // ułamek szerokości świata na sekundę
    foodWidth: 0.1, // szerokość jedzonka w stosunku do szerokości świata
    foodStartSpeed: 1, // todo: start w nazwie jest motywacją do tego, aby inkrementować to przy poziomach
    foodStartAmount: 2, // todo: start w nazwie jest motywacją do tego, aby inkrementować to przy poziomach
    levelUpPoints: 10, // ilość punktów do osiągnięcia, aby osiągnąć kolejny poziom
  },
  assets: {
    backgrounds: { alias: 'backgrounds', src: 'backgrounds.png' },
    food: { alias: 'food', src: 'food.png' },
    knight: { alias: 'knight', src: 'knight.png' },
  },
} as const;
