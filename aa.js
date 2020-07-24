import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  VirtualizedList,
} from 'react-native';
import axios from 'axios';

export default class App() extends  {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  axios
    .get('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=' + page)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.warn('Error:', err);
    });

  const loadmore = () => {
    setPage((prevState) => {
      prevState + 1;
    });
    console.log(page);
  };
  const Item = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    );
  };

  const getItem = (data1, index) => {
    return {
      title: data[index].title,
      body: data[index].body,
    };
  };

  const getItemCount = () => {
    return Object.keys(data).length;
  };

  return (
    <View style={styles.screen}>
      <VirtualizedList
        data={data}
        initialNumToRender={4}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={(item) => item.Id}
        getItemCount={getItemCount}
        getItem={getItem}
        //onEndReached={loadmore}
        onMomentumScrollEnd={loadmore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingBottom: '6%',
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
    fontSize: 18,
  },
  body: {
    fontSize: 12,
  },
});
