'use strict';

import React from 'react';
import {AppRegistry, Animated, asset, CylindricalPanel, VrButton, Pano, Text, Image, View} from 'react-vr';

const panelHeight = 344;
const elementWidth = 260;

const profilePhotos = [
  'Alexander_Gerasimov.png',
  'Alexey_Migutsky.png',
  'Andrei_Vouchanka.png',
  'Anna_Selezniova.png',
  'Asim_Hussain.png',
  'Tomasz_Lakomy.png',
  'Egor_Malkevich.png',
  'Ilja_Satchok.png',
  'Ivan_Jovanovic.png',
  'Konstantin_Krivlenia.png',
  'Marek_Piasecki.png',
  'Martin_Splitt.png',
  'Vasiliy_Vanchuk.png'
];

class HelloVR extends React.Component {
  constructor() {
    super();
    this.state = {
      hoveredPhoto: 0,
      activeSpeaker: null
    };
  }

  hover(index) {
    this.setState({
      hoveredPhoto: index
    })
  }

  selectSpeaker(index) {
    this.setState({
      activeSpeaker: index
    });
  }

  createSpeakerPhotos() {
    return profilePhotos
      .filter((photo, index) => 
        this.state.activeSpeaker ? this.state.activeSpeaker === index : true
      )
      .map((photo, index) => {
        let transform;
        if (this.state.activeSpeaker) {
          transform = [
            {translate: [0, 0, -3]}
          ]
        } else {
          transform = [
            {scale: this.state.hoveredPhoto === index ? 1.2 : 1}
          ]
        }
        
        return <Animated.View 
          key={"key" + index}
          style={{ 
            margin: 20, 
            backgroundColor: '#FF7AFB',
            transform: transform
          }}
          onEnter={this.hover.bind(this, index)}
        >
          <VrButton onClick={this.selectSpeaker.bind(this, index)}>
            <Image
              style={{
                borderRadius: 20,
                borderWidth: 5,
                width: elementWidth,
                height: panelHeight
              }}
              source={asset(`profilePics/${photo}`)}
            />  
          </VrButton>
        </Animated.View>
    })
  }

  getSpeakerBio() {
    return this.state.activeSpeaker ? 
      <Text
        style={{
          backgroundColor: '#38DBFF',
          fontSize: 0.4,
          fontWeight: '400',
          layoutOrigin: [0.5, 0.5],
          paddingLeft: 0.2,
          paddingRight: 0.2,
          textAlign: 'center',
          textAlignVertical: 'center',
          transform: [{translate: [0, 2.5, -3]}],
        }}>
        {profilePhotos[this.state.activeSpeaker].split(".")[0].split("_").join(" ")}
      </Text> : null;
  }

  render() {
    return (
      <View>
      <Pano source={asset('blue.png')} />
      <Text
        style={{
          backgroundColor: '#38DBFF',
          fontSize: 0.8,
          fontWeight: '400',
          layoutOrigin: [0.5, 0.5],
          paddingLeft: 0.2,
          paddingRight: 0.2,
          textAlign: 'center',
          textAlignVertical: 'center',
          transform: [{translate: [0, 2.5, -3]}],
        }}>
        Speakers
      </Text>
      <CylindricalPanel 
        layer={{width: this.state.activeSpeaker ? 300 : 4096, paddingTop: 20, height: panelHeight + 100, radius: 10}} 
        style={{position: 'absolute'}}
      >
        <View
          style={{
            opacity: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {this.createSpeakerPhotos()}
        </View>
      </CylindricalPanel>
      {this.getSpeakerBio()}
    </View>
    );
  }
}

AppRegistry.registerComponent('HelloVR', () => HelloVR);