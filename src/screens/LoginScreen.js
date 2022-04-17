import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Seperator } from '../component';
import { Colors, Fonts, Images } from '../constants';
import Feather from 'react-native-vector-icons/Feather';
import { Display } from '../utils';
import { useDispatch } from 'react-redux';
import { Login } from '../store/actions';

const LoginScreen = ({ navigation }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [credentials, setCredentials] = useState({
    username: 'Gowtham',
    password: 'Pass*123',
  });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(Login(credentials.username, credentials.password));
  };

  return (
    <View style={styles.container}>
      <Seperator height={StatusBar.currentHeight} />
      <Text style={styles.title}>AuthX</Text>
      <Seperator height={30} />
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name={'user'}
            size={22}
            color={Colors.GREY}
            style={{
              marginRight: 10,
            }}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor={Colors.GREY}
            selectionColor={Colors.GREY}
            style={styles.inputText}
            value={credentials.username}
            onChangeText={text =>
              setCredentials({ ...credentials, username: text })
            }
          />
        </View>
      </View>
      <Seperator height={15} />
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name={'lock'}
            size={22}
            color={Colors.GREY}
            style={{
              marginRight: 10,
            }}
          />
          <TextInput
            secureTextEntry={isPasswordShow ? false : true}
            placeholder="Password"
            placeholderTextColor={Colors.GREY}
            selectionColor={Colors.GREY}
            style={styles.inputText}
            value={credentials.password}
            onChangeText={text =>
              setCredentials({ ...credentials, password: text })
            }
          />
          <Feather
            name={isPasswordShow ? 'eye' : 'eye-off'}
            size={22}
            color={Colors.GREY}
            style={{
              marginRight: 10,
            }}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontFamily: Fonts.VARELA_REGULAR,
    color: Colors.DEFAULT,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.VARELA_REGULAR,
    flex: 1,
  },
  button: {
    backgroundColor: Colors.DEFAULT,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.WHITE,
  },
});

export default LoginScreen;
