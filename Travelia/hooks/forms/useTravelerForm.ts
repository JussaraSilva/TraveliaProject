import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { useTravelers } from '@/context/traveler/travelerContext';

export const useTravelerForm = () => {
  const { addTraveler } = useTravelers();
  const navigation = useNavigation();

  const [form, setForm] = useState({
    nomeCompleto: '', 
    dobDay: '', 
    dobMonth: '', 
    dobYear: '',
    gender: '', 
    CPF: '', 
    countryCode: '+55', 
    phone: '', 
    email: '',
    identityNumber: '', 
    identityCountry: '', 
    identityIssueDate: '', 
    identityExpiryDate: '',
    passportNumber: '', 
    passportCountry: '', 
    passportExpiryDate: '', 
    nationality: '',
    driverLicenseNumber: '', 
    driverLicenseCountry: '', 
    driverLicenseIssueDate: '', 
    driverLicenseExpiryDate: '',
  });

  const [genderOpen, setGenderOpen] = useState(false);
  const [calendarConfig, setCalendarConfig] = useState<{ open: boolean, field: string | null }>({
    open: false, field: null
  });

  const update = (key: string, value: string) => {
    let formatted = value;

    if (key === 'CPF') {
      formatted = value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2').substring(0, 14);
    } else if (key === 'identityNumber') {
      formatted = value.replace(/[^\dX]/gi, '').toUpperCase().replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})([\dX]{1})$/, '$1-$2').substring(0, 12);
    } else if (key === 'phone') {
      formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 15);
    } else if (key === 'passportNumber') {
      let clean = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      const letters = clean.slice(0, 2).replace(/[^A-Z]/g, '');
      const numbers = clean.slice(2).replace(/[^0-9]/g, '');
      formatted = (letters + numbers).substring(0, 9);
    } else if (key === 'driverLicenseNumber') {
      // Mantém apenas números e limita a 11 caracteres
      formatted = value.replace(/\D/g, '').substring(0, 11);
      
      // Opcional: Adicionar máscara visual 000000000-00
      if (formatted.length > 9) {
        formatted = formatted.replace(/(\d{9})(\d{2})/, '$1-$2');
      }
    }

    setForm(prev => ({ ...prev, [key]: formatted }));
  };

  

  const openCalendar = (field: string) => setCalendarConfig({ open: true, field });
  const closeCalendar = () => setCalendarConfig({ open: false, field: null });

  const handleSave = () => {
      if (!form.nomeCompleto || !form.CPF) {
        alert("Por favor, preencha o nome e CPF.");
        return;
      }

      const newTraveler = {
        id: Math.random().toString(36).substr(2, 9), // ID temporário
        ...form
      };

      addTraveler(newTraveler);
      navigation.goBack(); // Volta para a tela do Picker
    };

  return {
    form,
    update,
    genderOpen,
    setGenderOpen,
    calendarConfig,
    openCalendar,
    closeCalendar,
    handleSave,
  };


};