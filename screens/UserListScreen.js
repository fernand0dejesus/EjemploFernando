import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useUsers } from '../hooks/useUsers';

export default function UserListScreen() {
  const { users, loading, removeUser } = useUsers();

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <TouchableOpacity 
        onPress={() => removeUser(item.id)}
        style={styles.deleteBtn}
      >
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) return <Text>Cargando...</Text>;

  return (
    <FlatList
      data={users}
      renderItem={renderUser}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  userCard: { 
    backgroundColor: 'white', padding: 15, marginBottom: 10, 
    borderRadius: 8, flexDirection: 'row', alignItems: 'center' 
  },
  name: { flex: 1, fontSize: 16, fontWeight: '600' },
  email: { flex: 1, fontSize: 14, color: '#666' },
  deleteBtn: { backgroundColor: '#FF3B30', padding: 8, borderRadius: 6 },
  deleteText: { color: 'white', fontSize: 12 },
});