import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	Text,
} from 'react-native';
import BeautyWebView from 'react-native-beauty-webview';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { set } from 'react-native-reanimated';
// import * as WebBrowser from 'expo-web-browser';

export default function LoginScreen(props) {

	const [signUpClicked, setSignUpClicked] = useState(false);
	const [forgotPaswrdClicked, setForgotPaswrdClicked] = useState(false);

	// sign up
	const [visible, setVisible] = useState(false);

	// forgot password
	const [visible2, setVisible2] = useState(false);

	const [applyLink, setApplyLink] = useState("");

	const signUpBtnHandler = () => {
		// sign up button handler
		setVisible(true);
	};

	const forgotPaswrdBtnHandler = () => {
		// forgot password handler
		setVisible2(true);
	}

	const [inputEmail, setEmail] = useState('');
	const [inputPassword, setPassword] = useState('');

	

	const openForGotPassword = (link) => {
		// let link = state.scholarshipObj.applyLink;
		if (forgotPaswrdClicked) {
			WebBrowser.openBrowserAsync(link);
		}

		setForgotPaswrdClicked(false);
	  };

	const openSignUp = (link) => {
		// let link = state.scholarshipObj.applyLink;
		if (signUpClicked) {
			WebBrowser.openBrowserAsync(link);
		}

		setSignUpClicked(false);
		
	  };

	const isClicked = (type) => {
		if (type === "signup"){
			setSignUpClicked(true);
			openSignUp("<Host IP>/api/v1.2/managements/users/signup");
		} else {
			setForgotPaswrdClicked(true);
			openForGotPassword("<Host IP>/api/v1.2/managements/users/forgotpassword");
		}
	}
	

	return (
		<KeyboardAwareScrollView
			style={styles.container}>
			<View style={styles.content_container}>
				<Image
					source={require('../assets/AppLogo.png')}
					resizeMode="contain"
					style={styles.logo}></Image>
				<View style={styles.inputGrp}>
					<View style={styles.inputEmail_container}>
						<TextInput
							adaptKeyboard
							onChangeText={(value) => setEmail(value)}
							placeholder="Email"
							keyboardAppearance="light"
							textBreakStrategy="simple"
							keyboardType="email-address"
							selectTextOnFocus={true}
							clearButtonMode="while-editing"
							clearTextOnFocus={true}
							maxLength={125}
							style={styles.inputEmail}>
						</TextInput>
					</View>
					<View style={styles.inputPasswrd_container}>
						<TextInput
							adaptKeyboard
							onChangeText={(value) => setPassword(value)}
							placeholder="Password"
							keyboardAppearance="light"
							secureTextEntry={true}
							maxLength={125}
							style={styles.inputPasswrd}></TextInput>
					</View>
				</View>
				<View style={styles.btnGrp}>
					<TouchableOpacity style={styles.loginBtn} onPress={() => { props.signIn(inputEmail, inputPassword) }}>
						<Text style={styles.logInBtn_Txt}>Log In</Text>
					</TouchableOpacity>
					
					<BeautyWebView
						// Reguired for open and close
						visible={visible2}
						// Reguired for closing the modal
						onPressClose={() => setVisible2(false)}
						// use tunnel network here to local test env
						url={'<Host IP>/api/v1.2/managements/users/forgotpassword'}
					/>
					<TouchableOpacity style={styles.forgotPasswrdBtn} onPress={forgotPaswrdBtnHandler}>
					{/* <TouchableOpacity style={styles.forgotPasswrdBtn} onPress={isClicked("forgot")}> */}
						<Text style={styles.forgotPasswrd_txt}>Forgot Password?</Text>
					</TouchableOpacity>
					<View style={styles.footer_divider_grp}>
						<Text style={styles.footer_divider_txt}>──────── OR ────────</Text>
					</View>
					<View style={styles.footer_container}>
						<BeautyWebView
							// Reguired for open and close
							visible={visible}
							// Reguired for closing the modal
							onPressClose={() => setVisible(false)}
							// use tunnel network here to local test env
							url={'<Host IP>/api/v1.2/managements/users/signup'}
						/>
						<TouchableOpacity style={styles.signupBtn} onPress={signUpBtnHandler}>
						{/* <TouchableOpacity style={styles.signupBtn} onPress={(isClicked("signup"))}> */}
							<Text style={styles.foot_txt}>Don't have an account? <Text style={styles.signUp_txt}>Sign Up</Text></Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: 'rgba(255,255,255,1)',
	},
	content_container: {
		width: '100%',
		height: '80%',
		marginTop: 110,
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
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
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
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
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
		height: 40,
		borderRadius: 5,
		backgroundColor: '#007FF9',
		justifyContent: 'center',
		// marginTop: 2,
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
