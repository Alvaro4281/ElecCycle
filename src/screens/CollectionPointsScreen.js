import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking
} from 'react-native';
import * as Location from 'expo-location';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import { getCollectionPoints } from '../services/database';

const CollectionPointsScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        // Still fetch collection points without location data
        fetchCollectionPoints();
        return;
      }

      try {
        // Get user's current location
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
        fetchCollectionPoints({ latitude, longitude });
      } catch (err) {
        setError('Could not get your location');
        setLoading(false);
        // Fetch collection points without location data
        fetchCollectionPoints();
      }
    })();
  }, []);

  const fetchCollectionPoints = async (location) => {
    try {
      const points = await getCollectionPoints(location);
      
      // If we have location, sort by distance
      if (location && points.length > 0) {
        const pointsWithDistance = points.map(point => ({
          ...point,
          distance: calculateDistance(
            location.latitude,
            location.longitude,
            point.location.latitude,
            point.location.longitude
          )
        }));
        
        pointsWithDistance.sort((a, b) => a.distance - b.distance);
        setCollectionPoints(pointsWithDistance);
      } else {
        setCollectionPoints(points);
      }
    } catch (error) {
      setError('Error fetching collection points');
      console.error(error);
      
      // Use mock data if API fails
      const mockPoints = [
        {
          id: '1',
          name: 'ElecCycle Main Center',
          address: 'Av. Vallarta 3233, Zapopan',
          location: { latitude: 20.6786, longitude: -103.3854 },
          operatingHours: 'Mon-Fri: 9am-6pm, Sat: 10am-2pm',
          contactInfo: '+52 33 1234 5678'
        },
        {
          id: '2',
          name: 'Tech Recycling Hub',
          address: 'Av. Patria 1501, Zapopan',
          location: { latitude: 20.7018, longitude: -103.4103 },
          operatingHours: 'Mon-Fri: 10am-7pm',
          contactInfo: '+52 33 9876 5432'
        },
        {
          id: '3',
          name: 'E-Waste Drop-off Point',
          address: 'Av. Tepeyac 1200, Zapopan',
          location: { latitude: 20.6512, longitude: -103.4055 },
          operatingHours: 'Mon-Sat: 9am-5pm',
          contactInfo: '+52 33 5555 1234'
        }
      ];
      
      if (location) {
        mockPoints.forEach(point => {
          point.distance = calculateDistance(
            location.latitude,
            location.longitude,
            point.location.latitude,
            point.location.longitude
          );
        });
        mockPoints.sort((a, b) => a.distance - b.distance);
      }
      
      setCollectionPoints(mockPoints);
    } finally {
      setLoading(false);
    }
  };

  // Calculate distance between two coordinates in kilometers
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };
  
  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  // Open directions in the user's maps app
  const openDirections = (point) => {
    const { latitude, longitude } = point.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  // Call phone number
  const callCollectionPoint = (phoneNumber) => {
    if (!phoneNumber) return;
    
    // Remove any non-numeric characters from the phone number
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
    
    if (cleanNumber) {
      Linking.openURL(`tel:${cleanNumber}`);
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

  const renderCollectionPoint = ({ item }) => (
    <View style={styles.pointCard}>
      <View style={styles.pointHeader}>
        <Text style={styles.pointName}>{item.name}</Text>
        {item.distance && (
          <Text style={styles.pointDistance}>{item.distance.toFixed(1)} km</Text>
        )}
      </View>
      
      <Text style={styles.pointAddress}>{item.address}</Text>
      
      <View style={styles.pointDetails}>
        <Text style={styles.pointInfo}>
          <Text style={styles.pointLabel}>Hours: </Text>
          {item.operatingHours || 'Not available'}
        </Text>
        <Text style={styles.pointInfo}>
          <Text style={styles.pointLabel}>Contact: </Text>
          <Text 
            style={[styles.pointContact, item.contactInfo ? styles.pointContactActive : {}]}
            onPress={() => item.contactInfo ? callCollectionPoint(item.contactInfo) : null}
          >
            {item.contactInfo || 'Not available'}
          </Text>
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.directionsButton}
        onPress={() => openDirections(item)}
      >
        <Text style={styles.directionsButtonText}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Collection Points"
        leftIcon="←"
        onLeftPress={() => navigation.goBack()}
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>
            {userLocation ? 'Nearby Collection Points' : 'Available Collection Points'}
          </Text>
          <Text style={styles.infoText}>
            {collectionPoints.length} collection points found
            {userLocation ? ' in your area' : ''}. 
            Tap "Get Directions" to navigate to a location.
          </Text>
        </View>
        
        {collectionPoints.length > 0 ? (
          <FlatList
            data={collectionPoints}
            renderItem={renderCollectionPoint}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.noPointsContainer}>
            <Text style={styles.noPointsText}>No collection points found.</Text>
            <Text style={styles.noPointsSubtext}>Please check back later or try a different location.</Text>
          </View>
        )}
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
  contentContainer: {
    flex: 1,
  },
  infoBox: {
    backgroundColor: COLORS.card,
    padding: 16,
    margin: 16,
    borderRadius: 8,
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
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  pointCard: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  pointHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pointName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  pointDistance: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  pointAddress: {
    color: COLORS.text,
    marginBottom: 12,
  },
  pointDetails: {
    marginBottom: 16,
  },
  pointInfo: {
    color: COLORS.text,
    opacity: 0.7,
    marginBottom: 4,
  },
  pointLabel: {
    fontWeight: 'bold',
    opacity: 1,
  },
  pointContact: {
    opacity: 0.7,
  },
  pointContactActive: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  directionsButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  directionsButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  noPointsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noPointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  noPointsSubtext: {
    color: COLORS.text,
    opacity: 0.7,
    textAlign: 'center',
  },
});

export default CollectionPointsScreen;