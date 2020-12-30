import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Home from './src/screens/Home';

export default function App() {
  const mainColor = '#2f3640';
  return (
    <View
      style={{
        backgroundColor: mainColor,
        flex: 1,
        alignItems: 'center',
      }}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>
        ticket printer tester
      </Text>

      <View
        style={{
          alignSelf: 'flex-end',
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>info Area</Text>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          height: '45%',
          borderTopLeftRadius: 80,
          borderTopRightRadius: 80,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 20,
          width: '100%',
        }}>
        <Text>----</Text>
        {/* <Home /> */}
        <TouchableOpacity
          style={{
            backgroundColor: mainColor,
            paddingHorizontal: '5%',
            paddingVertical: '1%',
            borderRadius: 20,
          }}>
          <Text style={{color: 'white'}}>PRINT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
