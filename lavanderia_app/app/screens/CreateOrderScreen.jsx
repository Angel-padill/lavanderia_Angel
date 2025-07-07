import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const CreateOrderScreen = () => {
  const [clienteId, setClienteId] = useState('');
  const [detalles, setDetalles] = useState('');
  const [total, setTotal] = useState('');

  const handleSubmit = async () => {
    if (!clienteId || !detalles || !total) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.19:5000/api/ordenes', {
        cliente_id: clienteId,
        detalles,
        total,
      });
      Alert.alert("Éxito", `Orden creada con ID: ${response.data.id}`);
      setClienteId('');
      setDetalles('');
      setTotal('');
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo crear la orden");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Orden</Text>

      <TextInput
        style={styles.input}
        placeholder="ID del Cliente"
        placeholderTextColor="#aaa"
        value={clienteId}
        onChangeText={setClienteId}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Detalles de la orden"
        placeholderTextColor="#aaa"
        value={detalles}
        onChangeText={setDetalles}
      />

      <TextInput
        style={styles.input}
        placeholder="Total ($)"
        placeholderTextColor="#aaa"
        value={total}
        onChangeText={setTotal}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar Orden</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#b084f5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#2a2a3d',
    color: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#b084f5',
  },
  button: {
    backgroundColor: '#b084f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#1e1e2f',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateOrderScreen;
