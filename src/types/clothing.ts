
export type Location = 'house1' | 'house2' | 'travel';

export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  location: Location;
  color: string;
  season: string;
}

export const CLOTHING_CATEGORIES = [
  'Tops',
  'Bottoms',
  'Outerwear',
  'Dresses',
  'Underwear',
  'Sleepwear',
  'Activewear',
  'Shoes',
  'Accessories'
];

export const SEASONS = [
  'All Seasons',
  'Spring/Fall',
  'Summer',
  'Winter'
];

export const COLORS = [
  'Black',
  'White',
  'Gray',
  'Blue',
  'Navy',
  'Red',
  'Green',
  'Brown',
  'Beige',
  'Pink',
  'Purple',
  'Yellow',
  'Orange',
  'Multi-color'
];
