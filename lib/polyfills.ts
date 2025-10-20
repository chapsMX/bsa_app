// lib/polyfills.ts
// Polyfills for browser compatibility with MetaMask SDK

if (typeof window !== 'undefined') {
  // Mock @react-native-async-storage/async-storage for browser use
  if (!globalThis.localStorage) {
    console.warn('localStorage not available');
  }
}

export {};
