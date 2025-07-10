
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const API_URL = 'http://192.168.0.19:3000/garments';

export default function GarmentsScreen() {
  const [garments, setGarments] = useState([]);
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchGarments = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setGarments(data);
  };

  const saveGarment = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, color }),
    });
    setType('');
    setColor('');
    setEditingId(null);
    fetchGarments();
  };

  const deleteGarment = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchGarments();
  };

  const editGarment = (garment) => {
    setType(garment.type);
    setColor(garment.color);
    setEditingId(garment._id);
  };

  useEffect(() => {
    fetchGarments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Prendas</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo de prenda"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />
      <Button title={editingId ? "Actualizar" : "Agregar"} onPress={saveGarment} />

      <FlatList
        data={garments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.type} - {item.color}</Text>
            <View style={styles.actions}>
              <Button title="Editar" onPress={() => editGarment(item)} />
              <Button title="Eliminar" color="red" onPress={() => deleteGarment(item._id)} />
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
