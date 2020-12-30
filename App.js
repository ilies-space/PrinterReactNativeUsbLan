import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Home from './src/screens/Home';

export default function App() {
  const [isConnected, setisConnected] = useState(false);
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
              // flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 55,
                width: 55,
                backgroundColor: 'black',
                borderRadius: 55 / 2,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 20,
              }}>
              <ActivityIndicator color={mainColor} />
            </View>
            <Text style={{color: 'white'}}>Connect your printer usb</Text>
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
        {isConnected ? (
          <View
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{width: 200, height: 200}}>
              <Image
                source={require('./assets/printer.png')}
                style={{width: 200, height: 200, padding: 10}}
              />
              <Image
                source={require('./assets/check.png')}
                style={{
                  width: 90,
                  height: 90,
                  position: 'absolute',
                  bottom: 20,
                  right: -50,
                }}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('./assets/usbcable.png')}
              style={{width: 250, height: 250, padding: 10}}
            />
          </View>
        )}
      </View>

      <View
        style={{
          backgroundColor: '#1e272e',
          height: '30%',
          borderTopLeftRadius: 80,
          borderTopRightRadius: 80,
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
                // paddingHorizontal: '20%',
                width: 250,
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

            borderRadius: 20,
            height: 50,
            width: 150,
            alignItems: 'center',
            justifyContent: 'center',
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
