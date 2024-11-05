import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useLanguage } from '../../components/globalize/context'; 
import styles from './styles'

export default function TeamDetail() {
  const { translate } = useLanguage();

  const { gameData } = useLocalSearchParams(); 

  const game = gameData ? JSON.parse(gameData) : null;

  const formatRecentForm = (form) => {
    return form.split('').map((char, index) => {
      let color;
      switch (char) {
        case 'W':
          color = 'green';
          break;
        case 'D':
          color = 'gray';
          break;
        case 'L':
          color = 'red';
          break;
        default:
          color = 'black';
      }
      return <Text key={index} style={[styles.formText, { color }]}>{char}</Text>;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{game.home_team_name} vs {game.away_team_name}</Text>
        <Text style={styles.date}>{new Date(game.fixture_date).toLocaleString()}</Text>
        <Text style={styles.prediction}>{translate('IAforecast')}: {game.gpt_prediction}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subTitle}>{translate('analysis')}</Text>
        <Text style={styles.analysis}>{game.gpt_reason}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subTitle}>{translate('teamData')}</Text>
        <Text style={styles.detail}>{translate('homeTeam')} {game.home_team_name}</Text>
        <Text style={styles.detail}>{translate('awayTeam')} {game.away_team_name}</Text>
        <Text style={styles.detail}>{translate('homeWinPercentage')} {game.home_team_name} <Text style={styles.bold}>{game.home_team_win_percentage}%</Text></Text>
        <Text style={styles.detail}>{translate('awayWinPercentage')} {game.away_team_name} <Text style={styles.bold}>{game.away_team_win_percentage}%</Text></Text>
        <Text style={styles.detail}>{translate('cleanSheets')} {game.home_team_name}: <Text style={styles.bold}>{game.home_team_clean_sheets}</Text></Text>
        <Text style={styles.detail}>{translate('cleanSheets')} {game.away_team_name}: <Text style={styles.bold}>{game.away_team_clean_sheets}</Text></Text>
        <Text style={styles.detail}>{translate('failedToScore')} {game.home_team_name}: <Text style={styles.bold}>{game.home_team_failed_to_score}</Text></Text>
        <Text style={styles.detail}>{translate('failedToScore')} {game.away_team_name}: <Text style={styles.bold}>{game.away_team_failed_to_score}</Text></Text>
        <Text style={styles.detail}>{translate('recentForm')} {game.home_team_name}:</Text>
        <View style={styles.formContainer}>
        <Text style={styles.bold}>
            {formatRecentForm(game.home_team_recent_form || translate('notEnoughtData'))}
          </Text>
        </View>
        <Text style={styles.detail}>{translate('recentForm')} {game.away_team_name}:</Text>
        
        <View style={styles.formContainer}>
        <Text style={styles.bold}>
            {formatRecentForm(game.away_team_recent_form || translate('notEnoughtData'))}
          </Text>
        </View>
        <Text style={styles.detail}>{translate('biggestWinningStreak')} {game.home_team_name} <Text style={styles.bold}>{game.home_team_biggest_winning_streak}</Text></Text>
        <Text style={styles.detail}>{translate('biggestWinningStreak')} {game.away_team_name}: <Text style={styles.bold}>{game.away_team_biggest_winning_streak}</Text></Text>
        <Text style={styles.detail}>{translate('biggestLosingStreak')} {game.home_team_name} <Text style={styles.bold}>{game.home_team_biggest_losing_streak}</Text></Text>
        <Text style={styles.detail}>{translate('biggestLosingStreak')} {game.away_team_name}: <Text style={styles.bold}>{game.away_team_biggest_losing_streak}</Text></Text>
      </View>
    </ScrollView>
  );
}