import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Map from './components/Map.js';
import { Constants, Location, Permissions } from 'expo';

export default class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         location: '',
         latitude: '',
         longitude: '',
         errorMessage: '',
      }
   }
   // state = {
   //    location: '',
   //    errorMessage: null,


   componentWillMount() {
      this._getLocationAsync();
      if (Platform.OS === 'android' && !Constants.isDevice) {
         this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device'
         });
      }
   }

   _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
         this.setState({
            errorMessage: 'Permission to access location was denied',
         });
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({
         latitude: location.coords.latitude,
         longitude: location.coords.longitude
      });
      // this.setState({ location.coords.})

   }

   render() {
      // this._getLocationAsync();
      let text = 'Waiting...';
      if (this.state.errorMessage) {
         text = this.state.errorMessage;
      } else if (this.state.location) {
         text = JSON.stringify(this.state.location);
         console.log(this.state.location.coords.latitude);
      }

      // console.log(text);
      return (
         <Map latitude={this.state.latitude} longitude={this.state.longitude} />
    );
  }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
   },
   paragraph: {
      margin: 24,
      fontSize: 18,
      textAlign: 'center',
   }

})
