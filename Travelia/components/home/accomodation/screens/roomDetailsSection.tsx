import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { View, Text, StyleSheet } from 'react-native'
import { IconTextList } from '../components/lists/iconTextList';
import { ROOM_SERVICES_MAP } from '@/hooks/config/detectInstallationRoom/instalationRoom.config';
import { detectRoomService } from '@/hooks/config/detectInstallationRoom/detectRoomService';
import ItemProprietyRoom from '../components/individual/itemProprietyRoom';
import Highlights from '../components/highlights/highlights';
import ImageMosaic from '../components/mosaicImages/imageMosaic';

type PropsRoomDetailsSection = {
  typeRoom: string;
  amenities: string[];
  typeBed: string;
  capacidade: string;
  size: number;
  // Adicionando as novas props
  vista?: string;
  temVaranda?: boolean | string;
  temBanheiroPrivativo?: boolean;
  images?: string[];
};

export default function RoomDetailsSection({
  typeRoom,
  amenities,
  typeBed,
  capacidade,
  size,
  vista = "Oceano Índico", // Valores default para teste
  temVaranda = true,
  temBanheiroPrivativo = true,
  images= [],
}: PropsRoomDetailsSection) {

  const { styles } = useThemedStyles(createStyles);

  const items = amenities.map(item => {
    const category = detectRoomService(item);
    return {
      id: item,
      label: item,
      Icon: ROOM_SERVICES_MAP[category].icon,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerInfoTop}>
        <Text style={styles.textTitle}>{typeRoom}</Text>
      </View>

      <View style={styles.containerDetailsRoom}>
        <ItemProprietyRoom 
          typeBed={typeBed} 
          capacidadePersons={capacidade}
          sizeRoom={size}
        />
        
        {/* SEÇÃO DE DESTAQUE (HIGHLIGHTS) */}
        <View style={styles.highlightRow}>
          <Highlights 
            vista={vista}
            temVaranda={temVaranda}
            temBanheiroPrivativo={temBanheiroPrivativo}
          />
        </View>
      </View>

      <View style={styles.containerGallery}>
        <View style={styles.containerGalleryTitle}>
          <Text style={styles.sectionTitle}>Room Gallery</Text>
        </View>
        <View style={styles.containerGalleryImages}>
            <ImageMosaic 
              images={images}
            />
        </View>
      </View>

      <View style={styles.containerFacilitiesRoom}>
        <Text style={styles.sectionTitle}>Main Room Facilities</Text>
        <IconTextList items={items} />
      </View>
    </View>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  containerInfoTop: {
    marginTop: 10,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
    marginBottom: 10,
  },
  containerDetailsRoom: {
    gap: 15, // Aumentado para dar respiro entre o ItemPropriety e as Badges
    alignItems: 'flex-start', // Alinhado à esquerda fica mais elegante para badges
  },
  highlightRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 5,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors[theme].background, // Ou um tom bem claro da cor primária
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: themeColors[theme].borderColor, // Ajuste conforme seu theme
    gap: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: themeColors[theme].textPrimary,
  },
  containerFacilitiesRoom: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: themeColors[theme].textPrimary,
    marginBottom: 12,
  },

  containerGallery: {
    marginTop: 25,
  },
  containerGalleryTitle: {
    marginBottom: 10,
  },

  containerGalleryImages: {
    flexDirection: 'row',
    gap: 10,
  },
});