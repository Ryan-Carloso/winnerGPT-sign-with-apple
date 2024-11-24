// revenuecat.js
import Purchases from 'react-native-purchases';
// Configura o RevenueCat
export const configureRevenueCat = () => {
    console.log("Configuring RevenueCat...");
    const apiKey = 'appl_ikEEEKRDFezvbouAhLabOTQjNWM';
    console.log("Using API Key: ", apiKey);
    Purchases.configure({ apiKey });
    console.log("RevenueCat configured.");
  };
  
  export const getOfferings = async () => {
    console.log("Getting offerings...");
    try {
      const offerings = await Purchases.getOfferings();
      console.log("Offerings received:", offerings);
      if (offerings.current !== null) {
        return offerings.current.availablePackages;
      } else {
        console.log("No offerings available.");
        return [];
      }
    } catch (e) {
      console.error("Error getting offerings:", e);
      return [];
    }
  };
  
  export const purchasePackage = async (packageToPurchase) => {
    console.log("Initiating purchase for package:", packageToPurchase);
    try {
      const purchaseMade = await Purchases.purchasePackage(packageToPurchase);
      console.log("Purchase successful:", purchaseMade);
      return purchaseMade;
    } catch (e) {
      console.error("Error during purchase:", e);
      return null;
    }
  };
  
  export const checkSubscriptionStatus = async () => {
    console.log("Checking subscription status...");
    try {
      const purchaserInfo = await Purchases.getPurchaserInfo();
      console.log("Purchaser info:", purchaserInfo);
      const isActive = purchaserInfo.entitlements.active;
      console.log("Active entitlements:", isActive);
      if (isActive) {
        return isActive;
      } else {
        console.log("No active subscriptions.");
        return null;
      }
    } catch (e) {
      console.error("Error checking subscription status:", e);
      return null;
    }
  };