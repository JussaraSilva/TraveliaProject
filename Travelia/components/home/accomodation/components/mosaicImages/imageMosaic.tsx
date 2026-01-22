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
        <TouchableOpacity
          style={styles.mainImageContainer}>
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
    width: '100%',
    marginVertical: 15,
    minHeight: 220, // Garante que o container tenha altura mínima
  },
  mosaicWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 220, 
    gap: 8,
  },
  mainImageContainer: {
    flex: 1.5, 
    backgroundColor: 'red', // Agora DEVE aparecer se 'images' não for null
    borderRadius: 10,
    overflow: 'hidden',
  },
  sideGrid: {
    flex: 1, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  thumbnailItem: {
    width: '46%', // Reduzi um pouco para garantir que caibam dois
    height: '47%', 
    backgroundColor: 'blue', // Teste visual para a grade
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject, // Força a imagem a preencher o Touchable
    width: '100%',
    height: '100%',
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