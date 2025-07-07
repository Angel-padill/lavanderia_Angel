import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';


export default function CreateClientScreen() {

  const router = useRouter()
  const [name, setName] = useState("");
  const [phone_number, setPhoneN] = useState("");
  const [address, setAddress] = useState("");

  const crearCliente = async () => {
    try {
      if (!name || !phone_number || !address) {
        Alert.alert("completa los datos")
        return
      }

      const response = await fetch(`https://pztj8bxq-5000.usw3.devtunnels.ms/clients/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone_number, address }),
      });

      const data = response.json()


      if (response.ok) {
        Alert.alert("Cliente creado exitosamente")
        console.log(data)
        router.push("/clientes")

      } else {
        Alert.alert("error su usuario no se creo")
      }

    } catch (error) {
      Alert.alert("Ocurrio un error:")
      console.log("Ocurrio un error", error)
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Crear Cliente</Text>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder='nombre'
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.label}>Telefono:</Text>
        <TextInput
          style={styles.input}
          placeholder='telefono'
          value={phone_number}
          onChangeText={(text) => setPhoneN(text)}
        />
        <Text style={styles.label}>Direccion:</Text>
        <TextInput
          style={styles.input}
          placeholder='direccion'
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Pressable style={styles.send} onPress={crearCliente}>
          <Text style={styles.textButton}>Crear</Text>
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
    marginTop: 30,
    fontWeight: "bold",
    margin: 15,
    marginLeft: 1,
    color: '#d1a3ff', 
  },
  label: {
    marginTop: 15,
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
    color: "#000", 
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