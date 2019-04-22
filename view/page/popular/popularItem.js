import React, {Component, PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default class PopularItem extends PureComponent {
  constructor(props) {
    super(props);
    this.dataList = this.props.dataList;
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onSelect()}>
        <View style={styles.cell_container}>
          <Text style={styles.title} numberOfLines={1}>{this.dataList.full_name}</Text>
          <Text style={styles.description} numberOfLines={3}>{this.dataList.description}</Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text>Author:</Text>
              <Image source={{uri: this.dataList.owner.avatar_url}} style={styles.imgContainer} />
            </View>
            <View style={styles.row}>
              <Text>Start:</Text>
              <Text>{this.dataList.stargazers_count}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cell_container: {
    height: 119,
    overflow: 'hidden',
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
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  description: {
    height: 52,
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
    overflow: 'hidden'
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    width: 22,
    height: 22
  }
});
