import { useState } from 'react';
import { FlatList, Image, View, type ImageSourcePropType } from 'react-native';

type Props = {
  images: ImageSourcePropType[];
  imageAlts?: string[];
};

export const ImageCarousel = ({ images, imageAlts }: Props) => {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);

  if (!images.length) return null;

  return (
    <View className="w-full">
      <View
        className="aspect-[4/5] w-full overflow-hidden"
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        {width > 0 && (
          <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
            onScroll={(e) => {
              const next = Math.round(e.nativeEvent.contentOffset.x / width);
              setIndex(Math.max(0, Math.min(images.length - 1, next)));
            }}
            keyExtractor={(_, i) => String(i)}
            renderItem={({ item, index: i }) => (
              <Image
                source={item}
                accessibilityLabel={imageAlts?.[i] ?? `Imagem ${i + 1}`}
                style={{ width, height: '100%' }}
                resizeMode="cover"
              />
            )}
          />
        )}
      </View>

      {images.length > 1 && (
        <View
          className="flex-row justify-center gap-1.5 py-2"
          accessibilityLabel={`Imagem ${index + 1} de ${images.length}`}>
          {images.map((_, i) => (
            <View
              key={i}
              className={`h-2 w-2 rounded-full ${i === index ? 'bg-primary' : 'bg-muted-foreground/40'}`}
            />
          ))}
        </View>
      )}
    </View>
  );
};
