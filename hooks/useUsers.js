import { useState, useEffect } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const addUser = (userData) => {
    const newUser = { ...userData, id: Date.now() };
    setUsers(prev => [...prev, newUser]);
  };

  const removeUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return { users, loading, addUser, removeUser, loadUsers };
}