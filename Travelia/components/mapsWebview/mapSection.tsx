import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

type Props = {
  latitude: number;
  longitude: number;
};

export default function MapSection({ latitude, longitude }: Props) {
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  const openExternalMap = () => {
    Linking.openURL(`https://www.google.com/maps?q=${latitude},${longitude}`);
  };

  return (
    <View>
      <View style={{ height: 250, borderRadius: 12, overflow: 'hidden' }}>
        <WebView
          source={{ uri: mapUrl }}
          javaScriptEnabled
          domStorageEnabled
        />
      </View>

      {/* 👇 AÇÃO DO MAPA */}
      <TouchableOpacity onPress={openExternalMap} style={{ marginTop: 8 }}>
        <Text style={{ color: '#1E90FF', fontWeight: '600' }}>
          Open in Google Maps
        </Text>
      </TouchableOpacity>
    </View>
  );
}
