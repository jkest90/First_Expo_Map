import React from 'react';
import { Dimensions, Marker, Button, Platform, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
         marker: {
            coords: {
               latitude: '',
               longitude: ''
            }
         },
         locationResult: null,

      }
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
      this.setState({ marker: location });
      console.log('Marker',this.state.marker)
   }

   _handleMapRegionChange = mapRegion => {
      this._getLocationAsync();
   }

   render() {

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
              showsPointsOfInterest={true}
             >
            { (this.state.marker.coords.latitude !== '') ?
               <MapView.Marker
                  coordinate={ this.state.marker.coords }
                  title={ 'My Location' }
                  pinColor={ '#6c5ce7' }
                  >
               </MapView.Marker> :
               <View> </View>
            }
            </MapView>
               <View style={styles.buttonContainer}>
                  <Button
                     onPress={this._handleMapRegionChange}
                     color='#fff'
                     title='FIND MY LOCATION'
                     accessibilityLabel='Find your location!'
                     >
                  </Button>
               </View>
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
   buttonContainer: {
      position: 'absolute',
      bottom: 35,
      padding: 5,
      borderRadius: 7,
      backgroundColor: '#3B5998',
      width: 400,
      shadowOffset: {width: 5, height: 7},
      shadowColor: 'black',
      shadowOpacity: .545,
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
