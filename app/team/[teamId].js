import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useLanguage } from '../../components/globalize/context';


const { width } = Dimensions.get('window');



export default function TeamDetail() {
  const { translate } = useLanguage();
  const { gameData } = useLocalSearchParams();
  const game = gameData ? JSON.parse(gameData) : null;

  const formatRecentForm = (form) => {
    const formItems = form.split('');
    const limit = 5; // Número máximo de caracteres por linha
    const lines = [];

    for (let i = 0; i < formItems.length; i += limit) {
      lines.push(
        <View key={`line-${i}`} style={styles.formLine}>
          {formItems.slice(i, i + limit).map((char, index) => {
            let backgroundColor;
            let textColor = 'white';
            switch (char) {
              case 'W':
                backgroundColor = '#4CAF50';
                break;
              case 'D':
                backgroundColor = '#FFC107';
                break;
              case 'L':
                backgroundColor = '#F44336';
                break;
              default:
                backgroundColor = '#E0E0E0';
                textColor = '#333';
            }
            return (
              <View key={index} style={[styles.formItem, { backgroundColor }]}>
                <Text style={[styles.formText, { color: textColor }]}>{char}</Text>
              </View>
            );
          })}
        </View>
      );
      lines.push(<Text key={`separator-${i}`} style={styles.formSeparator}></Text>); // Adiciona separador entre linhas
    }

    return (
      <View style={styles.formContainer}>
        {lines}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{game.home_team_name} vs {game.away_team_name}</Text>
          <Text style={styles.date}>{new Date(game.fixture_date).toLocaleString()}</Text>
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionLabel}>{translate('AIForecast')}:</Text>
            <Text style={styles.prediction}>{game.gpt_prediction}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translate('analysis')}</Text>
          <Text style={styles.analysis}>{game.gpt_reason}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translate('teamData')}</Text>
          <View style={styles.teamDataContainer}>
            <View style={styles.teamColumn}>
              <Text style={styles.teamName}>{game.home_team_name}</Text>
              <Text style={styles.detail}>{translate('winPercentage')}: <Text style={styles.bold}>{game.home_team_win_percentage}%</Text></Text>
              <Text style={styles.detail}>{translate('cleanSheets')}: <Text style={styles.bold}>{game.home_team_clean_sheets}</Text></Text>
              <Text style={styles.detail}>{translate('failedToScore')}: <Text style={styles.bold}>{game.home_team_failed_to_score}</Text></Text>
              <Text style={styles.detail}>{translate('biggestWinningStreak')}: <Text style={styles.bold}>{game.home_team_biggest_winning_streak}</Text></Text>
              <Text style={styles.detail}>{translate('biggestLosingStreak')}: <Text style={styles.bold}>{game.home_team_biggest_losing_streak}</Text></Text>
              <Text style={styles.detail}>{translate('recentForm')}:</Text>
              <View style={styles.formContainer}>
                {formatRecentForm(game.home_team_recent_form || translate('notEnoughData'))}
              </View>
            </View>
            <View style={styles.teamColumn}>
              <Text style={styles.teamName}>{game.away_team_name}</Text>
              <Text style={styles.detail}>{translate('winPercentage')}: <Text style={styles.bold}>{game.away_team_win_percentage}%</Text></Text>
              <Text style={styles.detail}>{translate('cleanSheets')}: <Text style={styles.bold}>{game.away_team_clean_sheets}</Text></Text>
              <Text style={styles.detail}>{translate('failedToScore')}: <Text style={styles.bold}>{game.away_team_failed_to_score}</Text></Text>
              <Text style={styles.detail}>{translate('biggestWinningStreak')}: <Text style={styles.bold}>{game.away_team_biggest_winning_streak}</Text></Text>
              <Text style={styles.detail}>{translate('biggestLosingStreak')}: <Text style={styles.bold}>{game.away_team_biggest_losing_streak}</Text></Text>
              <Text style={styles.detail}>{translate('recentForm')}:</Text>
              <View style={styles.formContainer}>
                {formatRecentForm(game.away_team_recent_form || translate('notEnoughData'))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 8,
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 16,
  },
  predictionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
  },
  predictionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E88E5',
    marginRight: 8,
  },
  prediction: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 16,
    margin: 'auto'
  },
  analysis: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  teamDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 'auto',
  },
  teamColumn: {
    flex: 1,
    marginHorizontal: width*0.05,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 12,
  },
  detail: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  formContainer: {
    flexDirection: 'column',
    marginTop: 4,
  },
  formLine: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  formItem: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  formText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  formSeparator: {
    height: 8, // Espaço entre as linhas
  },
});