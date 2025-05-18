import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import { getCollectionPoints } from '../services/database';

const MapScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's current location
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchCollectionPoints({ latitude, longitude });
      },
      error => {
        setError(error.message);
        setLoading(false);
        // Default to Zapopan, Jalisco if unable to get user location
        fetchCollectionPoints({ latitude: 20.7214, longitude: -103.3869 });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const fetchCollectionPoints = async (location) => {
    try {
      const points = await getCollectionPoints(location);
      setCollectionPoints(points);
    } catch (error) {
      setError('Error fetching collection points');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Collection Points"
          leftIcon="←"
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Finding collection points near you...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show some example collection points if API returns none
  const displayPoints = collectionPoints.length > 0 ? collectionPoints : [
    {
      id: '1',
      name: 'ElecCycle Main Center',
      address: 'Av. Vallarta 3233, Zapopan',
      location: { latitude: 20.6786, longitude: -103.3854 }
    },
    {
      id: '2',
      name: 'Tech Recycling Hub',
      address: 'Av. Patria 1501, Zapopan',
      location: { latitude: 20.7018, longitude: -103.4103 }
    },
    {
      id: '3',
      name: 'E-Waste Drop-off Point',
      address: 'Av. Tepeyac 1200, Zapopan',
      location: { latitude: 20.6512, longitude: -103.4055 }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Collection Points"
        leftIcon="←"
        onLeftPress={() => navigation.goBack()}
      />
      
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: userLocation?.latitude || 20.7214, // Default to Zapopan
            longitude: userLocation?.longitude || -103.3869,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title="Your Location"
              description="You are here"
              pinColor="blue"
            />
          )}
          
          {displayPoints.map((point) => (
            <Marker
              key={point.id}
              coordinate={point.location}
              title={point.name}
              description={point.address}
              pinColor={COLORS.primary}
            />
          ))}
        </MapView>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Nearby Collection Points</Text>
        <Text style={styles.infoText}>
          {displayPoints.length} collection points found in your area. Tap on markers to see details.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.text,
    marginTop: 12,
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: COLORS.card,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  infoText: {
    color: COLORS.text,
    opacity: 0.7,
  },
});

export default MapScreen;