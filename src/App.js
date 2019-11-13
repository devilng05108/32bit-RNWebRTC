import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
    };
  }

  componentDidMount() {
    this.getMedia();
  }

  render() {
    return (
      <View style={{flex:1,width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Text> webRTC demo</Text>
        <Text>{this.state.stream}</Text>
        <RTCView streamURL={this.state.stream} style={{height: 500,width:700,}}/>
      </View>
    );
  }

  //functions
  getMedia = () => {
    let vgaConstraints = {
      audio:true,
      video: {width: {exact: 640}, height: {exact: 480}},
    };
    mediaDevices
      .getUserMedia(vgaConstraints)
      .then(stream => {
        console.log(stream.toURL());
        this.setState({
          stream: stream.toURL(),
        })
      })
      .catch(error => {
        console.log('error');
      });
  };
}
