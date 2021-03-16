import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

export default function LoginScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.content_container}>
        <Image
          source={require('../images/AppLogo.png')}
          resizeMode="contain"
          style={styles.logo}></Image>
        <View style={styles.inputGrp}>
          <View style={styles.inputEmail_container}>
            <TextInput
              placeholder="Email"
              keyboardAppearance="light"
              textBreakStrategy="simple"
              keyboardType="email-address"
              selectTextOnFocus={true}
              clearButtonMode="while-editing"
              maxLength={125}
              style={styles.inputEmail}></TextInput>
          </View>
          <View style={styles.inputPasswrd_container}>
            <TextInput
              placeholder="Password"
              keyboardAppearance="light"
              secureTextEntry={true}
              maxLength={125}
              style={styles.inputPasswrd}></TextInput>
          </View>
        </View>
        <View style={styles.btnGrp}>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.logInBtn_Txt}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotPasswrdBtn}>
            <Text style={styles.forgotPasswrd_txt}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.footer_divider_grp}>
            <Text style={styles.footer_divider_txt}>──────── OR ────────</Text>
          </View>
          <View style={styles.footer_container}>
            <TouchableOpacity style={styles.signupBtn}>
              <Text style={styles.foot_txt}>Don't have an account? <Text style={styles.signUp_txt}>Sign Up</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  content_container: {
    width: '100%',
    height: '80%',
    marginTop: 115,
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 36,
    alignSelf: 'center',
  },
  inputGrp: {
    height: 115,
    marginTop: 63,
    width: '80%',
  },
  inputEmail_container: {
    width: '100%',
    height: 37,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
  },
  inputEmail: {
    color: '#121212',
    height: 37,
    width: '90%',
    textAlign: 'left',
    marginLeft: 3,
    marginRight: 3,
    letterSpacing: 0,
    fontSize: 16,
    alignSelf: 'center',
  },
  inputPasswrd_container: {
    width: '100%',
    height: 37,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    marginTop: 29,
  },
  inputPasswrd: {
    color: '#121212',
    height: 37,
    width: '90%',
    textAlign: 'left',
    marginLeft: 3,
    marginRight: 3,
    fontSize: 16,
    alignSelf: 'center',
  },
  btnGrp: {
    height: 163,
    marginTop: 25,
    width: '80%',
  },
  loginBtn: {
    height: 35,
    backgroundColor: 'rgba(82,110,255,1)',
    justifyContent: 'center',
    marginTop: 2,
    width: '100%',
  },
  logInBtn_Txt: {
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  forgotPasswrdBtn: {
    width: '100%',
    height: 21,
    marginTop: 39,
    alignSelf: 'center',
  },
  forgotPasswrd_txt: {
    color: '#121212',
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
  footer_divider_grp: {
    height: 20,
    justifyContent: 'center',
    marginTop: 3,
    width: '100%',
  },
  footer_divider_txt: {
    color: '#121212',
    width: '80%',
    height: 17,
    textAlign: 'center',
    alignSelf: 'center',
  },
  footer_container: {
    width: 231,
    height: 21,
    flexDirection: 'row',
    marginTop: 6,
    textAlign: 'center',
    alignSelf: 'center',
  },
  foot_txt: {
    color: '#121212',
    fontSize: 16,
  },
  signupBtn: {
    width: 300,
    textAlign: 'center',
    alignSelf: 'center',
  },
  signUp_txt: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
