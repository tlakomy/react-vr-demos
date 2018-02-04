'use strict';

import React from 'react';
import {AppRegistry, Animated, asset, CylindricalPanel, VrButton, Pano, Text, Image, View, VideoPano} from 'react-vr';

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

const bios = [
  "Alex is employed as a front-end engineer at Wix.com, earning just enough to sustain his functional programming addiction. In his spare time he teaches programming and creates educational games with his hacker friends.",
  "Alexey works as a Senior Software Development Engineer at Microsoft Berlin building Microsoft To-Do web app. He is coaching fellow programmers, mastering the craft and trolling in twitter as a hobby. Occasionally blogging at http://mtdv.io. Made in Belarus. Lives in Berlin. Was involved in organizing OdessaJS.",
  "Andrei Vouchanka, the Software developer at EPAM Systems. Passioned about front-end development, bleeding edge web-technologies, js performance, public speaking and knowledge sharing. Constantly experimenting with new stuff, messing around with pet projects for fun",
  "Frontend developer @ Evil Martians, speaker, co-organiser and regular attendee of frontend meetups and conferences. Free hugs.",
  "I'm a developer, trainer, author and speaker with over 16 years experience working for organisations such as the European Space Agency, Google and now Microsoft, where I am a Senior Cloud Developer Advocate.",
  "Tomasz is a Software Engineer at Egnyte Poland. Co-organiser of React Poznań Meetup, JavaScript tinkerer who enjoys sharing his knowledge with other developers. His interests include VR, AR, React, app performance and making cheesiest jokes known to mankind.",
  "Egor Malkevich, the self-taught specialist from Minsk, it’s long story how I went down to the IT. Mine roadmap wasn’t row. Started doing small sites and games, increased to consulting, designing microservices ecosystem and frameworks for company usages in a wide range of internal products. And now I am the active member of local developers community, participate in hackathons and meet-ups. Also participated in several startups, extend my communication and networking skills.",
  "Developer at Viber. Interested in mobile technologies powered by JS. Loves React and music!",
  "Ivan is the senior software engineer currently working at Welltok. He had been working for more than 8 years for many international companies, like Cloud Horizon, Pathable, Clevertech, Thinkful etc. His focus is on building scalable JS applications and experimenting with new languages and frameworks. He is into functional and reactive programming. Leading teams and mentoring junior developers is his everyday duty. He loves to share knowledge and to write on his tech blog.",
  "Konstantin Krivlenia is the lead developer at Targetprocess. He is the maintainer of tauCharts.",
  "Freelance Full Stack Senior Polyglot Developer. (Currently) Rome, Italy. I do web technologies since 2000. I worked for successful startups, huge corporations, banks and government organisations. Travelling a lot and visiting conferences. Single page applications I do for 5 years already (React 3 years). My message is - world is deterministic, people are good, there is no time.",
  "Martin is open source contributor and web evangelist by heart from Zurich with a decade experience from the trenches of software engineering in multiple fields. He works as a software engineer at Archilogic in front- and backend. He devotes his time to moving the web forward, fixing problems, building applications and systems and breaking things for fun & profit. Martin believes in the web platform and is working with bleeding edge technologies that will allow the web to prosper.",
  "Vasiliy Vanchuk, Team Lead in DevHub company. Managed to quit backend development and learn to love JavaScript. Believes that it's better to work harder on tests for your app than having hard working application."
];

class HelloVR extends React.Component {
  constructor() {
    super();
    this.state = {
      hoveredPhoto: 0,
      activeSpeaker: null,
      backgroundVideo: false
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
      <View>
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
        </Text>  
        <Text
          style={{
            backgroundColor: '#38DBFF',
            fontSize: 0.2,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            width: 3,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [2.5, 1, -3]}],
          }}>
          {bios[this.state.activeSpeaker]}
        </Text>
      </View>
       : null;
  }

  getChangeBackgroundButton() {
    return this.state.activeSpeaker ? 
      <VrButton
        style={{width: 2}}
        onClick={() => { this.setState({backgroundVideo: true})} }
      >
        <Text
          style={{
            backgroundColor: '#F5F64D',
            color: 'black',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 0.4,
            width: 3,
            layoutOrigin: [0.5, 0.5],
            transform: [
              {translate: [5, 0, -3]},
              {rotateY: -40}
            ]}}
        >
          What's up with the static background?
        </Text>
      </VrButton> : null;
  }

  render() {
    return (
      <View>
      {this.state.backgroundVideo ? <VideoPano source={asset('puppies.mp4')} muted={true} /> : <Pano source={asset('blue.png')} />}
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
          transform: [{translate: [0, 2, -3]}],
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
      {this.getChangeBackgroundButton()}
    </View>
    );
  }
}

AppRegistry.registerComponent('HelloVR', () => HelloVR);