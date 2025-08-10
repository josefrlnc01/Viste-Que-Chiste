import { Capacitor } from '@capacitor/core';
import { AdMob } from '@capacitor-community/admob';


export default async function interstitialAdd() {
    
    if (!Capacitor.isNativePlatform()) return;
    
    try {
        await AdMob.initialize({
            requestTrackingAuthorization: true,
            testingDevices: ['EMULATOR'],
            initializeForTesting: true
        });

        await AdMob.prepareInterstitial({
            adId: 'ca-app-pub-3940256099942544/1033173712',
            isTesting: true
        });

        await AdMob.showInterstitial();
    } catch (error) {
        console.error('Error al lanzar el anuncio:', error);
        return;
    }
}