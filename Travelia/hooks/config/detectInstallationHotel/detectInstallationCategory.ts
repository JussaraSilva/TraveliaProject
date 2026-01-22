import { InstallationCategory } from './instalations.config';

export function detectInstallationCategory(
  service: string
): InstallationCategory {
  const text = service.toLowerCase();

  // 🍽️ Alimentação
  if (
    text.includes('café') ||
    text.includes('restaurante') ||
    text.includes('alimentação') ||
    text.includes('lanches') ||
    text.includes('cafeteria')
  ) return 'food';

  // 🍽️ Bebidas
  if (
    /\bbar\b/.test(text) ||
    text.includes('drink') ||
    text.includes('vinho') ||
    text.includes('cerveja') ||
    text.includes('bebidas')
  ) return 'drink';



  // 🏊 Piscina
  if (text.includes('piscina'))
    return 'pool';

  // ✨ Spa
  if (
    text.includes('spa') ||
    text.includes('hamam') ||
    text.includes('onsen')
  ) return 'spa';

  // 💪 Fitness
  if (
    text.includes('academia') ||
    text.includes('fitness') ||
    text.includes('yoga')
  ) return 'fitness';

  // 🏃 Atividades
  if (
    text.includes('snorkel') ||
    text.includes('trilha') ||
    text.includes('safári') ||
    text.includes('atividade') ||
    text.includes('passeio')
  ) return 'activities';

  // 🚗 Transporte
  if (
    text.includes('transfer') ||
    text.includes('limusine') ||
    text.includes('taxi') ||
    text.includes('uber') ||
    text.includes('barco')
  ) return 'transport';

  // 🅿️ Estacionamento
  if (
    text.includes('estacionamento') ||
    text.includes('valet')
  ) return 'parking';

  // 🔔 Concierge
  if (
    text.includes('concierge') ||
    text.includes('recepção') ||
    text.includes('bagagem') ||
    text.includes('lavanderia')
  ) return 'concierge';

  // 💼 Negócios
  if (
    text.includes('business') ||
    text.includes('meeting')
  ) return 'business';

  // 📶 Wi-Fi
  if (
    text.includes('wi-fi') ||
    text.includes('wifi')
  ) return 'wifi';

  // 🗺️ Turismo
  if (
    text.includes('tour') ||
    text.includes('guia') ||
    text.includes('informações turísticas')
  ) return 'tourism';

  // 🏖️ Praia
  if (
    text.includes('praia') ||
    text.includes('guarda-sol')
  ) return 'beach';

  // 🚲 Aluguel
  if (
    text.includes('aluguel')
  ) return 'rental';

  // 🧒 Kids
  if (
    text.includes('kids') ||
    text.includes('criança')
  ) return 'kids';

  // 👀 Vista
  if (
    text.includes('vista')
  ) return 'view';

  // 🌡️ Conforto
  if (
    text.includes('ar condicionado') ||
    text.includes('aquecimento') ||
    text.includes('lareira')
  ) return 'comfort';

  return 'other';
}
