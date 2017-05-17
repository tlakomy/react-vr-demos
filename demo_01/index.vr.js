import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
} from 'react-vr';

export default class GrandParade extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <Text
          style={{
            backgroundColor: '#3e3e40',
            color: '#f8aa00',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          Grand Parade
        </Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('GrandParade', () => GrandParade);
