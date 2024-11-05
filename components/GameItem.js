import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Calendar, Clock, Trophy } from 'lucide-react-native';
import { useLanguage } from './globalize/context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const GameItem = ({ item, numColumns = 1 }) => {
  const { translate } = useLanguage();
  const router = useRouter();
  const [textWidth, setTextWidth] = useState(0);

  const getItemWidth = () => {
    const padding = 32;
    const spacing = 16;
    const availableWidth = SCREEN_WIDTH - padding;
    return (availableWidth - (spacing * (numColumns - 1))) / numColumns;
  };

  const handlePressTeam = (gameData) => {
    router.push({
      pathname: `/team/${gameData.home_team_id}`,
      params: { gameData: JSON.stringify(gameData) },
    });
  };

  const date = new Date(item.fixture_date);

  return (
    <TouchableOpacity
      onPress={() => handlePressTeam(item)}
      style={[styles.container, { width: getItemWidth() }]}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={['#FFFFFF', '#F8FAFF']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateWrapper}>
              <Calendar size={14} color="#1E88E5" style={styles.icon} />
              <Text style={styles.date}>{format(date, 'MMM dd, yyyy')}</Text>
            </View>
            <View style={styles.timeWrapper}>
              <Clock size={14} color="#1E88E5" style={styles.icon} />
              <Text style={styles.time}>{format(date, 'HH:mm')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.teamsContainer}>
          <LinearGradient
            colors={['#F5F9FF', '#FFFFFF']}
            style={styles.teamGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.teamName}>{item.home_team_name}</Text>
            <View style={styles.vsContainer}>
              <View style={styles.vsLine} />
              <Text style={styles.vsText}>VS</Text>
              <View style={styles.vsLine} />
            </View>
            <Text style={styles.teamName}>{item.away_team_name}</Text>
          </LinearGradient>
        </View>

        <View style={styles.predictionContainer}>
          <View style={styles.predictionHeader}>
            <Trophy size={16} color="#1E88E5" />
            <Text style={styles.predictionLabel}>{translate('byAI')}</Text>
          </View>
          
          <View style={styles.predictionContent}>
            <Text
              style={styles.predictionText}
              onLayout={(event) => setTextWidth(event.nativeEvent.layout.width)}
            >
              {item.gpt_prediction}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.statsButton}
          onPress={() => handlePressTeam(item)}
          activeOpacity={0.7}
        >
          <Text style={styles.statsButtonText}>{translate('seestats')}</Text>
          <ChevronRight size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  card: {
    borderRadius: 20,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#1E88E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  header: {
    marginBottom: 16,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  date: {
    fontSize: 14,
    color: '#1E88E5',
    fontWeight: '600',
  },
  time: {
    fontSize: 14,
    color: '#1E88E5',
    fontWeight: '700',
  },
  teamsContainer: {
    marginBottom: 20,
  },
  teamGradient: {
    padding: 16,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  teamName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2B2B2B',
    textAlign: 'center',
    marginVertical: 8,
    letterSpacing: 0.5,
  },
  vsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  vsLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
    maxWidth: 80,
  },
  vsText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E88E5',
    marginHorizontal: 12,
    letterSpacing: 1,
  },
  predictionContainer: {
    backgroundColor: '#F5F9FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  predictionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  predictionLabel: {
    fontSize: 14,
    color: '#1E88E5',
    marginLeft: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  predictionContent: {
    alignItems: 'center',
  },
  predictionText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E88E5',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  statsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#1E88E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statsButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
    letterSpacing: 0.5,
  },
});

export default GameItem;