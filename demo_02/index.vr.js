import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  AmbientLight,
  PointLight,
  Model,
  Text,
  View, 
} from 'react-vr';

export default class PositionDemo extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('hotel.jpg')}/>
        <AmbientLight intensity={0.3} />
        <PointLight 
          intensity={0.3} 
          style={{
            color: "white",
            transform: [{translate: [0, 4, 0.25]}]
          }}
        />
        <Model
          style={{
            layoutOrigin: [0.5, 0.5],
            transform: [
              {translate: [0, 0, -100]}
            ]
          }}
          lit={true}
          source={{obj:asset('reactvr.obj'), mtl:asset('reactvr.mtl')}}
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
          source={{obj:asset('reactvr.obj'), mtl:asset('reactvr.mtl')}}
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
          source={{obj:asset('reactvr.obj'), mtl:asset('reactvr.mtl')}}
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
          source={{obj:asset('reactvr.obj'), mtl:asset('reactvr.mtl')}}
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('PositionDemo', () => PositionDemo);
