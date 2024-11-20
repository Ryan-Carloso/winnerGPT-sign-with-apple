import {StyleSheet, Dimensions} from 'react-native'

const COLORS = {
    primary: '#1E88E5',
    white: '#FFFFFF',
    background: '#F8FAFF',
    text: '#333333',
    secondaryText: '#666666',
  }

  const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
    sectionTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: COLORS.primary,
      marginTop: 20,
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: COLORS.text,
      marginBottom: 15,
      lineHeight: 24,
    },
    button: {
      backgroundColor: '#007bff', // Blue background
      paddingVertical: 12,        // Vertical padding
      paddingHorizontal: 20,      // Horizontal padding
      borderRadius: 8,           // Rounded corners
      alignItems: 'center',      // Center text
      marginVertical: 10,        // Space between buttons
    },
    buttonText: {
      color: '#ffffff',          // White text
      fontSize: 16,              // Text size
      fontWeight: 'bold',        // Bold text
    },

  });