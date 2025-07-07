import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Bienvenido</Text>
        <Pressable style={styles.send}>
          <Link href="/login" style={styles.textButton}>Login</Link>
        </Pressable>
        <Pressable style={styles.send}>
          <Link href="/usuarios/createU" style={styles.textButton}>Registrarse</Link>
        </Pressable>
        <Pressable style={styles.send}>
          <Link href={"/clientes"} style={styles.textButton}>Clientes registrados</Link>
        </Pressable>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', 
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 30,
    marginTop: 70,
    fontWeight: "bold",
    margin: 15,
    color: '#d1a3ff', 
  },
  label: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: '#ffd700',
  },
  input: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#a020f0",
    fontSize: 20,
    paddingHorizontal: 10,
    marginVertical: 15,
    backgroundColor: "white",
    color: '#000',
  },
  send: {
    backgroundColor: "#6a0dad", 
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
    paddingVertical: 10,
    width: 300,
  },
  recover: {
    backgroundColor: "#ffcc00",
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
    paddingVertical: 10,
    padding: 15,
  },
  textButton: {
    color: "#000", 
    fontSize: 20,
    fontWeight: "bold",
  },
  containerFooter: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 20,
    margin: 5,
    color: '#d1a3ff', 
  },
});
