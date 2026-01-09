// AddTravelerScreen.tsx
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { InputField } from '@/components/forms/inputField';
import { DateField } from '@/components/forms/dateField';
import { PhoneField } from '@/components/forms/phoneField';
import { DocumentField } from '@/components/forms/documentField';

const AddTravelerScreen = () => {
  const [formData, setFormData] = useState({
    // Informações Pessoais
    firstName: '',
    lastName: '',
    dateOfBirth: null as Date | null,
    email: '',
    nationality: '',
    
    // Telefone
    phone: '',
    countryCode: '+1',
    
    // Documentos
    identityCard: {
      number: '',
      country: '',
      issueDate: null as Date | null,
      expiryDate: null as Date | null,
    },
    passport: {
      number: '',
      country: '',
      issueDate: null as Date | null,
      expiryDate: null as Date | null,
    },
    drivingLicense: {
      number: '',
      country: '',
      issueDate: null as Date | null,
      expiryDate: null as Date | null,
    },
  });

  const handleSave = () => {
    // Lógica para salvar os dados
    console.log('Dados salvos:', formData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Traveler</Text>

      {/* Seção de Informações Pessoais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <InputField
          label="First Name"
          value={formData.firstName}
          onChangeText={(text) => setFormData({...formData, firstName: text})}
          placeholder="Enter first name"
          isRequired
        />
        
        <InputField
          label="Last Name"
          value={formData.lastName}
          onChangeText={(text) => setFormData({...formData, lastName: text})}
          placeholder="Enter last name"
          isRequired
        />
        
        <DateField
          label="Date of Birth"
          value={formData.dateOfBirth}
          onChange={(date) => setFormData({...formData, dateOfBirth: date})}
        />
      </View>

      {/* Seção de Contato */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <PhoneField
          label="Phone Number"
          value={formData.phone}
          onChange={(phone, countryCode) => 
            setFormData({...formData, phone, countryCode})
          }
        />
        
        <InputField
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          placeholder="darlene.robertson@domain.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Seção de Documentos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Documents</Text>
        
        {/* Identity Card */}
        <DocumentField
          type="identity"
          number={formData.identityCard.number}
          country={formData.identityCard.country}
          issueDate={formData.identityCard.issueDate}
          expiryDate={formData.identityCard.expiryDate}
          onNumberChange={(number) => setFormData({
            ...formData, 
            identityCard: {...formData.identityCard, number}
          })}
          onCountryChange={(country) => setFormData({
            ...formData, 
            identityCard: {...formData.identityCard, country}
          })}
          onIssueDateChange={(date) => setFormData({
            ...formData, 
            identityCard: {...formData.identityCard, issueDate: date}
          })}
          onExpiryDateChange={(date) => setFormData({
            ...formData, 
            identityCard: {...formData.identityCard, expiryDate: date}
          })}
        />

        {/* Passport */}
        <DocumentField
          type="passport"
          number={formData.passport.number}
          country={formData.passport.country}
          issueDate={formData.passport.issueDate}
          expiryDate={formData.passport.expiryDate}
          onNumberChange={(number) => setFormData({
            ...formData, 
            passport: {...formData.passport, number}
          })}
          onCountryChange={(country) => setFormData({
            ...formData, 
            passport: {...formData.passport, country}
          })}
          onIssueDateChange={(date) => setFormData({
            ...formData, 
            passport: {...formData.passport, issueDate: date}
          })}
          onExpiryDateChange={(date) => setFormData({
            ...formData, 
            passport: {...formData.passport, expiryDate: date}
          })}
        />

        {/* Driving License */}
        <DocumentField
          type="drivingLicense"
          number={formData.drivingLicense.number}
          country={formData.drivingLicense.country}
          issueDate={formData.drivingLicense.issueDate}
          expiryDate={formData.drivingLicense.expiryDate}
          onNumberChange={(number) => setFormData({
            ...formData, 
            drivingLicense: {...formData.drivingLicense, number}
          })}
          onCountryChange={(country) => setFormData({
            ...formData, 
            drivingLicense: {...formData.drivingLicense, country}
          })}
          onIssueDateChange={(date) => setFormData({
            ...formData, 
            drivingLicense: {...formData.drivingLicense, issueDate: date}
          })}
          onExpiryDateChange={(date) => setFormData({
            ...formData, 
            drivingLicense: {...formData.drivingLicense, expiryDate: date}
          })}
        />
      </View>

      {/* Nacionalidade */}
      <View style={styles.section}>
        <InputField
          label="Nationality"
          value={formData.nationality}
          onChangeText={(text) => setFormData({...formData, nationality: text})}
          placeholder="United States"
        />
      </View>

      {/* Botões de Ação */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 32,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
});

export default AddTravelerScreen;