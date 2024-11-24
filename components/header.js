import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, useWindowDimensions, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import { useLanguage } from '../components/globalize/context';


// Obtendo as dimensões da tela
const { width: screenWidth } = Dimensions.get('window');


const fontSizeBase = screenWidth < 360 ? 16 : screenWidth < 700 ? 18 : 20;
const titleFontSize = screenWidth < 360 ? 20 : screenWidth < 700 ? 24 : 28;
const winnerFontSize = screenWidth < 360 ? 18 : screenWidth < 700 ? 20 : 22;
const dropdownTop = screenWidth >= 768 ? 50 : 85;
const dropdownRight = screenWidth >= 768 ? 10 : 40;


const Header = ({ selectedLeague, setSelectedLeague, selectedTeam, setSelectedTeam }) => {
  const { translate } = useLanguage();
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
          <Text style={styles.buttonText}>{translate('filters')} ▼</Text>
        </TouchableOpacity>
      </View>

      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => selectLeague('premierleague')} style={styles.dropdownItem}>
            <Text>{translate('premierleague')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectLeague('championsleague')} style={styles.dropdownItem}>
            <Text>{translate('championsleague')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectLeague('ligaportugal')} style={styles.dropdownItem}>
          <Text>{translate('ligaportugal')}</Text>
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
    width: screenWidth * 0.65,
    height: 60,
    backgroundColor: '#4299E1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    shadowColor: "#4299E1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: fontSizeBase, // Ajusta dinamicamente o tamanho da fonte do botão
  },
  dropdown: {
    position: 'absolute',
    top: 110,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
    width: 180,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#fff',
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
