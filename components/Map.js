import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, Button } from 'react-native';
import { MapView } from 'expo';


export default class Map extends Component {

   render() {
      const region = {
         latitude: 39.7392,
         longitude: -104.9903,
         latitudeDelta: 0,
         longitudeDelta: 1.0
      }

      // const markers = [{
      //    latitude: this.props.latitude,
      //    longitude: this.prop.longitude,
      //    description: 'My Location',
      //    title: 'Location'
      // }]
      return (
         <View style={styles.container}>
            <MapView
              style={styles.map}
              showsUserLocation
              loadingEnabled
              // initialRegion={region}
              initialRegion={{
                latitude: this.props.latitude,
                longitude: this.props.longitude,
                latitudeDelta: 0,
                longitudeDelta: 1.0
             }}
              showsUserLocation={true}
              rotateEnabled={false}
              toolbarEnabled={false}
              showsMyLocationButton={true}
              showsPointsOfInterest={true}
            >
               <MapView.Marker
                  coordinate={{
                     latitude: 48.852968,
                     longitude: 2.349902
                  }}
                  title={ 'myTitle' }
                  description={ 'myDescription' }
                  pinColor={ 'blue' }
                  onCalloutPress={() => alert('Clicked')}
               >

               </MapView.Marker>
            </MapView>
            <Button
               onPress={this.getMarkers}
               title='Locate me!'
               color='#841584'
            />
         </View>
      )
   }
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1,
      backgroundColor: '#ecf0f1',
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
