import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  PointLight,
  Model,
  Text,
  View,
} from 'react-vr';

export default class GrandParade extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('hotel.jpg')}/>
        <PointLight style={{color:'white', transform:[{translate : [500, 300, 100]}]}} />
        <Model
          style={{
            layoutOrigin: [0.5, 0.5],
            transform: [
              {translate: [0, 0, -100]}
            ]
          }}
          lit={true}
          source={{obj:asset('grandparade.obj'), mtl:asset('grandparade.mtl')}}
        />
        <Model
          style={{
            layoutOrigin: [0.5, 0.5],
            transform: [
              {translate: [250, 0, -100]},
              {rotateY: -90}
            ]
          }}
          lit={true}
          source={{obj:asset('grandparade.obj'), mtl:asset('grandparade.mtl')}}
        />
        <Model
          style={{
            layoutOrigin: [0.5, 0.5],
            transform: [
              {translate: [0, -250, 0]},
              {rotateX: -90}
            ]
          }}
          lit={true}
          source={{obj:asset('grandparade.obj'), mtl:asset('grandparade.mtl')}}
        />
        <Model
          style={{
            layoutOrigin: [0.5, 0.5],
            transform: [
              {translate: [0, 250, 0]},
              {rotateX: 90},
              {scale: 3.0}
            ]
          }}
          lit={true}
          source={{obj:asset('grandparade.obj'), mtl:asset('grandparade.mtl')}}
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('GrandParade', () => GrandParade);
