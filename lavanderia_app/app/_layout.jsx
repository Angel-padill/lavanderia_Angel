import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#6a0dad' }, 
        headerTintColor: '#ffd700', 
      }}
    />
  );
}