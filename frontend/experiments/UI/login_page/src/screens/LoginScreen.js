import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text
} from "react-native";

function LoginScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <View style={styles.content_container}>
          <Image
            source={require("../assets/images/Screen_Shot_2021-02-25_at_1.46.39_PM.png")}
            resizeMode="contain"
            style={styles.logo}
          ></Image>
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
                style={styles.inputEmail}
              ></TextInput>
            </View>
            <View style={styles.inputPasswrd_container}>
              <TextInput
                placeholder="Password"
                keyboardAppearance="light"
                secureTextEntry={true}
                maxLength={125}
                style={styles.inputPasswrd}
              ></TextInput>
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
              <Text style={styles.footer_divider_txt}>
                ────────────── OR ──────────────
              </Text>
            </View>
            <View style={styles.footer_container}>
              <View style={styles.foot_txtRow}>
                <Text style={styles.foot_txt}>Don&#39;t have an account?</Text>
                <TouchableOpacity style={styles.signupBtn}>
                  <Text style={styles.signUp_txt}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)"
  },
  group: {
    flex: 1
  },
  content_container: {
    width: 305,
    height: 545,
    marginTop: 115,
    marginLeft: 27
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 36,
    alignSelf: "center"
  },
  inputGrp: {
    height: 115,
    marginTop: 63
  },
  inputEmail_container: {
    height: 37,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center"
  },
  inputEmail: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 37,
    width: 230,
    textAlign: "left",
    letterSpacing: 0,
    fontSize: 16,
    alignSelf: "center"
  },
  inputPasswrd_container: {
    height: 37,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    marginTop: 29
  },
  inputPasswrd: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 37,
    width: 230,
    fontSize: 16,
    alignSelf: "center"
  },
  btnGrp: {
    height: 163,
    marginTop: 25
  },
  loginBtn: {
    height: 35,
    backgroundColor: "rgba(82,110,255,1)",
    justifyContent: "center",
    marginTop: 2
  },
  logInBtn_Txt: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center"
  },
  forgotPasswrdBtn: {
    width: 140,
    height: 21,
    marginTop: 39,
    marginLeft: 88,
    alignSelf: "center"
  },
  forgotPasswrd_txt: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    textAlign: "center",
    flex: 1
  },
  footer_divider_grp: {
    height: 20,
    justifyContent: "center",
    marginTop: 3
  },
  footer_divider_txt: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: 330,
    height: 17,
    textAlign: "center",
    alignSelf: "center"
  },
  footer_container: {
    width: 231,
    height: 21,
    flexDirection: "row",
    marginTop: 6,
    marginLeft: 37
  },
  foot_txt: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16
  },
  signupBtn: {
    width: 65,
    height: 20,
    justifyContent: "center",
    marginLeft: 8
  },
  signUp_txt: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16
  },
  foot_txtRow: {
    height: 20,
    flexDirection: "row",
    flex: 1,
    marginRight: -5,
    marginLeft: -1,
    marginTop: -1
  }
});

export default LoginScreen;
