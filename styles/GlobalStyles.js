import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },

  containerheader: {
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 5,
    margin: 'auto'
  },
  container: {
    zIndex: 100,
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  containerAbout: {
    padding: 16,
    maxWidth: 800,
    margin: 'auto',
    backgroundColor: '#f8f8f8',

  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },


  title: {
    margin: 'auto',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },


  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
  vsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  header: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 4,
  },
  disclaimer: {
    fontSize: 14,
    lineHeight: 20,
    color: 'red',
    marginTop: 5,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '30%',
    margin: 'auto'
  },
  icon: {
    marginHorizontal: 10,
  },
});
