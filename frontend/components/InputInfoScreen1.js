import React from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Platform,
} from "react-native";
// import InputScreen2 from "./InputInfoScreen2";

//import DatePicker from "@dietime/react-native-date-picker";
//import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';
import { Card } from 'react-native-elements';

export default function InputInfoScreen1({ route, navigation }) {
	// console.log("Email from InputScreen1: " + JSON.stringify(route.params.email));
	// console.log("navigation from InputScreen1: " + JSON.stringify(navigation));

	// Delete the email attribute to get rid of the error for now - email={route.params.email} 
	return <InputScreen1a navigation={navigation} />;
}

class InputScreen1a extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: this.props.email,
			gender: "",
			dob: "",
			zip: "",
			gpa: "",
		};
		this.handleGender = this.handleGender.bind(this);
		this.handleDOB = this.handleDOB.bind(this);
		this.handleZip = this.handleZip.bind(this);
		this.handleGPA = this.handleGPA.bind(this);
		/*
		this.reformatDate = this.reformatDate.bind(this);
		this.assignReformattDate = this.assignReformatDate.bind(this);
		*/
	}

	/*
	reformatDate(dateStr) {
		//Function takes in date String as stored by external library and converts to format suitable for backend purposes
		//Converts Date from "1925-05-04T23:00:00.000Z" format to "MM-DD-YYYY"

		//Retrieving semi-desired format for day
		let day = dateStr.getDate();
		console.log("Day is: "+day)
		//Converting date-day value to string value for purposes of checking length
		let dayStr = String(day);

		//If the lenth of the String is less than 2, ie the raw date value is one digit, like "5", it is to be converted to "05"
		if (dayStr.length < 2) {
			dayStr = "0" + dayStr;
		}
		//Retrieving semi-desired format for month
		let month = dateStr.getMonth() + 1;

		//Converting date-month value to String value ofr purposes of checking length
		let monthStr = String(month);

		//If the length of the String is less than 2, ie the raw date value is one digit, like "3", it is to be converted to "03"
		if (monthStr.length < 2) {
			monthStr = "0" + monthStr;
		}
		//Retrieving the semi-desired format for year
		let year = dateStr.getFullYear();
		//Converting year to String value for reliable concatenation 
		let yearStr = String(year);
		
		// TODO: date must be in "mm/dd/yyyy" format.
		let formattedString = dayStr + "/" + monthStr + "/" + yearStr;
		console.log("formattedString:"+ formattedString);
		return formattedString;
	}


	assignReformatDate(dateStr) {
		//Function Feeds converted date to DOBhandler
		let formattedDate = this.reformatDate(dateStr);
		//console.log(formattedDate);
		let formattedDateStr = String(formattedDate);
		console.log("Date: " + formattedDateStr);
		final_date = this.handleDOB(formattedDateStr);
		console.log(this.state.dob);
	}
	*/

	onSubmit(){
		let noInput = "";
		if(this.state.gender.localeCompare(noInput)!= 0 && this.state.dob.localeCompare(noInput) != 0 && this.state.zip.localeCompare(noInput) != 0 && this.state.gpa.localeCompare(noInput)!= 0)
		{
			this.props.navigation.navigate('InputScreen2', {
				email: this.state.email,
				gender: this.state.gender,
				dob: this.state.dob,
				zip: this.state.zip,
				gpa: this.state.gpa,
			})
			console.log(this.state.zip);
		}
		else
		{
			alert("Please Fill All Fields Before Submitting");
		}
	}

	handleGender(text) {
		this.setState({
			gender: text,
		});
	}

	handleDOB(text) {
		//let textStr = String(text);
		let invalidVal1 = "0";
		let invalidVal2 = "00";
		if(text.localeCompare(invalidVal1) !=0 && text.localeCompare(invalidVal2) != 0)
		{
		this.setState({
			dob: text,
		});
		}
		else
		{
			alert("Please enter a valid age");
		}
	}

	handleZip(text) {
		//Error Checking for User Zip Code input
		//Lowest US Zip code is 00501, Highest US Zip Code is 99950
		let zipInt = parseInt(text, 10);
		//console.log(zipInt);
		if((zipInt >= 501) && (zipInt <= 99950) && (text.length > 4))
		{
			this.setState({
			zip: text,
			});
		//console.log("ZipInt: "+zipInt +" Current Length: "+text.length+ " current state: " + this.state.zip);
		}
		else if(text.length < 5)
		{
			console.log("waiting for user input" + " "+text.length);
		}
		else
		{
			alert("Please enter a valid zip code")
		}
		//console.log(this.state.zip);
	}

	handleGPA(text) {
		let gpaFloat = parseFloat(text);
		if(gpaFloat >= 0.0 && gpaFloat <= 5.0)
		{
		this.setState({
			gpa: text,
		});
		}
		else
		{
			alert("Please enter a valid GPA");
		}
	}

	render() {
		// console.log("DOB is: " + this.state.dob);
		return (
			<View style={styles.container}>
				<Card elevation={7}>
					{/* <Card.Title>Required Information</Card.Title> */}
					{/* <Text style={styles.requiredDetails}>Required Details</Text> */}
					<View style={styles.input1_grp}>
						<Text style={styles.txt_gender}>Gender</Text>
						<DropDownPicker
							items={[
								{ label: 'Male', value: 'Male' },
								{ label: 'Female', value: 'Female' },
								{ label: 'Transgender', value: 'Transgender' },
								{ label: 'Other', value: 'Other' },
							]}
							defaultIndex={0}
							containerStyle={{ height: 30, marginTop: 8 }}
							itemStyle={{ justifyContent: 'flex-start' }}
							//dropDownStyle={{marginTop: 2}}
							//dropDownStyle={{backgroundColor: '#fafafa', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}
							onChangeItem={item => this.handleGender(item.value)}

						/>
					</View>
					<View style={styles.input2_grp}>
						<Text style={styles.txt_dob}>Please enter your age</Text>
						<TextInput
							onChangeText={this.handleDOB}
							placeholder="16"
							keyboardType="numeric"
							maxLength={2}
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
							maxLength={5}
						></TextInput>
					</View>
					<View style={styles.input4_grp}>
						<Text style={styles.txt_gpa}>GPA</Text>
						<TextInput
							onChangeText={this.handleGPA}
							placeholder="4.0"
							keyboardType="numeric"
							style={styles.input4}
							maxLength={4}
						></TextInput>
					</View>
					<View style={styles.submit_grp}>
						<TouchableOpacity
							onPress={() =>
								this.onSubmit()
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
		...Platform.OS !== 'android' && {
			zIndex: 1,
		},
		// position: 'relative',
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
		// zIndex: -1,
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
		// zIndex: -1,
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
		// zIndex: -1,
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
		// zIndex: -1,
	},
	btn_submit: {
		width: "100%",
		height: 40,
		backgroundColor: "#4a76ff",
		alignSelf: "center",
	},
	next: {
		color: "rgba(255,255,255,1)",
		fontSize: 16,
		marginTop: 10,
		alignSelf: "center",
	},
});
