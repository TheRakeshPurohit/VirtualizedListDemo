import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  VirtualizedList,
  StatusBar,
} from 'react-native';

export default function App() {
  const DATA = [];

  const getItem = (data, index) => {
    return {
      id: Math.random().toString(12).substring(0),
      title: `Item ${index + 1}`,
    };
  };

  const getItemCount = (data) => {
    return 50;
  };

  const Item = ({title}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.container}>
        <VirtualizedList
          data={DATA}
          initialNumToRender={4}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={(item) => item.key}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height,
    //marginTop: StatusBar.height,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});
