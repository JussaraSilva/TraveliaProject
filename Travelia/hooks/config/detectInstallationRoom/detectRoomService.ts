import { RoomServiceCategory } from "./instalationRoom.config";

export function detectRoomService(item: string): RoomServiceCategory {
  
  const text = item.toLowerCase();

  if (text.includes('tv')) return 'tv';
  if (text.includes('som') || text.includes('bluetooth')) return 'audio';

  if (
    text.includes('café') ||
    text.includes('cafeteira') ||
    text.includes('espresso') ||
    text.includes('nespresso') ||
    text.includes('chaleira')
  ) return 'coffee';

  if (text.includes('frigobar')) return 'fridge';

  if (
    text.includes('ar condicionado') ||
    text.includes('aquecedor') ||
    text.includes('piso aquecido')
  ) return 'climate';

  if (text.includes('ventilador')) return 'fan';

  if (text.includes('cofre')) return 'safe';

  if (text.includes('telefone')) return 'phone';

  if (
    text.includes('mesa de trabalho') ||
    text.includes('escritório') ||
    text.includes('ferramentas de trabalho')
  ) return 'workspace';

  if (text.includes('varanda') || text.includes('rede')) return 'balcony';

  if (
    text.includes('vista') ||
    text.includes('binóculos') ||
    text.includes('praia')
  ) return 'view';

  if (
    text.includes('piscina') ||
    text.includes('jacuzzi')
  ) return 'pool';

  if (text.includes('lareira')) return 'fireplace';

  if (
    text.includes('iluminação') ||
    text.includes('lâmpada')
  ) return 'lighting';

  if (
    text.includes('tomadas') ||
    text.includes('220v')
  ) return 'power';

  if (
    text.includes('banheiro') ||
    text.includes('secador') ||
    text.includes('roupão') ||
    text.includes('chinelos')
  ) return 'bathroom';

  if (
    text.includes('cama') ||
    text.includes('futon') ||
    text.includes('tatami')
  ) return 'bed';

  if (
    text.includes('yukata') ||
    text.includes('quimono') ||
    text.includes('egípcia') ||
    text.includes('japonesa')
  ) return 'culture';

  if (
    text.includes('churrasqueira') ||
    text.includes('área externa')
  ) return 'outdoor';

  return 'misc';
}


