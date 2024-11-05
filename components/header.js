import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, useWindowDimensions, TextInput } from 'react-native';
import { Dimensions } from 'react-native';

// Obtendo as dimensões da tela
const { width: screenWidth } = Dimensions.get('window');

const fontSizeBase = screenWidth < 360 ? 14 : screenWidth < 700 ? 16 : 18;
const titleFontSize = screenWidth < 360 ? 20 : screenWidth < 700 ? 24 : 28;
const winnerFontSize = screenWidth < 360 ? 16 : screenWidth < 700 ? 18 : 20;
const dropdownTop = screenWidth >= 768 ? 50 : 85;
const dropdownRight = screenWidth >= 768 ? 10 : 40;


const Header = ({ selectedLeague, setSelectedLeague, selectedTeam, setSelectedTeam }) => {
  const { width } = useWindowDimensions();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdownVisibility = () => {
    setIsDropdownVisible(prevState => !prevState);
  };

  const selectLeague = (league) => {
    setSelectedLeague(league);
    setIsDropdownVisible(false);  // Fecha o dropdown após a seleção
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, width >= 768 && styles.headerTablet]}>
        <View style={styles.containerImage}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/icon.png')}
          />
          <Text style={styles.text}>Winner GPT</Text>
        </View>
        
        <TouchableOpacity onPress={toggleDropdownVisibility} style={styles.button}>
          <Text style={styles.buttonText}>Filters ▼</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.topBar, width >= 768 && styles.topBarTablet]}>
        <TextInput
          style={styles.input}
          placeholder="Enter team name"
          value={selectedTeam}
          onChangeText={setSelectedTeam}
        />
      </View>
      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => selectLeague('premierleague')} style={styles.dropdownItem}>
            <Text>Premier League</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectLeague('championsleague')} style={styles.dropdownItem}>
            <Text>Champions League</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectLeague('ligaportugal')} style={styles.dropdownItem}>
            <Text>Liga Portugal</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTablet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: titleFontSize , // Ajusta dinamicamente o tamanho da fonte
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 30,
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  button: {
    padding: 10,
    backgroundColor: '#999999',
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: fontSizeBase, // Ajusta dinamicamente o tamanho da fonte do botão
  },
  dropdown: {
    position: 'absolute',
    top: dropdownTop, // Altera a posição do dropdown com base na largura da tela
    right: dropdownRight,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000, // Garante que o dropdown apareça acima de outros conteúdos
    width: 150,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: '#999999',
    borderBottomWidth: 1,
    fontSize: fontSizeBase,
  },
  topBar: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10, // Adiciona algum espaçamento em relação ao dropdown
  },
  topBarTablet: {
    marginTop: 10,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    maxWidth: 300,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: winnerFontSize, // Ajusta dinamicamente o tamanho da fonte do input
  },
});

export default Header;
