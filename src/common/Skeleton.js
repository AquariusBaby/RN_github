import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Skeleton = () => {
  const num = [0,0,0,0,0,0];
  return (
    <View style={{flex: 1, overflow: 'hidden', justifyContent: 'flex-start'}}>
      {
        num.map((item, index) => (
            <View style={styles.cell_container} key={index}>
              <Text style={styles.title} />
              <Text style={styles.description} />
              <View style={styles.row} />
            </View>
          )
        )
      }
    </View>
  )
};

export default Skeleton;

const styles = StyleSheet.create({
  cell_container: {
    height: 119,
    overflow: 'hidden',
    // flex: 1,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowRadius: 1,
    backgroundColor: 'white',
    elevation: 2
  },
  title: {
    width: 200,
    height: 20,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    overflow: 'hidden'
  },
  description: {
    height: 52,
    width: '100%',
    // flex: 1,
    // height: 60,
    marginTop: 5,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    overflow: 'hidden'
  },
  row: {
    width: '100%',
    height: 14,
    marginTop: 5,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    overflow: 'hidden'
  }
});
