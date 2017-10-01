import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  Model,
  Prefetch,
  PointLight,
  VrButton,
  View,
  VideoPano
} from 'react-vr';

const SPACE = "space";
const LIGHTS_ON = "lightsOn";
const HOUNDS = "hounds";

export default class HelloVR extends React.Component {
  constructor() {
    super();
    this.state = {
      rotation: 0,
      currentScene: SPACE
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
    switch (this.state.currentScene) {
      case SPACE:
        this.setState({currentScene: LIGHTS_ON});
        break;
      case LIGHTS_ON:
        this.setState({currentScene: HOUNDS});
        break;
    }
  }

  getBackgroundView() {
    let backGroundView;
    switch (this.state.currentScene) {
      case SPACE:
        backGroundView = <Pano source={asset('stars.png')} />;
        break;
      case LIGHTS_ON:
        backGroundView = <Pano source={asset('hills.jpg')} />;
        break;
      case HOUNDS:
        backGroundView = <VideoPano source={asset('puppies.mp4')} muted={true} />;
        break;
    }

    return backGroundView;
  }

  getButtonText() {
    let buttonText;
    switch (this.state.currentScene) {
      case SPACE:
        buttonText = "Click to turn on the lights";
        break;
      case LIGHTS_ON:
        buttonText = "Click to UNLEASH THE HOUNDS";
        break;
      case HOUNDS:
        buttonText = "One more thing..."
        break;
    }

    return buttonText;
  }

  render() {
    return (
      <View>
        <Prefetch key={"hills"} source={asset('hills.jpg')} />
        {this.getBackgroundView()}
        <View>
            <PointLight style={{color:'white', transform:[{translate : [50, 100, 1000]}]}} />
            {(this.state.currentScene === SPACE || this.state.currentScene === LIGHTS_ON) &&
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
          }
          <VrButton
            style={{width: 2}}
            onClick={this.handleClick.bind(this)}
          >
            <Text
              style={{
                backgroundColor: this.state.currentScene === LIGHTS_ON ? 'red' : 'darkblue',
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 0.4,
                width: 3,
                layoutOrigin: [0.5, 0.5],
                transform: [
                  {translate: [3, 0, -3]}
                ]}}
            >
              {this.getButtonText()}
            </Text>
          </VrButton> 
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('HelloVR', () => HelloVR);
