import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, increment, arrayUnion, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../config/firebase';

const db = getFirestore();

// User profile related functions
export const createUserProfile = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...userData,
      createdAt: new Date(),
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
    return [];
  }
};

// Recycling activities related functions
export const recordRecyclingActivity = async (userId, deviceData) => {
  try {
    // Add the recycling activity
    const activityRef = doc(collection(db, 'recyclingActivities'));
    await setDoc(activityRef, {
      userId,
      deviceType: deviceData.type,
      components: deviceData.components,
      materials: deviceData.materials,
      points: deviceData.points,
      co2Saved: deviceData.co2Saved,
      timestamp: new Date()
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
    const q = query(collection(db, 'recyclingActivities'), where('userId', '==', userId));
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