// DocumentField.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { InputField } from './inputField';
import { CountrySelect } from './countrySelect';
import { DateField } from './dateField';

interface DocumentFieldProps {
  type: 'identity' | 'passport' | 'drivingLicense';
  number: string;
  country: string;
  issueDate: Date | null;
  expiryDate: Date | null;
  onNumberChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onIssueDateChange: (date: Date) => void;
  onExpiryDateChange: (date: Date) => void;
}

export const DocumentField: React.FC<DocumentFieldProps> = ({
  type,
  number,
  country,
  issueDate,
  expiryDate,
  onNumberChange,
  onCountryChange,
  onIssueDateChange,
  onExpiryDateChange,
}) => {
  const getDocumentLabel = () => {
    switch (type) {
      case 'identity':
        return 'Identity Card Number';
      case 'passport':
        return 'Passport Number';
      case 'drivingLicense':
        return 'Driving License Number';
      default:
        return 'Document Number';
    }
  };

  return (
    <View style={styles.container}>
      {/* Número do Documento */}
      <InputField
        label={getDocumentLabel()}
        value={number}
        onChangeText={onNumberChange}
        placeholder="Enter document number"
      />

      {/* País de Emissão */}
      <CountrySelect
        label="Country of Issue"
        value={country}
        onChange={onCountryChange}
      />

      {/* Data de Emissão */}
      <DateField
        label="Date of Issue"
        value={issueDate}
        onChange={onIssueDateChange}
      />

      {/* Data de Expiração (se aplicável) */}
      {(type === 'passport' || type === 'drivingLicense') && (
        <DateField
          label="Expiry Date"
          value={expiryDate}
          onChange={onExpiryDateChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
  },
});