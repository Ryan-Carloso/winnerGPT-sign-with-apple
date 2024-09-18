import { StyleSheet, Dimensions } from 'react-native';

// Obtendo as dimensões da tela
const { width: screenWidth } = Dimensions.get('window');

// Definindo o número de colunas com base na largura da tela
const numColumns = screenWidth > 768 ? 3 : screenWidth > 480 ? 2 : 1;

const fontSizeBase = screenWidth < 360 ? 14 : screenWidth < 768 ? 16 : 18;
const titleFontSize = screenWidth < 360 ? 20 : screenWidth < 768 ? 24 : 28;
const winnerFontSize = screenWidth < 360 ? 16 : screenWidth < 768 ? 18 : 20;

// Calculando a largura de cada item com base no número de colunas
const itemWidth = (screenWidth - (numColumns + 1) * 10) / numColumns;

export const styles = StyleSheet.create({
  dateContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  date: {
    marginHorizontal: 5,
    fontSize: fontSizeBase,
    color: '#555',
  },
  titleTeam: {
    fontSize: titleFontSize * 0.9,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center', // Centering the text
},

  time: {
    justifyContent: 'center',
    fontSize: fontSizeBase,
    color: '#000',
  },
  gameColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  centeredWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  winnerteam: {
    fontSize: titleFontSize * 1.1,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
    position: 'absolute',
    width: '90%', // Limita a largura do texto para que fique dentro do quadrado
    height: 50, // Define uma altura fixa para o contêiner
    textAlignVertical: 'center', // Centraliza verticalmente
    overflow: 'hidden', // Evita que o texto ultrapasse a altura do contêiner
  
  },
  winner: {
    fontSize: winnerFontSize,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
    textAlign: 'center',
    width: '100%',
  },
  analysis: {
    fontSize: fontSizeBase,
    lineHeight: fontSizeBase * 1.5,
    color: '#666',
    textAlign: 'center', // Centraliza o texto da análise
  },
  gameContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    padding: 10,
    marginBottom: 20,
    flexGrow: 1,
    margin: 10,
    width: itemWidth, // Largura do item baseada no número de colunas
    alignSelf: 'center',
    justifyContent: 'center', // Centraliza o conteúdo dentro do quadrado
  },
});
