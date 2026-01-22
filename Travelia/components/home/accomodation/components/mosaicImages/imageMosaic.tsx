import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  images?: string[]
}

export default function ImageMosaic({images}: Props) {
  const {styles } = useThemedStyles(createStyles);

  if (!images || images.length === 0) return null;

  const mainImage = images[0];

  const thumbnails = images.slice(1, 5);

  const remainingCount = images.length - 5;


  return (
    <View style={styles.container}>
      
      <View style={styles.mosaicWrapper}>
        {/* <Lado Esquerdo  - Imagem de Destaque/> */}
        <TouchableOpacity>
          <Image source={{uri: mainImage}} 
            style={styles.image}
          />
        </TouchableOpacity>

        <View style={styles.sideGrid}>
          {thumbnails.map((img, index) => (
          <TouchableOpacity key={index} style={styles.thumbnailItem} activeOpacity={0.8}>
              <Image source={{uri: img}} style={styles.image}/>

              {/* Overlay no último item */}
              {index === 3 && (remainingCount > 0) && (
                <View style={styles.overlay}>
                  <MaterialCommunityIcons name="plus" size={24} color="white" />
                  <Text style={styles.overlayText}>See All</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>


      </View>

    </View>
  )
}

const createStyles = (theme: ThemeName) => StyleSheet.create({

  container: {
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: themeColors[theme].textPrimary,
    marginBottom: 12,
  },
  mosaicWrapper: {
    flexDirection: 'row',
    height: 220, // Altura total do bloco de mosaico
    gap: 8,
  },
  mainImageContainer: {
    flex: 1.5, // Ocupa a maior parte da largura
  },
  sideGrid: {
    flex: 1, // Coluna da direita
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  thumbnailItem: {
    width: '47%', // Quase metade para caber 2 por linha com gap
    height: '48%', // Quase metade da altura total
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#e1e1e1',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  }



  
})