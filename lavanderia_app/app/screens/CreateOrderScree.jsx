//RESUMEN DE LA ORDENSCREEN PEDIDA EN LA IMAGEN



import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const CreateOrderScreen = () => {
  const [clienteId, setClienteId] = useState('');
  const [prenda, setPrenda] = useState('');
  const [servicio, setServicio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [items, setItems] = useState([]);

  const agregarItem = () => {
    if (!prenda || !servicio || !cantidad || !precioUnitario) {
      Alert.alert('Error', 'Todos los campos del artículo son obligatorios');
      return;
    }

    const nuevoItem = {
      id: Date.now(),
      prenda,
      servicio,
      cantidad: parseInt(cantidad),
      precioUnitario: parseFloat(precioUnitario),
      total: parseInt(cantidad) * parseFloat(precioUnitario),
    };

    setItems([...items, nuevoItem]);
    setPrenda('');
    setServicio('');
    setCantidad('');
    setPrecioUnitario('');
  };

  const calcularTotal = () => {
    return items.reduce((acc, item) => acc + item.total, 0).toFixed(2);
  };

  const enviarOrden = async () => {
    if (!clienteId || items.length === 0) {
      Alert.alert('Error', 'Debe ingresar el ID del cliente y al menos un artículo.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.19:5000/api/ordenes', {
        cliente_id: clienteId,
        detalles: JSON.stringify(items),
        total: calcularTotal(),
      });

      Alert.alert('Orden creada', `ID: ${response.data.id}`);
      setClienteId('');
      setItems([]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo crear la orden');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemResumen}>
      <Text style={styles.itemText}>
        {item.cantidad} x {item.prenda} ({item.servicio}) - ${item.precioUnitario} = ${item.total}
      </Text>
    </View>
  );

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

      <Text style={styles.subtitle}>Agregar prenda</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de prenda (ej. Chamarra)"
        placeholderTextColor="#aaa"
        value={prenda}
        onChangeText={setPrenda}
      />

      <TextInput
        style={styles.input}
        placeholder="Servicio (Lavado, Tintorería...)"
        placeholderTextColor="#aaa"
        value={servicio}
        onChangeText={setServicio}
      />

      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        placeholderTextColor="#aaa"
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Precio unitario"
        placeholderTextColor="#aaa"
        value={precioUnitario}
        onChangeText={setPrecioUnitario}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={agregarItem}>
        <Text style={styles.buttonText}>Agregar al resumen</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Resumen de la orden</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <Text style={styles.total}>TOTAL: ${calcularTotal()}</Text>

      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={enviarOrden}>
        <Text style={styles.buttonText}>Crear Orden</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#b084f5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#2a2a3d',
    color: 'white',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#b084f5',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#b084f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#1e1e2f',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemResumen: {
    backgroundColor: '#333',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  itemText: {
    color: 'white',
  },
  total: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
});

export default CreateOrderScreen;
