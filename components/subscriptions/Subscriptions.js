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
            "Setup Error",
            "Failed to initialize in-app purchases. Please try again later."
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
        "Loading Error",
        "Unable to load subscription products. Please check your internet connection and try again."
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
      Alert.alert("Already Subscribed", "You are already subscribed to this plan.");
      return;
    }

    try {
      setLoading(true);
      console.log("Initiating subscription purchase for:", productId);

      await requestSubscription({
        sku: productId,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });

      Alert.alert("Success", "Thank you for your purchase!");
      setSubscribedProducts([...subscribedProducts, productId]);
    } catch (error) {
      console.error("Purchase error:", error);
      Alert.alert("Purchase Failed", `Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderLoadingState = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.loadingText}>Loading amazing offers...</Text>
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
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
  const renderSubscriptions = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Choose Your Perfect Plan</Text>
      <Text style={styles.subheader}>Unlock premium features and exclusive bonuses</Text>

      <View style={styles.cardWrapper}>
      <View style={styles.topSection}>
        <Text style={styles.titleText}>Free Users</Text>
      </View>
      <View style={styles.infoArea}>
        <Text style={styles.descriptionText}>Free users can only access basic features:</Text>
        <View style={styles.featureList}>
          <Text style={styles.benefitItem}>• Limited access to leagues</Text>
          <Text style={styles.benefitItem}>• 3 games a day for see the predicted</Text>
          <Text style={styles.benefitItem}>• Standard customer support</Text>
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
              <Text style={styles.benefitItem}>✓ Unlimited access to all features</Text>
              <Text style={styles.benefitItem}>✓ Priority customer support</Text>
              <Text style={styles.benefitItem}>✓ All the Leagues available</Text>
  
              {subscription.productId.includes('yearly') && (
                <>
                  <Text style={styles.benefitItem}>✓ Save up to 17% compared to monthly</Text>
                  <Text style={styles.benefitItem}>{"\n"}✓ All that has on monthly</Text>
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
                  ? "Subscribed"
                  : loading
                  ? "Processing..."
                  : "Subscribe Now"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noSubscriptionsText}>No subscriptions available</Text>
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

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    scrollContainer: {
      padding: 16,
    },
    header: {
      fontSize: 32,
      fontWeight: 'bold',
      color: COLORS.text,
      textAlign: 'center',
      marginBottom: 12,
    },
    subheader: {
      fontSize: 18,
      color: COLORS.secondaryText,
      textAlign: 'center',
      marginBottom: 32,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 18,
      color: COLORS.secondaryText,
    },
    errorText: {
      color: '#ff6b6b',
      textAlign: 'center',
      marginBottom: 24,
      fontSize: 18,
    },
    retryButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderRadius: 30,
      elevation: 3,
    },
    retryButtonText: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: 'bold',
    },
    subscriptionCard: {
      backgroundColor: COLORS.white,
      borderRadius: 20,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      overflow: 'hidden',
      borderColor: COLORS.primary,
      borderWidth: 2,

    },
    subscribedCard: {
      borderColor: COLORS.primary,
      borderWidth: 2,
    },
    gradientHeader: {
      padding: 24,
      backgroundColor: COLORS.primary,
    },
    subscriptionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.white,
      marginBottom: 8,
    },
    subscriptionPrice: {
      fontSize: 20,
      color: COLORS.white,
    },
    benefitsContainer: {
      padding: 24,
    },
    benefitItem: {
      fontSize: 16,
      color: COLORS.text,
      marginBottom: 12,
      paddingLeft: 8,
      borderLeftWidth: 2,
      borderLeftColor: COLORS.primary,
    },
    subscribeButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 16,
      alignItems: 'center',
      marginHorizontal: 24,
      marginBottom: 24,
      borderRadius: 12,
      elevation: 2,
    },
    subscribedButton: {
      backgroundColor: '#4CAF50',
    },
    buttonText: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: 'bold',
    },
    noSubscriptionsText: {
      fontSize: 18,
      textAlign: 'center',
      color: COLORS.secondaryText,
      marginTop: 24,
    },
    cardWrapper: {
      backgroundColor: COLORS.white,
      borderRadius: 20,
      overflow: 'hidden',
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      marginBottom: 24,
      borderColor: COLORS.primary,
      borderWidth: 2,
    },
    topSection: {
      backgroundColor: COLORS.primary,
      padding: 20,
    },
    titleText: {
      color: COLORS.white,
      fontSize: 26,
      fontWeight: 'bold',
    },
    infoArea: {
      padding: 20,
      backgroundColor: COLORS.background,
    },
    descriptionText: {
      color: COLORS.text,
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
    },
    featureList: {
      marginTop: 12,
    },

  });
  
  export default Subscriptions;