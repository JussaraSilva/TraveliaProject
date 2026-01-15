import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    
  },

  aisle: {
    width: 32,
    alignItems: 'center',
  },

  seat: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },

  available: {
    backgroundColor: '#e8f2ff',
  },

  occupied: {
    backgroundColor: '#2F80ED',
  },

  selected: {
    backgroundColor: '#2F80ED',
  },

  unavailable: {
    backgroundColor: '#8495b3',
  },

  seatText: {
    fontWeight: 'bold',
    color: '#70acff',
  },

  selectText: {
    fontWeight: 'bold',
    color: '#fff',
  },

  rowLabel: {
  width: 20,
  textAlign: 'center',
  fontWeight: 'bold',
  },

});
