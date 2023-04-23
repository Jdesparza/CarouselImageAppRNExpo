import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

import data from './data/repository'
import { useRef, useState } from 'react';

const { width, height } = Dimensions.get('window')

export default function App() {

  const [selectedIndex, setSelectedIndex] = useState(0)
  const bottomRef = useRef()
  const topRef = useRef()

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={data}
        ref={topRef}
        renderItem={({ item, index }) => {
          return (
            <Image source={item.image} style={{ width, height, resizeMode: 'cover' }} />
          )
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const index = (e.nativeEvent.contentOffset.x / width).toFixed(0)
          setSelectedIndex(index)
          bottomRef.current.scrollToIndex({ animated: true, index: index })
        }}
      />
      <View style={{ position: 'absolute', bottom: 20, width: width - 5, alignSelf: 'center' }}>
        <FlatList
          data={data}
          ref={bottomRef}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity style={{ width: 90, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  setSelectedIndex(index);
                  topRef.current.scrollToIndex({ animated: true, index: index })
                }}>
                <Image source={item.image} style={
                  {
                    width: selectedIndex == index ? 90 : 50,
                    height: selectedIndex == index ? 90 : 50,
                    borderRadius: selectedIndex == index ? 45 : 10,
                    borderWidth: selectedIndex == index ? 1 : 0,
                    borderColor: 'white',
                    resizeMode: 'cover'
                  }} />
              </TouchableOpacity>
            )
          }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={selectedIndex}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
