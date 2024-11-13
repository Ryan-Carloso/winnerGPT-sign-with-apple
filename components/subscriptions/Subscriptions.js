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
      console.log("Connection not established yet, skipping subscription fetch");
      return;
    }

    try {
      console.log("Fetching subscription products...");
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
      console.log("Connection established, fetching initial data...");
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
      {availableSubscriptions && availableSubscriptions.length > 0 ? 
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
      : 
      <Text style={styles.noSubscriptionsText}>No subscriptions available</Text>
    }
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
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 16,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginBottom: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.secondaryText,
  },
  errorText: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subscriptionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  subscribedCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  gradientHeader: {
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  subscriptionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  subscriptionPrice: {
    fontSize: 18,
    color: COLORS.white,
  },
  benefitsContainer: {
    padding: 20,
  },
  benefitItem: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 10,
  },
  subscribeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    alignItems: 'center',
  },
  subscribedButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  noSubscriptionsText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.secondaryText,
    marginTop: 20,
  },
});

export default Subscriptions;