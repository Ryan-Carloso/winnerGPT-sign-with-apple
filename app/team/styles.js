import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get("window");



export default styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  buttonNewsLetter: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: -3
  },
  NewsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e90ff", // Cor escura para boa legibilidade
    textAlign: "center", // Centraliza o texto
    marginTop: 5, // Espaço superior e inferior
    marginBottom: 10,
  },
  textNewsletter: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 8,
    textAlign: "center",
  },
  date: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 16,
  },
  predictionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 8,
  },
  predictionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E88E5",
    marginRight: 8,
  },
  prediction: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E88E5",
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 16,
    margin: "auto",
  },
  analysis: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  teamDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "auto",
  },
  teamColumn: {
    flex: 1,
    marginHorizontal: width * 0.05,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 12,
  },
  detail: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  formContainer: {
    flexDirection: "column",
    marginTop: 4,
  },
  formLine: {
    flexDirection: "row",
    marginBottom: 4,
  },
  formItem: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  formText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  formSeparator: {
    height: 8,
  },
});
