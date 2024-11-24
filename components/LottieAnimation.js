import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

// Importa as animações
import drawAnimation from '../assets/draw.json';
import winnerAnimation from '../assets/winner.json';

// Função para escolher o componente Lottie baseado na plataforma
const getLottieView = () => {
  return Platform.OS === 'web'
    ? require('react-lottie').default
    : require('lottie-react-native').default;
};

// Componente LottieAnimation
const LottieAnimation = ({ winnerteam }) => {
  const animation = winnerteam === 'Draw' ? drawAnimation : winnerAnimation;
  const LottieView = getLottieView();

  const lottieProps = Platform.select({
    web: {
      options: {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      },
      height: 100,
      width: 100,
      
    },
    default: {
      source: animation,
      autoPlay: true,
      loop: true,
      style: styles.lottie,
    },
  });

  return (
    <View style={styles.container}>
      <LottieView {...lottieProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  lottie: {
    width: 1000,
    height: 60,
  },
});

export default LottieAnimation;
