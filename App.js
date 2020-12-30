import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Home from './src/screens/Home';

export default function App() {
  const [isConnected, setisConnected] = useState(true);
  const mainColor = '#53CA83';
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        paddingTop: '3%',
      }}>
      {/* <Text style={{color: 'white', fontWeight: 'bold'}}>
        ticket printer tester
      </Text> */}

      {isConnected ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 55,
              width: 55,
              backgroundColor: mainColor,
              borderRadius: 55 / 2,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 20,
            }}>
            <Text>IMG</Text>
          </View>
          <Text style={{color: 'white'}}>Connected to : 1231321</Text>
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 55,
                width: 55,
                backgroundColor: '#e84118',
                borderRadius: 55 / 2,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 20,
              }}>
              <Text style={{color: 'white'}}>IMG</Text>
            </View>
            <Text style={{color: 'white'}}>No printer coonected</Text>
          </View>
        </View>
      )}

      <View
        style={{
          alignSelf: 'flex-end',
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white'}}>IMG plceholder Area</Text>
      </View>

      <View
        style={{
          backgroundColor: '#1e272e',
          height: '30%',
          borderTopLeftRadius: 80,
          // borderTopRightRadius: 80,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 20,
          width: '100%',
        }}>
        {isConnected ? (
          <View>
            <TextInput
              placeholder={'text to be printed'}
              placeholderTextColor={'#a4b0be'}
              style={{
                borderWidth: 0.5,
                borderColor: 'white',
                paddingHorizontal: '20%',
                paddingVertical: '1.5%',
                borderRadius: 10,
                marginVertical: '2%',
                color: 'white',
              }}
            />
          </View>
        ) : (
          <View />
        )}
        {/* <Home /> */}
        <TouchableOpacity
          style={{
            backgroundColor: mainColor,
            paddingHorizontal: '5%',
            paddingVertical: '1%',
            borderRadius: 20,
          }}>
          {isConnected ? (
            <Text style={{color: 'white'}}>PRINT</Text>
          ) : (
            <Text style={{color: 'white'}}>Connect</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
