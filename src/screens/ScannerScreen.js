import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { COLORS } from '../constants/theme';
import ActionButton from '../components/ActionButton';

const ScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    // In a real implementation, you would validate the scanned data
    // against your database of known electronic devices
    
    // For demo purposes, simulate a successful scan
    try {
      const deviceData = JSON.parse(data);
      navigation.navigate('DeviceDetail', { deviceData });
    } catch (error) {
      // If it's not valid JSON, assume it's a barcode/QR code with a device ID
      navigation.navigate('DeviceDetail', { 
        deviceId: data,
        deviceType: 'Unknown Device',
        scanType: type 
      });
    }
  };

  const toggleFlash = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  const manuallyEnterDetails = () => {
    navigation.navigate('ManualEntry');
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>Requesting camera permission...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>No access to camera</Text>
          <ActionButton 
            title="Enter Device Manually" 
            onPress={manuallyEnterDetails}
            style={styles.manualButton} 
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          flashMode={flashMode}
          barCodeScannerSettings={{
            barCodeTypes: [
              BarCodeScanner.Constants.BarCodeType.qr,
              BarCodeScanner.Constants.BarCodeType.code128,
              BarCodeScanner.Constants.BarCodeType.ean13,
            ],
          }}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.overlay}>
            <View style={styles.upperSection}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.flashButton}
                onPress={toggleFlash}
              >
                <Text style={styles.flashButtonText}>
                  {flashMode === Camera.Constants.FlashMode.off ? '🔦' : '💡'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.scanFrame} />
            
            <View style={styles.bottomSection}>
              <Text style={styles.scanText}>
                Scan the barcode on the electronic device
              </Text>
              {scanned && (
                <ActionButton
                  title="Scan Again"
                  onPress={() => setScanned(false)}
                  style={styles.scanAgainButton}
                />
              )}
              <ActionButton
                title="Enter Manually"
                onPress={manuallyEnterDetails}
                primary={false}
                style={styles.manualButton}
              />
            </View>
          </View>
        </Camera>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    color: COLORS.text,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
  },
  upperSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
  flashButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashButtonText: {
    fontSize: 20,
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  bottomSection: {
    padding: 20,
    alignItems: 'center',
  },
  scanText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  scanAgainButton: {
    marginBottom: 10,
  },
  manualButton: {
    marginTop: 10,
  },
});

export default ScannerScreen;