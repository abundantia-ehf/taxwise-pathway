
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a2294a1acb504fb19e639ce81108c6cc',
  appName: 'taxwise-pathway',
  webDir: 'dist',
  server: {
    url: 'https://a2294a1a-cb50-4fb1-9e63-9ce81108c6cc.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    captureInput: true
  }
};

export default config;
