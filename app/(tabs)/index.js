// index.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Dimensions, ActivityIndicator, Button, View, Text } from 'react-native';
import Header from '../../components/header';
import GameItem from '../../components/GameItem';
import { styles } from '../../styles/GlobalStyles';
import { fetchData } from '../../utils/api';
import Auth from '../../components/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from "@sentry/react-native";
import trackUserAnalytics from '../../components/Analytics/TrackUser';
import { initializeNotifications, sendAppOpenNotification } from '../../components/notify/notify';



Sentry.init({
  dsn: "https://d95ffea76416fb81f8ba5846bf1c7a6c@o4507664027287552.ingest.de.sentry.io/4508311786946640",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  // profilesSampleRate is relative to tracesSampleRate.
  // Here, we'll capture profiles for 100% of transactions.
  profilesSampleRate: 1.0,
});

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [sortOrder, setSortOrder] = useState('closest');
  const [numColumns, setNumColumns] = useState(1);
  const [selectedLeague, setSelectedLeague] = useState('all'); // Default to "all"
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state
  const [clickCount, setClickCount] = useState(0);  // Estado global do contador


  useEffect(() => {
    // Check login status when the app starts
    trackUserAnalytics();
    initializeNotifications();
    
    // Send notification when app opens
    sendAppOpenNotification();

    const checkLoginStatus = async () => {
      try {
        const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedInStatus === 'true'); // Set state based on stored value
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus(); // Call the function to check login status

    fetchLeagueData(selectedLeague);
    adjustColumns();

    // Subscribe to dimension changes
    const subscription = Dimensions.addEventListener('change', adjustColumns);

    // Cleanup on unmount
    return () => {
      subscription?.remove(); // Use the remove method on the subscription object
    };
  }, [selectedLeague]);

  const fetchLeagueData = async (league) => {
    const urlMap = {
      premierleague: 'https://api-winner-gpt.vercel.app/premierleague/data',
      championsleague: 'https://api-winner-gpt.vercel.app/championsleague/data',
      ligaportugal: 'https://api-winner-gpt.vercel.app/ligaportugal/data',
    };
    if (league === 'all') {
      // Fetch data from all leagues and combine them
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

  const filteredData = sortData(data.filter((item) => {
    return selectedTeam ? item.game.toLowerCase().includes(selectedTeam.toLowerCase()) : true;
  }));

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Error fetching data: {error.message}</Text>
          <Button title="Retry" onPress={() => fetchLeagueData(selectedLeague)} />
        </View>
      </SafeAreaView>
    );
  }

  if (isLoggedIn) { // Use isLoggedIn state variable
  //if (!isLoggedIn) { // Use isLoggedIn state variable to work on prod put the '!' there and thats fine
    return (
      <Auth setIsLoggedIn={setIsLoggedIn} /> 
    );
  } else {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.containerheader}>
          <Header 
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            selectedLeague={selectedLeague}
            setSelectedLeague={setSelectedLeague} // Pass these props to Header
          />
        </View>
        <ScrollView contentContainerStyle={styles.grid}>
          {filteredData.map((item) => (
            <GameItem key={item.id} item={item} numColumns={numColumns} 
            clickCount={clickCount}
            setClickCount={setClickCount}
             />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}