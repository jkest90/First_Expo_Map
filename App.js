import React from 'react';
import { Dimensions, Marker, Button, Platform, Text, View, StyleSheet } from 'react-native';
// import Map from './components/Map.js';
import { MapView, Constants, Location, Permissions } from 'expo';

export default class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         location: {
            coords: {
               latitude: 37.78825,
               longitude: -122.4324
            }
         },
         locationResult: null,
         errorMessage: ''
      }
   }
   //
   // componentDidMount() {
   //    this._getLocationAsync();
   // }

   _handleMapRegionChange = mapRegion => {
      this._getLocationAsync();
      // this.setState({ mapRegion });
   }

   _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
         this.setState({
            locationResult: 'Permission to access location was denied',
            location
         });
      }
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location), location });
   }
      // let location = await Location.getCurrentPositionAsync({});
      // this.setState({
      //    latitude: location.coords.latitude,
      //    longitude: location.coords.longitude
      // });
      // this.setState({ location.coords.})


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
         <View style={styles.container}>
            <MapView
              style={styles.map}
              region={{
                 latitude: this.state.location.coords.latitude,
                 longitude: this.state.location.coords.longitude,
                 latitudeDelta: 0.0922,
                 longitudeDelta: 0.0421
              }}
              // onRegionChange={this._handleMapChange}
              showsPointsOfInterest={true}
            >
               <MapView.Marker
                  coordinate={ this.state.location.coords }
                  title={ 'myTitle' }
                  description={ 'myDescription' }
                  pinColor={ 'blue' }
                  onCalloutPress={() => alert('Clicked')}
                  >
               </MapView.Marker>
            </MapView>
            <Button
               onPress={this._handleMapRegionChange}
               styles={styles.button}
               title='Locate me!'
               color='#841584'
            />
         </View>
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
   button: {
      position: 'absolute',
   },
   map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
   },
   paragraph: {
      margin: 24,
      fontSize: 18,
      textAlign: 'center',
   }
});
