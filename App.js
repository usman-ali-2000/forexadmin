import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/Main';
import CategoryForm from './components/CategoryForm';
import Lesson from './components/Lesson';
import Edit from './components/Edit';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator>
      <Stack.Screen name="Category" component={Main} options={{title:'', headerStyle:{backgroundColor:'magenta'}, headerShown:false}}/>
      <Stack.Screen name="CategoryForm" component={CategoryForm}/>
      <Stack.Screen name="Lesson" component={Lesson} options={{title:'', headerStyle:{backgroundColor:'magenta'}, headerShown:false}}/>
      <Stack.Screen name="Edit" component={Edit}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
