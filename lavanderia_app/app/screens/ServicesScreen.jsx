
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const API_URL = 'http://192.168.0.19:3000/services'; 

export default function ServicesScreen() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setServices(data);
  };

  const saveService = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    });
    setName('');
    setPrice('');
    setEditingId(null);
    fetchServices();
  };

  const deleteService = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchServices();
  };

  const editService = (service) => {
    setName(service.name);
    setPrice(service.price.toString());
    setEditingId(service._id);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Servicios</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del servicio"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <Button title={editingId ? "Actualizar" : "Agregar"} onPress={saveService} />

      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - ${item.price}</Text>
            <View style={styles.actions}>
              <Button title="Editar" onPress={() => editService(item)} />
              <Button title="Eliminar" color="red" onPress={() => deleteService(item._id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: 'purple' },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  item: { padding: 10, borderBottomWidth: 1 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }
});
