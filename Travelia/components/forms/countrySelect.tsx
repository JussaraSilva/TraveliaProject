// CountrySelectPicker.tsx (alternativa)
import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {Picker} from '@react-native-picker/picker';

interface CountrySelectPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const CountrySelect: React.FC<CountrySelectPickerProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <View style={[
        styles.pickerContainer,
        isFocused && styles.focusedContainer,
        error && styles.errorContainer,
      ]}>
        {Platform.OS === 'ios' ? (
          // Picker para iOS
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={styles.picker}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <Picker.Item label="Select a country" value="" />
            <Picker.Item label="United States of America" value="US" />
            <Picker.Item label="Brazil" value="BR" />
            <Picker.Item label="Canada" value="CA" />
            <Picker.Item label="United Kingdom" value="GB" />
            <Picker.Item label="Australia" value="AU" />
            {/* Adicione mais países */}
          </Picker>
        ) : (
          // Picker para Android
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={styles.picker}
            mode="dropdown"
          >
            <Picker.Item label="Select a country" value="" />
            <Picker.Item label="United States of America" value="US" />
            <Picker.Item label="Brazil" value="BR" />
            <Picker.Item label="Canada" value="CA" />
            <Picker.Item label="United Kingdom" value="GB" />
            <Picker.Item label="Australia" value="AU" />
          </Picker>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  focusedContainer: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  errorContainer: {
    borderColor: '#FF3B30',
  },
  picker: {
    height: 50,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
});