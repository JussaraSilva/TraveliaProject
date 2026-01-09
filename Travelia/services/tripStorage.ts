import AsyncStorage from '@react-native-async-storage/async-storage';
import { PacoteViagem } from '@/assets/types/bookingType';

const STORAGE_KEY = 'myTrips';

export async function saveTrip(trip: PacoteViagem) {
  try {
    const tripsJSON = await AsyncStorage.getItem(STORAGE_KEY);
    let trips: PacoteViagem[] = tripsJSON ? JSON.parse(tripsJSON) : [];
    
    // Converte o ID atual para string para garantir comparação segura
    const currentId = String(trip.id);

    // Encontra o índice se ele já existir
    const existingIndex = trips.findIndex(t => String(t.id) === currentId);

    if (existingIndex !== -1) {
      // Se já existe, atualizamos os dados (importante para o caso de repagar/atualizar)
      trips[existingIndex] = trip;
      console.log('Viagem atualizada no storage');
    } else {
      // Se não existe, adicionamos ao início da lista (para aparecer primeiro em My Trips)
      trips.unshift(trip);
      console.log('Nova viagem salva no storage');
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  } catch (error) {
    console.error('Erro ao salvar viagem', error);
  }
}

export async function getTrips(): Promise<PacoteViagem[]> {
  try {
    const tripsJSON = await AsyncStorage.getItem(STORAGE_KEY);
    const trips = tripsJSON ? JSON.parse(tripsJSON) : [];
    console.log('Total de viagens recuperadas:', trips.length);
    return trips;
  } catch (error) {
    console.error('Erro ao buscar viagens', error);
    return [];
  }
}

// Alterado para aceitar string ou number para evitar erros de tipagem
export async function getTripById(id: number | string): Promise<PacoteViagem | null> {
  const trips = await getTrips();
  return trips.find(t => String(t.id) === String(id)) || null;
}

// Função utilitária para você limpar o storage durante os testes se precisar
export async function clearAllTrips() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}


// Adicione isso ao seu tripStorage.ts
export async function deleteTrip(id: number | string) {
  try {
    const tripsJSON = await AsyncStorage.getItem(STORAGE_KEY);
    if (!tripsJSON) return;

    let trips: PacoteViagem[] = JSON.parse(tripsJSON);
    // Filtra para remover a viagem com o ID correspondente
    const updatedTrips = trips.filter(t => String(t.id) !== String(id));

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));
    console.log(`Viagem ${id} removida com sucesso.`);
  } catch (error) {
    console.error('Erro ao deletar viagem', error);
    throw error;
  }
}