import { View, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useMemo, useState } from "react";
import { useTheme } from "@/context/themeProvider";
import { ThemeName } from "@/constants/theme";

export default function Gallery({ imagens }: { imagens: string[] }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const width = Dimensions.get("window").width;
  const [index, setIndex] = useState(0);

  return (
    <View style={{ alignItems: "center" }}>
      <Carousel
        width={width - 30}
        height={280}
        data={imagens}
        pagingEnabled
        snapEnabled
        onSnapToItem={(i) => setIndex(i)}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />

      {/* bolinhas de paginação */}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 3,
          marginTop: 1,
          backgroundColor: "#55555584",
          padding: 5,
          borderRadius: 10,
        }}
      >
        {imagens.map((_, i) => (
          <View
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: 50,
              marginHorizontal: 4,
              backgroundColor: i === index ? "#ffffff" : "#b1b0b0",
            }}
          />
        ))}
      </View>
    </View>
  );
}



const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 10,

    },

  });


