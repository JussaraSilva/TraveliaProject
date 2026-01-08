import AsyncStorage from '@react-native-async-storage/async-storage';

export async function testStorage() {
  try {
    await AsyncStorage.setItem('@teste', 'funcionou');
    const value = await AsyncStorage.getItem('@teste');
    console.log('AsyncStorage value:', value);
  } catch (e) {
    console.log('Erro AsyncStorage:', e);
  }
}

// Chamada de teste
testStorage();
