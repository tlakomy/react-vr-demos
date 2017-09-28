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
  VideoPano
} from 'react-vr';

const textStyles = {
  backgroundColor: '#2B1C34',
  padding: 0.02,
  textAlign: 'center',
  textAlignVertical: 'center',
  fontSize: 0.8,
  layoutOrigin: [0.5, 0.5]
}

export default class HelloVR extends React.Component {
  constructor() {
    super();
    this.state = {
      rotation: 0, 
      lightsOn: false,
      houndsOn: false
    };
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

  handleClick() {
    if (!this.state.lightsOn) {
      this.setState({lightsOn: true});
    } else {
      this.setState({houndsOn: true});
    }
  }

  render() {
    return (
      <View>
        {!this.state.houndsOn ? 
          <Pano source={
            this.state.lightsOn ?
            asset('hills.jpg') :
            asset('stars.png')}
          /> :
          <VideoPano 
            source={asset('puppies.mp4')}
            muted={true}
          />
        }
        {!this.state.houndsOn && 
          <View>
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
              onClick={this.handleClick.bind(this)}>
              <Text
                style={{
                  backgroundColor: this.state.lightsOn ? 'red' : 'darkblue',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontSize: 0.4,
                  width: 3,
                  layoutOrigin: [0.5, 0.5],
                  transform: [
                    {translate: [3, 0, -3]}
                  ]}}
              >
                {!this.state.lightsOn ? "Click to turn on the lights" : "Click to UNLEASH THE HOUNDS"}
              </Text>
            </VrButton>
          </View>
        }
      </View>
    );
  }
};

AppRegistry.registerComponent('HelloVR', () => HelloVR);
