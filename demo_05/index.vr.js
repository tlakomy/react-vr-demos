import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  LiveEnvCamera,
  VrButton,
  View,
} from 'react-vr';

const INTRODUCTION = "introduction";
const LIVEENVCAMERA = "liveenvcamera";
const AUDIENCE = "audience";
const THANK_YOU = "thankYou";

export default class HelloVR extends React.Component {
  constructor() {
    super();
    this.state = {
      currentScene: INTRODUCTION
    };
  }

  handleClick() {
    switch (this.state.currentScene) {
      case INTRODUCTION:
        this.setState({currentScene: LIVEENVCAMERA});
        break;
      case LIVEENVCAMERA:
        this.setState({currentScene: AUDIENCE});
        break;
      case AUDIENCE:
      this.setState({currentScene: THANK_YOU});
        break;
    }
  }

  getBackgroundView() {
    let backGroundView;
    switch (this.state.currentScene) {
      case INTRODUCTION:
        backGroundView = <Pano source={asset('stars.png')} />;
        break;
      case LIVEENVCAMERA:
        backGroundView = <Pano source={asset('stars.png')} />;
        break;
      case AUDIENCE:
        backGroundView = <LiveEnvCamera />;
        break;
      case THANK_YOU:
        backGroundView = <LiveEnvCamera />;
        break;
    }

    return backGroundView;
  }

  getButtonText() {
    let buttonText;
    switch (this.state.currentScene) {
      case INTRODUCTION:
        buttonText = "What if I wanted to see what's around me?";
        break;
      case LIVEENVCAMERA:
        buttonText = "<LiveEnvCamera/> is your friend";
        break;
      case AUDIENCE:
        buttonText = "React Day Verona 2017!"
        break;
      case THANK_YOU:
        buttonText = "Thank you for your attention!"
        break;
    }

    return buttonText;
  }

  render() {
    return (
      <View>
        {this.getBackgroundView()}
        <View>
          <VrButton
            style={{width: 2}}
            onClick={this.handleClick.bind(this)}
          >
            <Text
              style={{
                backgroundColor: '#1C77B9',
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 0.3,
                width: 3,
                layoutOrigin: [0.5, 0.5],
                transform: [
                  {translate: [0, 0, -3]}
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
