import { themeColors, ThemeName } from '@/constants/theme'
import { useThemedStyles } from '@/hooks/theme/useThemedStyles'
import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextInputProps, // Importante
} from 'react-native'

// Herdamos todas as propriedades do TextInput padrão (keyboardType, maxLength, etc)
interface BaseInputProps extends TextInputProps {
  label?: string
  leftIcon?: React.ReactNode
  rightElement?: React.ReactNode
  error?: string
  containerStyle?: ViewStyle
  inputUniqueStyle?: ViewStyle
  onPress?: () => void
  disabled?: boolean
}

export function BaseInput({
  label,
  error,
  containerStyle,
  inputUniqueStyle,
  leftIcon,
  rightElement,
  onPress,
  disabled,
  editable = true,
  style,
  ...rest // Captura todo o resto (keyboardType, value, onChangeText, etc)
}: BaseInputProps) {
  const { theme, styles } = useThemedStyles(createStyles);

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Wrapper
        activeOpacity={0.7}
        onPress={onPress}
        disabled={disabled || !onPress}
        style={[
          styles.inputWrapper,
          disabled && styles.disabled,
          error ? styles.errorBorder : null,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={themeColors[theme].textSecondary}
          editable={editable && !onPress}
          pointerEvents={onPress ? 'none' : 'auto'}
          {...rest} // Aplica automaticamente keyboardType e outros
        />

        {rightElement && (
          <View style={styles.rightElement}>{rightElement}</View>
        )}
      </Wrapper>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const createStyles = (theme: ThemeName) => (
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: themeColors[theme].textPrimary,
      marginBottom: 6,
      fontWeight: 'bold',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      paddingHorizontal: 12,
      height: 48,
      backgroundColor: themeColors[theme].background,
      borderWidth: 1,
      borderColor: themeColors[theme].borderColor,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: themeColors[theme].textPrimary,
    },
    leftIcon: {
      marginRight: 8,
    },
    rightElement: {
      marginLeft: 8,
    },
    disabled: {
      backgroundColor: themeColors[theme].backgroundCard,
    },
    errorBorder: {
      borderColor: themeColors[theme].colorRed,
    },
    errorText: {
      marginTop: 4,
      fontSize: 12,
      color: themeColors[theme].colorRed,
    },
  })
);