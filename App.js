import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  VirtualizedList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState([]);
  const [newdata, setNewData] = useState([]);
  const [page, setPage] = useState(2);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=1')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn('Error:', err);
      });
  }, []);

  const loadmore = async () => {
    setPage((prevPage) => prevPage + 1);
    if (page <= 10) {
      setLoading(true);
      //console.warn('now page no is ', page);
      await axios
        .get(
          'https://jsonplaceholder.typicode.com/posts?_limit=10&_page=' + page,
        )
        .then((res) => {
          //setData(res.data.concat());
          setNewData(res.data);
          Array.prototype.push.apply(data, res.data);
          //console.warn('newdata', newdata);
          //console.warn('data', data);
        })
        .catch((err) => {
          console.warn('Error:', err);
        });
    }
    setLoading(false);
  };
  const Item = ({ item }) => {
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

  const FooterList = () => {
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>Loading ... </Text>
        <ActivityIndicator loading={Loading} size="large" />
      </View>
    );
  };
  return (
    <View style={styles.screen}>
      <VirtualizedList
        data={data}
        initialNumToRender={4}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.Id}
        getItemCount={getItemCount}
        getItem={getItem}
        //pagingEnabled={true}
        //onEndReached={loadmore}
        onEndReached={loadmore}
        ListFooterComponent={FooterList}
        //onScrollAnimationEnd={loadmore}
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
