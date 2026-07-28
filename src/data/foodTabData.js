const foodSuggestionImagePools = {
  salmon: [
    'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
  ],
  yogurt: [
    'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/5945567/pexels-photo-5945567.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
  ],
  greens: [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
  ],
  bowl: [
    'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
  ],
  breakfast: [
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/1150447/pexels-photo-1150447.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
  ],
  smoothie: [
    'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/775031/pexels-photo-775031.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/5945567/pexels-photo-5945567.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
  ],
  pasta: [
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
  ],
  snack: [
    'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/452737/pexels-photo-452737.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/4110250/pexels-photo-4110250.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
  ],
  default: [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
    'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1',
  ],
};

const foodSuggestionImageRules = [
  { pattern: /(salmon|protein|chicken)/, category: 'salmon' },
  { pattern: /(yogurt|greek|parfait)/, category: 'yogurt' },
  { pattern: /(salad|greens|leafy|vegetables|avocado|bean|wrap)/, category: 'greens' },
  { pattern: /(bowl|grain|rice|lentils|chickpeas|quinoa|curry)/, category: 'bowl' },
  { pattern: /(toast|egg|omelet|scramble|breakfast)/, category: 'breakfast' },
  { pattern: /(smoothie|shake)/, category: 'smoothie' },
  { pattern: /(pasta|noodle|penne|spaghetti)/, category: 'pasta' },
  { pattern: /(snack|berries|nuts|fruit|trail mix)/, category: 'snack' },
];

export function getFoodSuggestionImage(item, index = 0) {
  const lowerItem = String(item).toLowerCase();
  const match = foodSuggestionImageRules.find(({ pattern }) => pattern.test(lowerItem));
  const category = match?.category ?? 'default';
  const pool = foodSuggestionImagePools[category] ?? foodSuggestionImagePools.default;
  const safeIndex = Math.abs(index) % pool.length;

  return pool[safeIndex];
}
