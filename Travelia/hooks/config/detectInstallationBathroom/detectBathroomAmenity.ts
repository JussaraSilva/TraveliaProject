export type RoomAmenityItem = {
  id: string;
  label: string;
  Icon: React.ElementType;
};


export type BathroomAmenityCategory =
  | 'amenities'
  | 'hair'
  | 'bath'
  | 'luxury'
  | 'culture'
  | 'eco'
  | 'misc';


export function detectBathroomAmenity(item: string): BathroomAmenityCategory {
  const text = item.toLowerCase();

  if (text.includes('secador')) return 'hair';
  if (
    text.includes('sabonete') ||
    text.includes('shampoo')
  ) return 'bath';

  if (text.includes('luxo') || text.includes('premium'))
    return 'luxury';

  if (
    text.includes('japonesas') ||
    text.includes('turcas') ||
    text.includes('francesas')
  ) return 'culture';

  if (
    text.includes('natural') ||
    text.includes('ecológico')
  ) return 'eco';

  if (text.includes('amenidades')) return 'amenities';

  return 'misc';
}
