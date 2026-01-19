import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { BaseInput } from '@/components/inputs/form/baseInput';
import HeaderGlobal from '@/components/header/headerGlobal';
import { CaretDownIcon, XIcon, CalendarBlankIcon} from 'phosphor-react-native';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { themeColors, ThemeName } from '@/constants/theme';
import { Section } from '@/components/inputs/form/section';
import { Calendar } from 'react-native-calendars';
import { useTravelerForm } from '@/hooks/forms/useTravelerForm';
import { useTravelers } from '@/context/traveler/travelerContext';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function AddTraveler() {
  const router = useRouter();

  const { editIndex, travelerData } = useLocalSearchParams();

  const { addTraveler, updateTraveler } = useTravelers();

  const { theme, styles } = useThemedStyles(createStyles);
  
  const { 
    form, 
    update, 
    genderOpen, 
    setGenderOpen, 
    calendarConfig, 
    openCalendar, 
    closeCalendar 
  } = useTravelerForm();


  const genderOptions = ['Masculino', 'Feminino', 'Outro', 'Prefiro não informar'];

  useEffect(() => {
      if (travelerData) {
        const existingTraveler = JSON.parse(travelerData as string);
        
        // Itera sobre as chaves do viajante existente e atualiza o seu form
        Object.keys(existingTraveler).forEach((key) => {
          update(key as any, existingTraveler[key]);
        });
      }
    }, [travelerData, update]);
  // 1. Pegue os parâmetros da URL (onde enviamos o editIndex)

  const handleSave = () => {
    if (!form.nomeCompleto || !form.CPF) {
      Alert.alert("Error", "Please fill in Name and CPF.");
    return;
  }

  // Se editIndex existe, estamos no modo EDIÇÃO
  if (editIndex !== undefined) {
    const index = Number(editIndex);
    updateTraveler(index, { ...form } as any); // Você precisa exportar updateTraveler do Hook
    
    Alert.alert("Success", "Traveler updated!", [
      { text: "OK", onPress: () => router.back() }
    ]);
  } else {
    // Modo ADIÇÃO (seu código original)
    const newTraveler = {
      id: Math.random().toString(36).substr(2, 9),
      ...form
    };
    addTraveler(newTraveler as any);
    
    Alert.alert("Success", "Traveler added!", [
      { text: "OK", onPress: () => router.back() }
    ]);
  }
  };

  const closeForm = () => {
    router.back();
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.container}>
        <HeaderGlobal 
          titlePage="Add Traveler" 
          leftIcons={[<XIcon key="close" size={24} color={themeColors[theme].textPrimary} />]}
          onPressLeftIcon={closeForm} 
        />

      <ScrollView contentContainerStyle={styles.containerContent} showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        
        {/* PERSONAL INFO */}
        <Section title="Personal Information">
          <BaseInput
            label="Nome Completo"
            placeholder="Nome Completo"
            value={form.nomeCompleto}
            onChangeText={v => update('nomeCompleto', v)}
          />

          <BaseInput
            label="CPF"
            placeholder="000.000.000-00"
            keyboardType="numeric"
            value={form.CPF}
            onChangeText={v => update('CPF', v)}
          />

          <Text style={styles.subLabel}>Date of Birth</Text>
          <View style={styles.row}>
            <BaseInput
              placeholder="DD"
              keyboardType="numeric"
              maxLength={2}
              value={form.dobDay}
              containerStyle={{ flex: 1 }}
              onChangeText={v => update('dobDay', v)}
            />
            <BaseInput
              placeholder="MM"
              keyboardType="numeric"
              maxLength={2}
              value={form.dobMonth}
              containerStyle={{ flex: 1 }}
              onChangeText={v => update('dobMonth', v)}
            />
            <BaseInput
              placeholder="YYYY"
              keyboardType="numeric"
              maxLength={4}
              value={form.dobYear}
              containerStyle={{ flex: 1.5 }}
              onChangeText={v => update('dobYear', v)}
            />
          </View>

          <BaseInput
            label="Sexo"
            placeholder="Selecionar"
            value={form.gender}
            editable={false}
            onPress={() => setGenderOpen(true)}
            rightElement={<CaretDownIcon size={16} color={themeColors[theme].icon} />}
          />
        </Section>

        {/* CONTACT DETAILS */}
        <Section title="Contact Details">
          <View style={styles.row}>
            <BaseInput
              label="DDI"
              value={form.countryCode}
              containerStyle={{ width: 80 }}
              onChangeText={v => update('countryCode', v)}
            />
            <BaseInput
              label="Phone Number"
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
              value={form.phone}
              containerStyle={styles.full}
              onChangeText={v => update('phone', v)}
            />
          </View>
          <BaseInput
            label="Email"
            placeholder="email@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={v => update('email', v)}
          />
        </Section>

        {/* IDENTITY CARD */}
        <Section title="Identity Card">
          <BaseInput 
            label="Identity Card Number" 
            placeholder="RG / ID"
            value={form.identityNumber} 
            onChangeText={v => update('identityNumber', v)} 
          />
          <BaseInput 
            label="Country of Issue" 
            placeholder="Country"
            value={form.identityCountry} 
            onChangeText={v => update('identityCountry', v)} 
          />
          <View style={styles.row}>
            <BaseInput
              label="Date of Issue"
              value={form.identityIssueDate}
              containerStyle={styles.full}
              editable={false}
              placeholder="YYYY-MM-DD"
              onPress={() => openCalendar('identityIssueDate')}
              rightElement={<CalendarBlankIcon size={20} color="#999" />}
            />
            <BaseInput
              label="Expiry Date"
              value={form.identityExpiryDate}
              containerStyle={styles.full}
              editable={false}
              placeholder="YYYY-MM-DD"
              onPress={() => openCalendar('identityExpiryDate')}
              rightElement={<CalendarBlankIcon size={20} color="#999" />}
            />
          </View>
        </Section>

        {/* PASSPORT */}
        <Section title="Passport">
          <BaseInput 
            label="Passport Number" 
            placeholder="AA000000"
            value={form.passportNumber} 
            onChangeText={v => update('passportNumber', v)} 
            autoCapitalize="characters"
          />
          <BaseInput 
            label="Country of Issue" 
            placeholder="Country"
            value={form.passportCountry} 
            onChangeText={v => update('passportCountry', v)} 
          />
          <View style={styles.row}>
            <BaseInput
              label="Expiry Date"
              value={form.passportExpiryDate}
              containerStyle={styles.full}
              editable={false}
              onPress={() => openCalendar('passportExpiryDate')}
              rightElement={<CalendarBlankIcon size={20} color="#999" />}
            />
            <BaseInput 
              label="Nationality" 
              placeholder="Nationality"
              value={form.nationality} 
              containerStyle={styles.full} 
              onChangeText={v => update('nationality', v)} 
            />
          </View>
        </Section>

        {/* DRIVER'S LICENSE */}
        <Section title="Driver's License">
          <BaseInput 
            label="Driving License Number" 
            placeholder="License Number"
            value={form.driverLicenseNumber} 
            onChangeText={v => update('driverLicenseNumber', v)} 
          />
          <BaseInput 
            label="Country of Issue" 
            placeholder="Country"
            value={form.driverLicenseCountry} 
            onChangeText={v => update('driverLicenseCountry', v)} 
          />
          <View style={styles.row}>
            <BaseInput
              label="Date of Issue"
              value={form.driverLicenseIssueDate}
              containerStyle={styles.full}
              editable={false}
              onPress={() => openCalendar('driverLicenseIssueDate')}
              rightElement={<CalendarBlankIcon size={20} color="#999" />}
            />
            <BaseInput
              label="Expiry Date"
              value={form.driverLicenseExpiryDate}
              containerStyle={styles.full}
              editable={false}
              onPress={() => openCalendar('driverLicenseExpiryDate')}
              rightElement={<CalendarBlankIcon size={20} color="#999" />}
            />
          </View>
        </Section>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.btnCancel}
            onPress={closeForm}
          >
            <Text style={styles.txtCancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSave}
            onPress={handleSave}
          >
            <Text style={styles.txtSave}>Save Traveler</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* MODAL CALENDÁRIO ÚNICO */}
      <Modal visible={calendarConfig.open} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={closeCalendar}>
          <View style={styles.calendarContainer}>
            <Calendar 
                onDayPress={(day) => {
                  update(calendarConfig.field!, day.dateString);
                  closeCalendar();
                }} 
                theme={{ 
                    todayTextColor: themeColors[theme].realceBlue, 
                    selectedDayBackgroundColor: themeColors[theme].realceBlue,
                    arrowColor: themeColors[theme].realceBlue
                }} 
            />
          </View>
        </Pressable>
      </Modal>

      {/* MODAL GÊNERO */}
      <Modal visible={genderOpen} transparent animationType="slide">
        <Pressable style={styles.modalOverlay} onPress={() => setGenderOpen(false)}>
          <View style={styles.genderSheet}>
            <Text style={styles.sheetTitle}>Select Gender</Text>
            {genderOptions.map(opt => (
              <TouchableOpacity 
                key={opt} 
                style={styles.sheetOption} 
                onPress={() => { update('gender', opt); setGenderOpen(false); }}
              >
                <Text style={styles.sheetText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  </KeyboardAvoidingView>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: themeColors[theme].backgroundCard 
  },
  containerContent: { 
    padding: 16, 
    gap: 12, 
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  row: { 
    flexDirection: 'row', 
    gap: 10, 
    width: '100%' 
  },
  full: { 
    flex: 1 
  },
  subLabel: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: themeColors[theme].textPrimary, 
    marginBottom: 4, 
    marginTop: 8 
  },
  actions: { 
    flexDirection: 'row', 
    gap: 12, 
    marginTop: 32 
  },
  btnCancel: { 
    flex: 1, 
    backgroundColor: themeColors[theme].colorRed, 
    padding: 16, 
    borderRadius: 24, 
    alignItems: 'center' 
  },
  btnSave: { 
    flex: 2, 
    backgroundColor: themeColors[theme].realceBlue, 
    padding: 16, 
    borderRadius: 24, 
    alignItems: 'center' 
  },
  txtCancel: { 
    color: themeColors[theme].textButton, 
    fontWeight: '600',
    fontSize: 16
  },
  txtSave: { 
    color: themeColors[theme].textButton, 
    fontWeight: '700',
    fontSize: 16,
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  calendarContainer: { 
    backgroundColor: themeColors[theme].backgroundCard, 
    borderRadius: 16, 
    padding: 10, 
    width: '90%', 
    elevation: 5 
  },
  genderSheet: { 
    backgroundColor: themeColors[theme].backgroundCard, 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    padding: 24, 
    width: '100%', 
    position: 'absolute', 
    bottom: 0 
  },
  sheetTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    textAlign: 'center' 
  },
  sheetOption: { 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: themeColors[theme].borderColor,
  },
  sheetText: { 
    fontSize: 16, 
    textAlign: 'center', 
    color: themeColors[theme].textSecondary, 
  }
});