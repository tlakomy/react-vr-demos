'use strict';

import React from 'react';
import {AppRegistry, asset, CylindricalPanel, VrButton, Pano, Text, Image, View} from 'react-vr';

const panelHeight = 344;
const elementWidth = 260;

const profilePhotos = [
  'alexander_gerasimov.png',
  'alexey_migutsky.png',
  'andrei_vouchanka.png',
  'anna_selezniova.png',
  'asim_hussain.png',
  'tomasz_lakomy.png',
  'egor_malkevich.png',
  'ilja_satchok.png',
  'ivan_jovanovic.png',
  'konstantin_krivlenia.png',
  'marek_piasecki.png',
  'martin_splitt.png',
  'vasiliy_vanchuk.png'
];

class HelloVR extends React.Component {
  createSpeakerPhotos() {
    return profilePhotos.map((photo) => (
        <View style={{ margin: 20, backgroundColor: '#FF7AFB'}}>
          <Image
            style={{
              borderRadius: 20,
              borderWidth: 5,
              width: elementWidth,
              height: panelHeight,
            }}
            source={asset(`profilePics/${photo}`)}
          />
        </View>
    ));
  }

  render() {
    return (
      <View>
      <Pano source={asset('blue.png')} />
      <CylindricalPanel layer={{width: 4096, height: panelHeight + 50, radius: 10}} style={{position: 'absolute'}}>
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
    </View>
    );
  }
}

AppRegistry.registerComponent('HelloVR', () => HelloVR);