import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

type Props = {
  google_maps_url: string;
};

export default function MapSection({ google_maps_url }: Props) {
  
  // 1. Garantimos que a URL use HTTPS e tenha o parâmetro de saída
  const embedUrl = `${google_maps_url.replace('http:', 'https:')}&output=embed`;

  // 2. Criamos o HTML que "engana" o Google fornecendo o Iframe que ele exige
  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body, html { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; }
          iframe { border: none; height: 100%; width: 100%; }
        </style>
      </head>
      <body>
        <iframe src="${embedUrl}" allowfullscreen></iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.mapWrapper}>
      <WebView
        // Em vez de source uri, usamos source html
        source={{ html: mapHtml }}
        style={styles.webView}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        originWhitelist={['*']}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mapWrapper: {
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  webView: {
    flex: 1,
    // Alguns dispositivos Android precisam desse ajuste de opacidade para renderizar WebViews
    opacity: 0.99, 
  },
});