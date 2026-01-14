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
    backgroundColor: '#EAF2FF',
  },

  selected: {
    backgroundColor: '#2F80ED',
  },

  occupied: {
    backgroundColor: '#8A94A6',
  },

  seatText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
