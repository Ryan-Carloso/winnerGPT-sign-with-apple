import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import {
  initConnection,
  requestSubscription,
  useIAP,
  getProducts,
  endConnection,
} from "react-native-iap";

import { styles } from "./styles";
import { useLanguage } from '../globalize/context';

const COLORS = {
    primary: '#1E88E5',
    white: '#FFFFFF',
    background: '#F8FAFF',
    text: '#333333',
    secondaryText: '#666666',
  }


const { width } = Dimensions.get('window');

const ITUNES_SHARED_SECRET = "c3b2572aaae84d9c8ca0b06b782db96e";

const subscriptionSkus = Platform.select({
  ios: ["rc499mo", "rc1999yearly"],
  android: ["androidTestSku"],
});

export const Subscriptions = ({ navigation }) => {
  const {
    connected,
    subscriptions,
    getSubscriptions,
    currentPurchase,
    finishTransaction,
    getPurchaseHistory,
  } = useIAP();

  const [loading, setLoading] = useState(false);
  const { translate } = useLanguage();
  const [error, setError] = useState(null);
  const [connectionEstablished, setConnectionEstablished] = useState(false);
  const [availableSubscriptions, setAvailableSubscriptions] = useState([]);
  const [subscribedProducts, setSubscribedProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const setupIAP = async () => {
      try {

        await endConnection();

        const result = await initConnection();
        console.log("IAP Connection initialized:", result);

        if (isMounted) {
          setConnectionEstablished(true);

        }
      } catch (error) {
        console.error("IAP setup failed:", error);
        if (isMounted) {
          setError(`IAP initialization failed: ${error.message || 'Unknown error'}`);
          Alert.alert(
            translate('setupErrorTitle'),
            translate('setupErrorMessage')
          );
        }
      }
    };

    setupIAP();

    return () => {
      isMounted = false;
      endConnection();
    };
  }, []);

  const fetchSubscriptions = async () => {
    if (!connectionEstablished) {
      return;
    }

    try {
      setLoading(true);

      const products = await getProducts({ skus: subscriptionSkus });
      console.log("Available products:", products);

      if (!products || products.length === 0) {
        console.log("No products found for SKUs:", subscriptionSkus);
        throw new Error("No products available for purchase");
      }

      const validSubscriptions = products.filter(
        (product) => product.type === "subs"
      );

      if (validSubscriptions.length === 0) {
        throw new Error("No subscription products available");
      }

      setAvailableSubscriptions(validSubscriptions);
      
      // Simulating subscribed products for demonstration
      setSubscribedProducts([validSubscriptions[0].productId]);
    } catch (error) {
      console.error("Subscription fetch error:", error);
      setError(`Failed to load subscriptions: ${error.message || 'Unknown error'}`);
      Alert.alert(
        translate('setupErrorTitle'),
        translate('setupErrorMessage')
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connectionEstablished && connected) {
      fetchSubscriptions();
    }
  }, [connectionEstablished, connected]);

  const handleSubscription = async (productId) => {
    if (subscribedProducts.includes(productId)) {
      Alert.alert(translate('alreadySubscribedTitle'),translate('alreadySubscribedMessage'),);
      return;
    }

    try {
      setLoading(true);

      await requestSubscription({
        sku: productId,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });

      Alert.alert(translate('successMessage'));
      setSubscribedProducts([...subscribedProducts, productId]);
    } catch (error) {
      console.error("Purchase error:", error);
      Alert.alert(translate('purchaseFailedTitle'),
      translate`('purchaseFailedMessage')  ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderLoadingState = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.loadingText}>{translate('loadingText')}</Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => {
          setError(null);
          fetchSubscriptions();
        }}
      >
        <Text style={styles.retryButtonText}>{translate('retryButtonText')}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderSubscriptions = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>{translate('choosePlan')}</Text>
      <Text style={styles.subheader}>{translate('unlockFeatures')}</Text>

      <View style={styles.cardWrapper}>
      <View style={styles.topSection}>
        <Text style={styles.titleText}>{translate('freeUsers')}</Text>
      </View>
      <View style={styles.infoArea}>
        <Text style={styles.descriptionText}>{translate('freeDescription')}</Text>
        <View style={styles.featureList}>
          <Text style={styles.benefitItem}>{translate('limitedLeagues')}</Text>
          <Text style={styles.benefitItem}>{translate('threeGames')}</Text>
        </View>
      </View>
    </View>
      
      {availableSubscriptions && availableSubscriptions.length > 0 ? (
        availableSubscriptions.map((subscription, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSubscription(subscription.productId)}
            style={[
              styles.subscriptionCard,
              subscribedProducts.includes(subscription.productId) && styles.subscribedCard
            ]}
          >
            <View style={styles.gradientHeader}>
              <Text style={styles.subscriptionTitle}>{subscription.title}</Text>
              <Text style={styles.subscriptionPrice}>{subscription.localizedPrice}</Text>
            </View>
            <View style={styles.benefitsContainer}>
              <Text style={styles.benefitItem}>{translate('unlimitedFeatures')}</Text>
              <Text style={styles.benefitItem}>{translate('prioritySupport')}</Text>
              <Text style={styles.benefitItem}>{translate('allLeagues')}</Text>
  
              {subscription.productId.includes('yearly') && (
                <>
              <Text style={styles.benefitItem}>{translate('save17')}</Text>
              <Text style={styles.benefitItem}>{translate('allMonthly')}</Text>
                </>
              )}
            </View>
            <TouchableOpacity
              style={[
                styles.subscribeButton,
                subscribedProducts.includes(subscription.productId) && styles.subscribedButton
              ]}
              onPress={() => handleSubscription(subscription.productId)}
              disabled={loading || subscribedProducts.includes(subscription.productId)}
            >
              <Text style={styles.buttonText}>
                {subscribedProducts.includes(subscription.productId)
                  ? translate('subscribed')
                  : loading
                  ? "Processing..."
                  : translate('subscribeNow')}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noSubscriptionsText}>{translate('noSubscriptionsAvailable')}</Text>
      )}
  
      
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? renderLoadingState() :
       error ? renderError() :
       renderSubscriptions()}
    </SafeAreaView>
  );
};


  
  export default Subscriptions;