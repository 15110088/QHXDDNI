import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Map   from './Map'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Map   style={{flex: 1, alignItems: "center", justifyContent: "center"}}/>
      </View>
    );
  }
}


export default App;
