import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

const COLORS = {
  primary: '#7C3AED',
  white: '#FFFFFF',
  background: '#FFFFFF',
  text: '#1F2937',
  border: '#E5E7EB',
  modalBackground: 'rgba(0, 0, 0, 0.5)',
};

const ReviewPage = ({ setShowReviewPage }) => {
  const [currentStep, setCurrentStep] = useState("askFeedback");
  const [feedback, setFeedback] = useState("");

  const openAppStoreReview = () => {
    const appStoreLink = "itms-apps://itunes.apple.com/app/id6592649804?action=write-review";
    Linking.openURL(appStoreLink).catch((err) =>
      console.error("Failed to open App Store link:", err)
    );
  };

  const AskFeedbackPage = () => (
    <View style={styles.content}>
      <Text style={styles.title}>What do you think of WinnerGPT so far?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setCurrentStep("review")}
        >
          <Text style={styles.emoji}>😍</Text>
          <Text style={styles.optionText}>I love it</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setCurrentStep("feedback")}
        >
          <Text style={styles.emoji}>😐</Text>
          <Text style={styles.optionText}>It could be better</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const FeedbackPage = () => {
    const emailSubject = "Feedback para WinnerGPT";
    const emailUrl = `mailto:ryancarlos16@gmail.com?subject=${encodeURIComponent(emailSubject)}`;
  
    useEffect(() => {
      // Tenta abrir o link e fecha a página em seguida
      Linking.openURL(emailUrl)
        .then(() => {
          setShowReviewPage(false); // Fecha a página após abrir o cliente de e-mail
        })
        .catch((err) => {
          console.error("Erro ao abrir o cliente de email:", err);
          Alert.alert("Erro", "Não foi possível abrir o cliente de email.");
        });
    }, []); // Executa uma vez ao montar o componente
  
    return null; // A página será fechada automaticamente
  };

  const ReviewPageContent = () => (
    <View style={styles.content}>
      <Text style={styles.title}>Enjoying the App?</Text>
      <Text style={styles.subtitle}>We'd love to hear your feedback!</Text>
      <TouchableOpacity 
        style={[styles.button, styles.reviewButton]} 
        onPress={openAppStoreReview}
      >
        <Text style={styles.buttonText}>Leave a Review</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.closeButton]}
        onPress={() => setShowReviewPage(false)}
      >
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={true}
      onRequestClose={() => setShowReviewPage(false)}
    >
      <TouchableWithoutFeedback onPress={() => {
        if (currentStep !== "feedback") {
          setShowReviewPage(false);
        }
      }}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.closeButtonContainer}
                onPress={() => setShowReviewPage(false)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
              {currentStep === "askFeedback" && <AskFeedbackPage />}
              {currentStep === "review" && <ReviewPageContent />}
              {currentStep === "feedback" && <FeedbackPage />}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.modalBackground,
  },
  container: {
    width: "85%",
    maxWidth: 400,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 24,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text + '80',
    marginBottom: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: COLORS.text,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginVertical: 8,
    minWidth: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.text + '80',
    lineHeight: 24,
  },
});

export default ReviewPage;