import React from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
// import InputScreen2 from "./InputInfoScreen2";

import { Card } from 'react-native-elements';

export default class InputScreen1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// email: this.props.emailx,
			gender: "",
			dob: "",
			zip: "",
			gpa: "",
		};
		this.handleGender = this.handleGender.bind(this);
		this.handleDOB = this.handleDOB.bind(this);
		this.handleZip = this.handleZip.bind(this);
		this.handleGPA = this.handleGPA.bind(this);
	}

	handleGender(text) {
		this.setState({
			gender: text,
		});
	}

	handleDOB(text) {
		this.setState({
			dob: text,
		});
	}

	handleZip(text) {
		this.setState({
			zip: text,
		});
	}

	handleGPA(text) {
		this.setState({
			gpa: text,
		});
	}

	render() {
		// console.log("Input 1 Screen: " + JSON.stringify(this.props));
		return (
			<View style={styles.container}>
				<Card elevation={7}>
					{/* <Card.Title>Required Information</Card.Title> */}
					{/* <Text style={styles.requiredDetails}>Required Details</Text> */}
					<View style={styles.input1_grp}>
						<Text style={styles.txt_gender}>Gender</Text>
						<TextInput
							onChangeText={this.handleGender}
							placeholder="Male"
							style={styles.input1}
						></TextInput>
					</View>
					<View style={styles.input2_grp}>
						<Text style={styles.txt_dob}>Date of Birth</Text>
						<TextInput
							onChangeText={this.handleDOB}
							placeholder="mm/dd/yyyy"
							// keyboardType="phone-pad"
							style={styles.input2}
						></TextInput>
					</View>
					<View style={styles.input3_grp}>
						<Text style={styles.txt_zip}>Zip Code</Text>
						<TextInput
							onChangeText={this.handleZip}
							placeholder="12345"
							keyboardType="numeric"
							style={styles.input3}
						></TextInput>
					</View>
					<View style={styles.input4_grp}>
						<Text style={styles.txt_gpa}>GPA</Text>
						<TextInput
							onChangeText={this.handleGPA}
							placeholder="4.0"
							keyboardType="numeric"
							style={styles.input4}
						></TextInput>
					</View>
					<View style={styles.submit_grp}>
						<TouchableOpacity
							onPress={() =>
								this.props.navigation.navigate('InputScreen2', {
									// email: this.state.email,
									gender: this.state.gender,
									dob: this.state.dob,
									zip: this.state.zip,
									gpa: this.state.gpa,
								})
							}
							style={styles.btn_submit}
						>
							<Text style={styles.next}>Next</Text>
						</TouchableOpacity>
					</View>
				</Card>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	requiredDetails: {
		fontWeight: "bold",
		color: "black",
		lineHeight: 0,
		fontSize: 20,
		// marginTop: 34,
		marginLeft: 20,
	},
	input1_grp: {
		width: "100%",
		height: 50,
		// marginTop: 37,
		// marginLeft: 10,
	},
	txt_gender: {
		fontWeight: "bold",
		color: "#121212",
		fontSize: 15,
		marginLeft: 9,
	},
	input1: {
		color: "#121212",
		height: 30,
		width: "95%",
		marginTop: 2,
		marginLeft: 9,
	},
	input2_grp: {
		width: "100%",
		height: 50,
		marginTop: 15,
	},
	txt_dob: {
		fontWeight: "bold",
		color: "#121212",
		fontSize: 15,
		marginLeft: 9,
	},
	input2: {
		color: "#121212",
		height: 30,
		width: "95%",
		marginTop: 2,
		marginLeft: 9,
	},
	input3_grp: {
		width: "100%",
		height: 50,
		marginTop: 15,
		// marginLeft: 10,
	},
	txt_zip: {
		fontWeight: "bold",
		color: "#121212",
		fontSize: 15,
		marginLeft: 9,
	},
	input3: {
		color: "#121212",
		height: 30,
		width: "95%",
		marginTop: 2,
		marginLeft: 9,
	},
	input4_grp: {
		width: "100%",
		height: 50,
		marginTop: 15,
		// marginLeft: 10,
	},
	txt_gpa: {
		fontWeight: "bold",
		color: "#121212",
		fontSize: 15,
		marginLeft: 9,
	},
	input4: {
		color: "#121212",
		height: 30,
		width: "95%",
		marginTop: 2,
		marginLeft: 9,
	},
	submit_grp: {
		width: "100%",
		height: 40,
		marginTop: 20,
		// marginLeft: 15,
	},
	btn_submit: {
		width: "100%",
		height: 40,
		backgroundColor: "rgba(0,149,47,1)",
		alignSelf: "center",
	},
	next: {
		color: "rgba(255,255,255,1)",
		fontSize: 16,
		marginTop: 10,
		alignSelf: "center",
	},
});
