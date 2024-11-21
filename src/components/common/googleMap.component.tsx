import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {containerStyles} from '../../styles/container.styles';
import {checkPermission} from '../../utilities/check-permissions.utility';
import {PermissionEnum} from '../../interfaces/permissions.interface';
import {NotifyUserPermissionModal} from './notifyUserPermissionModal.component';
import Geolocation from '@react-native-community/geolocation';
import {Image} from 'react-native-elements';

export interface IMarkerCoordinates {
  latitude: number;
  longitude: number;
}

export interface IInitialRegion extends IMarkerCoordinates {
  latitudeDelta: number;
  longitudeDelta: number;
}

interface IGoogleMap {
  marker?: IMarkerCoordinates | null;
  setMarker?: (marker: IMarkerCoordinates | null) => void | undefined;
  onEdit?: boolean;
}

export const GoogleMap = ({marker, setMarker, onEdit = true}: IGoogleMap) => {
  const [myLocation, setMyLocation] = useState<IMarkerCoordinates | null>(null);
  const [permissionModalOpen, setPermissionModalopen] =
    useState<boolean>(false);

  useEffect(() => {
    async function setLocation() {
      const permissionResponse = await checkPermission(
        PermissionEnum.ACCESS_FINE_LOCATION,
      );
      if (permissionResponse) {
        Geolocation.getCurrentPosition(
          position => {
            if (position && position.coords) {
              setMyLocation({
                latitude: +position.coords.latitude,
                longitude: +position.coords.longitude,
              });
            } else {
              console.error('\n\nCoords are null or undefined.\n\n');
            }
          },
          error => {
            console.error('Error getting location:', error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 30000,
            // maximumAge: 1000,
          },
        );
      } else {
        setPermissionModalopen(true);
      }
    }

    setLocation();
  }, []);

  // Animation for map traveling to a place
  const mapRef = useRef<MapView | null>(null);
  useEffect(() => {
    if (marker && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...marker,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        },
        1000,
      );
    }
  }, []);

  return (
    <View style={containerStyles.mapContainer}>
      <MapView
        ref={mapRef}
        style={styles.mapStyle}
        initialRegion={
          !marker
            ? {
                // Medallo by default
                latitude: 6.25089,
                longitude: -75.574628,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }
            : !myLocation
            ? {
                ...marker,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }
            : {
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }
        }
        customMapStyle={mapStyle}
        onPress={e =>
          typeof setMarker !== 'undefined' && onEdit
            ? setMarker(e.nativeEvent.coordinate)
            : null
        }>
        {marker && (
          <Marker
            draggable
            coordinate={marker}
            title={'Current location'}
            description={"This is the contact's current location"}
          />
        )}
        {myLocation && (
          <Marker
            draggable
            coordinate={myLocation}
            title={'Current location'}
            description={"This is the contact's current location"}
          />
          // <Marker
          //   draggable
          //   coordinate={myLocation}
          //   title={'Your location'}
          //   description={'This is your current location'}>
          //   <View style={markerStyles.markerContainer}>
          //     <Image
          //       source={require('../../assets/img/current-location.png')}
          //       style={markerStyles.markerImage}
          //       resizeMode="contain"
          //     />
          //   </View>
          // </Marker>
        )}
      </MapView>
      {permissionModalOpen && (
        <NotifyUserPermissionModal
          modalOpen={permissionModalOpen}
          setModalopen={setPermissionModalopen}
          message={
            'Please enable the app permissions from the settings to be able to see your location'
          }
        />
      )}
    </View>
  );
};

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];

const styles = StyleSheet.create({
  mapStyle: {
    ...StyleSheet.absoluteFillObject, // Makes the map fill the container completely
  },
});

const markerStyles = StyleSheet.create({
  markerContainer: {
    width: 500000, // Set the desired width of the container
    height: 500000, // Set the desired height of the container
    alignItems: 'center', // FlexAlignType expects specific values
    justifyContent: 'center', // FlexAlignType expects specific values
  },
  markerImage: {
    width: '100%', // Adjust image size relative to the container
    height: '100%',
  },
});
