import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  increment, 
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// User profile related functions
export const createUserProfile = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...userData,
      createdAt: serverTimestamp(),
      recycledDevices: 0,
      totalPoints: 0,
      co2Saved: 0,
      materialsSaved: {
        copper: 0,
        gold: 0,
        plastic: 0,
        aluminum: 0
      }
    });
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return false;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No user profile found');
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

// Collection points related functions
export const getCollectionPoints = async (userLocation) => {
  try {
    // If we have user location, we could query by proximity
    // For simplicity, we're getting all collection points
    const q = query(collection(db, 'collectionPoints'));
    const querySnapshot = await getDocs(q);
    
    const points = [];
    querySnapshot.forEach((doc) => {
      points.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return points;
  } catch (error) {
    console.error('Error getting collection points:', error);
    return [
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
  }
};

// Recycling activities related functions
export const recordRecyclingActivity = async (userId, deviceData) => {
  try {
    // Add the recycling activity
    const activityRef = collection(db, 'recyclingActivities');
    await addDoc(activityRef, {
      userId,
      deviceType: deviceData.type,
      components: deviceData.components,
      materials: deviceData.materials,
      points: deviceData.points,
      co2Saved: deviceData.co2Saved,
      timestamp: serverTimestamp()
    });
    
    // Update user profile with new statistics
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      recycledDevices: increment(1),
      totalPoints: increment(deviceData.points),
      co2Saved: increment(deviceData.co2Saved),
      'materialsSaved.copper': increment(deviceData.materials.copper || 0),
      'materialsSaved.gold': increment(deviceData.materials.gold || 0),
      'materialsSaved.plastic': increment(deviceData.materials.plastic || 0),
      'materialsSaved.aluminum': increment(deviceData.materials.aluminum || 0)
    });
    
    return true;
  } catch (error) {
    console.error('Error recording recycling activity:', error);
    return false;
  }
};

// Get user recycling history
export const getUserRecyclingHistory = async (userId) => {
  try {
    const q = query(
      collection(db, 'recyclingActivities'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const activities = [];
    querySnapshot.forEach((doc) => {
      activities.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return activities;
  } catch (error) {
    console.error('Error getting user recycling history:', error);
    return [];
  }
};