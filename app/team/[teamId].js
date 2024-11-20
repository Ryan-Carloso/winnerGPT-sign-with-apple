import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLanguage } from "../../components/globalize/context";

const { width } = Dimensions.get("window");

export default function TeamDetail() {
  const { translate, language } = useLanguage();
  const { gameData } = useLocalSearchParams();
  const game = gameData ? JSON.parse(gameData) : null;
  const router = useRouter();

  useEffect(() => {
    console.log("Idioma atual:", language);
  }, [language]);

  const formatRecentForm = (form) => {
    const formItems = form.split("");
    const limit = 5;
    const lines = [];
    let lineKeyCounter = 0; // Counter for unique line keys
    let separatorKeyCounter = 0; // Counter for unique separator keys

    for (let i = 0; i < formItems.length; i += limit) {
      lines.push(
        <View key={`line-${lineKeyCounter++}`} style={styles.formLine}>
          {formItems.slice(i, i + limit).map((char, index) => {
            let backgroundColor;
            let textColor = "white";
            switch (char) {
              case "W":
                backgroundColor = "#4CAF50";
                break;
              case "D":
                backgroundColor = "#FFC107";
                break;
              case "L":
                backgroundColor = "#F44336";
                break;
              default:
                backgroundColor = "#E0E0E0";
                textColor = "#333";
            }
            return (
              <View key={index} style={[styles.formItem, { backgroundColor }]}>
                <Text style={[styles.formText, { color: textColor }]}>
                  {char}
                </Text>
              </View>
            );
          })}
        </View>
      );
      lines.push(
        <Text
          key={`separator-${separatorKeyCounter++}`}
          style={styles.formSeparator}
        ></Text>
      );
    }

    return <View style={styles.formContainer}>{lines}</View>;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {game.home_team_name} vs {game.away_team_name}
          </Text>
          <Text style={styles.date}>
            {new Date(game.fixture_date).toLocaleString()}
          </Text>
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionLabel}>
              {translate("AIForecast")}:
            </Text>
            <Text style={styles.prediction}>{game.gpt_prediction}</Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.buttonNewsLetter}
            onPress={() => router.push("/newsletter")}
          >
            <Text style={styles.textNewsletter}>
              Subscribe to our Newsletter
            </Text>
          </TouchableOpacity>
          <Text style={styles.NewsTitle}>
            {"      "}
            Get the latest game news and updates by subscribing above.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translate("teamData")}</Text>
          <View style={styles.teamDataContainer}>
            <View style={styles.teamColumn}>
              <Text style={styles.teamName}>{game.home_team_name}</Text>
              <Text style={styles.detail}>
                {translate("homeWinPercentage")}:{" "}
                <Text style={styles.bold}>
                  {game.home_team_win_percentage}%
                </Text>
              </Text>
              <Text style={styles.detail}>
                {translate("cleanSheets")}:{" "}
                <Text style={styles.bold}>{game.home_team_clean_sheets}</Text>
              </Text>
              <Text style={styles.detail}>
                {translate("failedToScore")}:{" "}
                <Text style={styles.bold}>
                  {game.home_team_failed_to_score}
                </Text>
              </Text>
              <Text style={styles.detail}>
                {translate("biggestWinningStreak")}:{" "}
                <Text style={styles.bold}>
                  {game.home_team_biggest_winning_streak}
                </Text>
              </Text>
              <Text style={styles.detail}>
                {translate("biggestLosingStreak")}:{" "}
                <Text style={styles.bold}>
                  {game.home_team_biggest_losing_streak}
                </Text>
              </Text>
              <Text style={styles.detail}>{translate("recentForm")}:</Text>
              <View style={styles.formContainer}>
                {formatRecentForm(
                  game.home_team_recent_form || translate("notEnoughData")
                )}
              </View>
            </View>
            <View style={styles.teamColumn}>
              <Text style={styles.teamName}>{game.away_team_name}</Text>
              <Text style={styles.detail}>
                {translate("awayWinPercentage")}:{" "}
                <Text style={styles.bold}>
                  {game.away_team_win_percentage}%
                </Text>
              </Text>
              <Text style={styles.detail}>
                {translate("cleanSheets")}:{" "}
                <Text style={styles.bold}>{game.away_team_clean_sheets}</Text>
              </Text>
              <Text style={styles.detail}>
                {translate("failedToScore")}:{" "}
                <Text style={styles.bold}>
                  {game.away_team_failed_to_score}
                </Text>
              </Text>
              <Text style={styles.detail}>
                {translate("biggestWinningStreak")}:{" "}
                <Text style={styles.bold}>
                  {game.away_team_biggest_winning_streak}
                </Text>
              </Text>
              <Text style={styles.detail}>
                {translate("biggestLosingStreak")}:{" "}
                <Text style={styles.bold}>
                  {game.away_team_biggest_losing_streak}
                </Text>
              </Text>
              <Text style={styles.detail}>{translate("recentForm")}:</Text>
              <View style={styles.formContainer}>
                {formatRecentForm(
                  game.away_team_recent_form || translate("notEnoughData")
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translate("analysis")}</Text>
          <Text style={styles.analysis}>
            {(game && game[`gpt_reason_${language}`]) ||
              "No analysis available."}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  buttonNewsLetter: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  NewsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e90ff", // Cor escura para boa legibilidade
    textAlign: "center", // Centraliza o texto
    marginTop: 5, // Espaço superior e inferior
    marginBottom: 10,
  },
  textNewsletter: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 8,
    textAlign: "center",
  },
  date: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 16,
  },
  predictionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 8,
  },
  predictionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E88E5",
    marginRight: 8,
  },
  prediction: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E88E5",
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 16,
    margin: "auto",
  },
  analysis: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  teamDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "auto",
  },
  teamColumn: {
    flex: 1,
    marginHorizontal: width * 0.05,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 12,
  },
  detail: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  formContainer: {
    flexDirection: "column",
    marginTop: 4,
  },
  formLine: {
    flexDirection: "row",
    marginBottom: 4,
  },
  formItem: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  formText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  formSeparator: {
    height: 8,
  },
});
