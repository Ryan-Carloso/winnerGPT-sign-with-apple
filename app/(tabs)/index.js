// index.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Dimensions, ActivityIndicator, Button, View, Text } from 'react-native';
import Header from '../../components/header';
import GameItem from '../../components/GameItem';
import { styles } from '../../styles/GlobalStyles';
import { fetchData } from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import trackUserAnalytics from '../../components/Analytics/TrackUser';
import { initializeNotifications, scheduleLocalDailyNotification } from '../../components/notify/notify';
import ReviewPage from '../../components/reviewpage/review'; // Alterado para ser um componente reutilizável

Sentry.init({
  dsn: 'https://d95ffea76416fb81f8ba5846bf1c7a6c@o4507664027287552.ingest.de.sentry.io/4508311786946640',
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [sortOrder, setSortOrder] = useState('closest');
  const [numColumns, setNumColumns] = useState(1);
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const [showReviewPage, setShowReviewPage] = useState(false);

  useEffect(() => {
    const checkAndShowReview = async () => {
      try {
        // Obtém o contador de reviews salvos
        const reviewCount = await AsyncStorage.getItem('reviewCount');
        const count = reviewCount ? parseInt(reviewCount) : 0;

        // Exibe a página de review apenas se o contador for menor que 2
        if (count < 2) {
          const timer = setTimeout(async () => {
            setShowReviewPage(true);

            // Incrementa e salva o contador de reviews
            await AsyncStorage.setItem('reviewCount', (count + 1).toString());
          }, 180); // 30 minutos em milissegundos

          // Cleanup do timer ao desmontar o componente
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('Erro ao verificar contagem de reviews:', error);
      }
    };

    checkAndShowReview();
  }, []);

  useEffect(() => {
    trackUserAnalytics();
    initializeNotifications();
    scheduleLocalDailyNotification();

    const checkLoginStatus = async () => {
      try {
        const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedInStatus === 'true');
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
    fetchLeagueData(selectedLeague);
    adjustColumns();

    const subscription = Dimensions.addEventListener('change', adjustColumns);

    return () => {
      subscription?.remove();
    };
  }, [selectedLeague]);

  const fetchLeagueData = async (league) => {
    const urlMap = {
      premierleague: 'https://api-winner-gpt.vercel.app/premierleague/data',
      championsleague: 'https://api-winner-gpt.vercel.app/championsleague/data',
      ligaportugal: 'https://api-winner-gpt.vercel.app/ligaportugal/data',
    };
    if (league === 'all') {
      const allData = [];
      for (const key in urlMap) {
        const url = urlMap[key];
        await fetchData(url, setLoading, setError, (data) => allData.push(...data));
      }
      setData(allData);
    } else {
      const url = urlMap[league];
      if (url) {
        await fetchData(url, setLoading, setError, setData);
      }
    }
  };

  const adjustColumns = () => {
    const { width } = Dimensions.get('window');
    if (width < 600) {
      setNumColumns(1);
    } else if (width < 900) {
      setNumColumns(2);
    } else {
      setNumColumns(3);
    }
  };

  const sortData = (data) => {
    const now = new Date();
    return data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortOrder === 'closest') {
        return Math.abs(dateA - now) - Math.abs(dateB - now);
      } else if (sortOrder === 'farthest') {
        return Math.abs(dateB - now) - Math.abs(dateA - now);
      } else if (sortOrder === 'oldest') {
        return dateA - dateB;
      }
      return 0;
    });
  };

  const filteredData = sortData(
    data.filter((item) =>
      selectedTeam ? item.game.toLowerCase().includes(selectedTeam.toLowerCase()) : true
    )
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {showReviewPage ? (
        <ReviewPage setShowReviewPage={setShowReviewPage} />
      ) : loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View style={styles.container}>
          <Text>Error fetching data: {error.message}</Text>
          <Button title="Retry" onPress={() => fetchLeagueData(selectedLeague)} />
        </View>
      ) : (
        <>
          <View style={styles.containerheader}>
            <Header
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              selectedLeague={selectedLeague}
              setSelectedLeague={setSelectedLeague}
            />
          </View>
          <ScrollView contentContainerStyle={styles.grid}>
            {filteredData.map((item) => (
              <GameItem
                key={item.id}
                item={item}
                numColumns={numColumns}
                clickCount={clickCount}
                setClickCount={setClickCount}
              />
            ))}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}