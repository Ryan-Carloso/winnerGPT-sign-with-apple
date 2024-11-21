import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLanguage } from "../../components/globalize/context";
import styles from './styles'

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
            {translate("NewsTitle")}
            </Text>
          </TouchableOpacity>
          <Text style={styles.NewsTitle}>
            {translate("NewsBellowText")}
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
