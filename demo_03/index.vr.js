import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  Model,
  PointLight,
  VrButton,
  View,
} from 'react-vr';

const textStyles = {
  backgroundColor: '#2B1C34',
  padding: 0.02,
  textAlign: 'center',
  textAlignVertical: 'center',
  fontSize: 0.8,
  layoutOrigin: [0.5, 0.5]
}

export default class GrandParade extends React.Component {
  constructor() {
    super();
    this.state = {rotation: 0, lightsOn: false};
    this.lastUpdate = Date.now();
    this.rotate = this.rotate.bind(this);
  }

  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({rotation: this.state.rotation + delta / 20});
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  stopRotation() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  switchLights() {
    this.setState({
      lightsOn: !this.state.lightsOn
    });
  }

  render() {
    return (
      <View>
        <Pano source={
          this.state.lightsOn ?
          asset('hills.jpg') :
          asset('stars.png')}
        />
        <PointLight style={{color:'white', transform:[{translate : [50, 100, 1000]}]}} />
        <Model
          style={{
            transform: [
            {translate: [0, 0, -70]},
            {scale: 0.06 },
            {rotateY : this.state.rotation},
            {rotateX: 20},
            {rotateZ: -10} ],
          }}
          onEnter={this.rotate.bind(this)}
          onExit={this.stopRotation.bind(this)}
          lit={true}
          source={{obj:asset('earth.obj'), mtl:asset('earth.mtl')}}
        />
        <VrButton
          style={{width: 2}}
          onClick={this.switchLights.bind(this)}>
          <Text
            style={
              {backgroundColor: 'darkblue',
              textAlign: 'center',
              textAlignVertical: 'center',
              fontSize: 0.4,
              layoutOrigin: [0.5, 0.5],
              transform: [
                {translate: [2.5, 0, -3]}
              ]}}
          >
            Switch lights
          </Text>
        </VrButton>
      </View>
    );
  }
};

AppRegistry.registerComponent('GrandParade', () => GrandParade);
