import AsyncStorage from '@react-native-async-storage/async-storage';
import { PacoteViagem } from '@/assets/types/bookingType';

const STORAGE_KEY = 'myTrips';

export async function saveTrip(trip: PacoteViagem) {
  try {
    const tripsJSON = await AsyncStorage.getItem(STORAGE_KEY);
    const trips: PacoteViagem[] = tripsJSON ? JSON.parse(tripsJSON) : [];
    
    // evita duplicar pacotes
    const exists = trips.some(t => t.id === trip.id);
    if (!exists) trips.push(trip);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  } catch (error) {
    console.error('Erro ao salvar viagem', error);
  }
}

export async function getTrips(): Promise<PacoteViagem[]> {
  try {
    const tripsJSON = await AsyncStorage.getItem(STORAGE_KEY);
    return tripsJSON ? JSON.parse(tripsJSON) : [];
  } catch (error) {
    console.error('Erro ao buscar viagens', error);
    return [];
  }
}

export async function getTripById(id: number): Promise<PacoteViagem | null> {
  const trips = await getTrips();
  return trips.find(t => t.id === id) || null;
}
