import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  VirtualizedList,
} from 'react-native';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState([]);
  var extradata = [];
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=' + page)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn('Error:', err);
      });
  }, [page]);

  const loadmore = async () => {
    setPage(page + 1);
    console.warn('now page no is ', page);
    await axios
      .get('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=' + page)
      .then((res) => {
        setData(res.data.concat());
        console.log(res.data);
      })
      .catch((err) => {
        console.warn('Error:', err);
      });
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
        keyExtractor={(item) => item.userId}
        getItemCount={getItemCount}
        getItem={getItem}
        //pagingEnabled={true}
        onScrollEndDrag={loadmore}
        onEndReached={loadmore}
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
