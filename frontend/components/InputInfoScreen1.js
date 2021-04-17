import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
	Dimensions,
} from "react-native";
// import InputScreen2 from "./InputInfoScreen2";

//import DatePicker from "@dietime/react-native-date-picker";
//import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';
import { Card } from 'react-native-elements';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CollapsibleView from "@eliav2/react-native-collapsible-view";

const items1 = [
	// this is the parent or 'item'
	{
		name: 'United States',
		id: 0,
		// these are the children or 'sub items'
		children: [
			{
				name: 'No Preference',
				id: 1,
			},
			{
				name: 'Alabama',
				id: 2,
			},
			{
				name: 'Alaska',
				id: 3,
			},
			{
				name: 'Arizona',
				id: 4,
			},
			{
				name: 'Arkansas',
				id: 5,
			},
			{
				name: 'California',
				id: 6,
			},
			{
				name: 'Colorado',
				id: 7,
			},
			{
				name: 'Connecticut',
				id: 8,
			},
			{
				name: 'Delaware',
				id: 9,
			},
			{
				name: 'Flordia',
				id: 10,
			},
			{
				name: 'Georgia',
				id: 11,
			},
			{
				name: 'Hawaii',
				id: 12,
			},
			{
				name: 'Idaho',
				id: 13,
			},
			{
				name: 'Illinois',
				id: 14,
			},
			{
				name: 'Indiana',
				id: 15,
			},
			{
				name: 'Iowa',
				id: 16,
			},
			{
				name: 'Kansas',
				id: 17,
			},
			{
				name: 'Kentucky',
				id: 18,
			},
			{
				name: 'Louisiana',
				id: 19,
			},
			{
				name: 'Maine',
				id: 20,
			},
			{
				name: 'Maryland',
				id: 21,
			},
			{
				name: 'Massachusetts',
				id: 22,
			},
			{
				name: 'Michigan',
				id: 23,
			},
			{
				name: 'Minnesota',
				id: 24,
			},
			{
				name: 'Mississippi',
				id: 25,
			},
			{
				name: 'Missouri',
				id: 26,
			},
			{
				name: 'Montana',
				id: 27,
			},
			{
				name: 'Nebraska',
				id: 28,
			},
			{
				name: 'Nevada',
				id: 29,
			},
			{
				name: 'New Hampshire',
				id: 30,
			},
			{
				name: 'New Jersey',
				id: 31,
			},
			{
				name: 'New Mexico',
				id: 32,
			},
			{
				name: 'New York',
				id: 33,
			},
			{
				name: 'North Carolina',
				id: 34,
			},
			{
				name: 'North Dakota',
				id: 35,
			},
			{
				name: 'Ohio',
				id: 36,
			},
			{
				name: 'Oklahoma',
				id: 37,
			},
			{
				name: 'Oregon',
				id: 38,
			},
			{
				name: 'Pennsylvania',
				id: 39,
			},
			{
				name: 'Rhode Island',
				id: 40,
			},
			{
				name: 'South Carolina',
				id: 41,
			},
			{
				name: 'South Dakota',
				id: 42,
			},
			{
				name: 'Tennessee',
				id: 43,
			},
			{
				name: 'Texas',
				id: 44,
			},
			{
				name: 'Utah',
				id: 45,
			},
			{
				name: 'Vermont',
				id: 46,
			},
			{
				name: 'Virginia',
				id: 47,
			},
			{
				name: 'Washington',
				id: 48,
			},
			{
				name: 'West Virgina',
				id: 49,
			},
			{
				name: 'Wisconsin',
				id: 50,
			},
			{
				name: 'Wyoming',
				id: 51,
			},
		],
	},
];

// hiding keyboard function on touch outside
const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);

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
			selectedItems: [],
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

	onSubmit() {
		let noInput = "";
		if (this.state.gender.localeCompare(noInput) != 0 && this.state.dob.localeCompare(noInput) != 0 /*&& this.state.zip.localeCompare(noInput) != 0 */ && this.state.gpa.localeCompare(noInput) != 0) {
			this.props.navigation.navigate('InputScreen2', {
				email: this.state.email,
				gender: this.state.gender,
				dob: this.state.dob,
				zip: this.state.zip,
				gpa: this.state.gpa,
			})
			console.log(this.state.zip);
		}
		/*
		else if(this.state.zip.localeCompare(noInput) == 0)
		{
			alert("Error, incomplete or invalid Zip code");
		}
		*/
		else {
			alert("Please Fill All Fields Before Submitting");
		}
	}

	onSelectedItemsChange = (selectedItems) => {
		this.setState({ selectedItems });
	};

	handleGender(text) {
		this.setState({
			gender: text,
		});
	}

	handleDOB(text) {
		//let textStr = String(text);
		let invalidVal1 = "0";
		let invalidVal2 = "00";
		if (text.localeCompare(invalidVal1) != 0 && text.localeCompare(invalidVal2) != 0) {
			this.setState({
				dob: text,
			});
		}
		else {
			alert("Please enter a valid age");
		}
	}

	handleZip(text) {
		//Error Checking for User Zip Code input
		//Lowest US Zip code is 00501, Highest US Zip Code is 99950
		let zipInt = parseInt(text, 10);
		//console.log(zipInt);
		if ((zipInt >= 501) && (zipInt <= 99950) && (text.length > 4)) {
			this.setState({
				zip: text,
			});
			//console.log("ZipInt: "+zipInt +" Current Length: "+text.length+ " current state: " + this.state.zip);
		}
		else if (text.length < 5) {
			console.log("waiting for user input" + " " + text.length);
		}
		else {
			alert("Please enter a valid zip code")
		}
		//console.log(this.state.zip);
	}

	handleGPA(text) {
		let gpaFloat = parseFloat(text);
		if (gpaFloat >= 0.0 && gpaFloat <= 5.0) {
			this.setState({
				gpa: text,
			});
		}
		else {
			alert("Please enter a valid GPA");
		}
	}

	render() {
		// console.log("DOB is: " + this.state.dob);
		return (
			<DismissKeyboard>
				<KeyboardAwareScrollView
					style={styles.container}>
					<View style={styles.collapsibleContainer}>
						<Card elevation={7}>
							{/* <Card.Title>Required Information</Card.Title> */}
							{/* <Text style={styles.requiredDetails}>Required Details</Text> */}
							<Text style={styles.re_text}>Required Quesetions</Text>
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
								<Text style={styles.txt_dob}>Age</Text>
								<TextInput
									onChangeText={this.handleDOB}
									placeholder="16"
									keyboardType="numeric"
									maxLength={2}
									style={styles.input2}
								></TextInput>
							</View>
							<View style={styles.input3_grp}>
								<Text style={styles.txt_zip}>State of Residence and/or Schooling</Text>
								<SectionedMultiSelect
									items={items1}
									IconRenderer={MaterialIcons}
									uniqueKey="id"
									subKey="children"
									selectText="Choose State(s) If Applicable"
									style={{ margin: 20 }}
									showDropDowns={true}
									readOnlyHeadings={true}
									onSelectedItemsChange={this.onSelectedItemsChange}
									selectedItems={this.state.selectedItems}
								/>
							</View>
							<View style={styles.input4_grp}>
								<Text style={styles.txt_gpa}>GPA</Text>
								<TextInput
									onChangeText={this.handleGPA}
									placeholder="4.0"
									keyboardType="numeric"
									autoFocus={true}
									style={styles.input4}
									maxLength={4}
								></TextInput>
							</View>
						</Card>

						<CollapsibleView
							title="Optional Questions"
							style={styles.col_view}
						>
							<Card
								containerStyle={styles.card}
							>
								{/* <View style={styles.containerGrp1}>
            		 <View style={styles.containerBkground1}> */}
								{/* <Text style={styles.optionalDetails}>Optional Details</Text> */}

								<View style={styles.grp1}>
									<Text style={styles.txt_major}>Academic Major:</Text>
									<SectionedMultiSelect
										style={{ margin: 30 }}
										items={items1.slice(0, items1.length - 4)}
										IconRenderer={MaterialIcons}
										uniqueKey="name"
										subKey="children"
										selectText="Choose your major"
										showDropDowns={true}
										readOnlyHeadings={true}
										onSelectedItemsChange={this.onSelectedItemsChange}
										selectedItems={this.state.selectedItems}
									/>
								</View>
								<View style={styles.grp2}>
									<Text style={styles.txt_race}>Race:</Text>
									<SectionedMultiSelect
										style={{ margin: 30 }}
										items={items1.slice(items1.length - 4, items1.length - 4 + 1)}
										IconRenderer={MaterialIcons}
										uniqueKey="name"
										subKey="children"
										selectText="Select all that apply"
										showDropDowns={true}
										readOnlyHeadings={true}
										onSelectedItemsChange={this.onSelectedItemsChange2}
										selectedItems={this.state.selectedItems2}
									/>
								</View>
								<View style={styles.grp3}>
									<Text style={styles.txt_religion}>Religion:</Text>
									<SectionedMultiSelect
										style={{ margin: 30 }}
										items={items1.slice(items1.length - 3, items1.length - 3 + 1)}
										IconRenderer={MaterialIcons}
										uniqueKey="name"
										subKey="children"
										selectText="Select all that apply"
										showDropDowns={true}
										readOnlyHeadings={true}
										onSelectedItemsChange={this.onSelectedItemsChange3}
										selectedItems={this.state.selectedItems3}
									/>
								</View>
								<View style={styles.grp4}>
									<Text style={styles.txt_disability}>Disabilities:</Text>
									<SectionedMultiSelect
										style={{ margin: 30 }}
										items={items1.slice(items1.length - 2, items1.length - 2 + 1)}
										IconRenderer={MaterialIcons}
										uniqueKey="name"
										subKey="children"
										selectText="Select all that apply"
										showDropDowns={true}
										readOnlyHeadings={true}
										onSelectedItemsChange={this.onSelectedItemsChange4}
										selectedItems={this.state.selectedItems4}
									/>
								</View>
								<View style={styles.grp5}>
									<Text style={styles.txt_testScore}>Test Scores:</Text>
									<TextInput
										onChangeText={this.handleSAT}
										placeholder="SAT"
										keyboardType="numeric"
										style={styles.input6}
										maxLength={4}
									></TextInput>
									<TextInput
										onChangeText={this.handleACT}
										placeholder="ACT"
										keyboardType="numeric"
										style={styles.input61}
										maxLength={2}
									></TextInput>
								</View>
								<View style={styles.grp6}>
									<Text style={styles.txt_testScore}>Ethnicity:</Text>
									<SectionedMultiSelect
										style={{ margin: 30 }}
										items={items1.slice(items1.length - 1, items1.length)}
										IconRenderer={MaterialIcons}
										uniqueKey="name"
										subKey="children"
										selectText="Select all that apply"
										showDropDowns={true}
										readOnlyHeadings={true}
										onSelectedItemsChange={this.onSelectedItemsChange5}
										selectedItems={this.state.selectedItems5}
									/>
								</View>

								{/* </View>
       						   </View> */}
								{/* </KeyboardAwareScrollView> */}
							</Card>
						</CollapsibleView>

						<View style={styles.submit_grp}>
							<TouchableOpacity
								onPress={() =>
									this.onSubmit()
								}
								style={styles.btn_submit}
							>
								<Text style={styles.next}>Submit</Text>
							</TouchableOpacity>
						</View>

						{/* <View style={styles.op_submit_grp}>
							<TouchableOpacity
								onPress={() => this.upload2sever()}
								style={styles.txt_submit}
							>
								<Text style={styles.op_btn_submit}>Submit</Text>
							</TouchableOpacity>
						</View> */}

					</View>
				</KeyboardAwareScrollView>
			</DismissKeyboard>
		);
	}


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		height: "100%",
	},
	col_view: {
		flex: 1,
		width: '92.4%',
		borderWidth: 2,
		marginLeft: 14.7,
		justifyContent: 'center',
		borderColor: '#e4ebef',
	},
	collapsibleContainer: {
		flex: 1,
		width: "100%",
		backgroundColor: "white",
		justifyContent: 'center',
	},
	card: {
		borderWidth: 0, // Remove Border
		shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow IOS
		shadowOffset: { height: 0, width: 0 },
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation: 0 // This is for Android
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
	re_text: {
		fontSize: 18,
		textAlign: 'center',
		paddingTop: 5,
		paddingBottom: 10,
		color: '#3385ff',
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
		height: "auto",
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
		width: "85%",
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

	AwardView: {
		flex: 1,
		minHeight: Dimensions.get("window").height - 220,
	},
	container: {
		flex: 1,
	},
	containerGrp1: {
		backgroundColor: "rgba(230, 230, 230,1)",
		flex: 1,
	},
	containerBkground1: {
		height: 685,
		backgroundColor: "rgba(255,255,255,1)",
		marginTop: 20,
	},
	optionalDetails: {
		fontWeight: "bold",
		color: "#121212",
		fontSize: 20,
		marginTop: 25,
		marginLeft: 20,
	},
	grp1: {
		width: "100%",
		height: "auto",
		// marginTop: 22,
		// marginLeft: 10,
	},
	txt_major: {
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
	grp2: {
		width: "100%",
		height: "auto",
		// marginTop: 85,
		// marginLeft: 10,
	},
	txt_race: {
		fontWeight: "bold",
		color: "#121212",
		fontSize: 15,
		marginLeft: 9,
	},
	input2: {
		color: "#121212",
		height: 30,
		width: "93%",
		marginTop: 2,
		marginLeft: 9,
	},
	grp3: {
		width: "100%",
		height: "auto",
		marginTop: 20,
		// marginLeft: 10,
	},
	txt_religion: {
		fontWeight: "bold",
		color: "#121212",
		fontSize: 15,
		marginLeft: 9,
	},
	input3: {
		color: "#121212",
		height: 30,
		width: "93%",
		marginTop: 2,
		marginLeft: 9,
	},
	grp4: {
		width: "100%",
		height: "auto",
		marginTop: 20,
		// marginLeft: 10,
	},
	txt_disability: {
		fontWeight: "bold",
		color: "#121212",
		fontSize: 15,
		marginLeft: 9,
	},
	input5: {
		color: "#121212",
		height: 30,
		width: "93%",
		marginTop: 2,
		marginLeft: 9,
	},
	grp5: {
		width: "100%",
		height: 50,
		marginTop: 20,
		// marginLeft: 10,
	},
	grp6: {
		width: "100%",
		height: "auto",
		marginTop: 40,
		// marginLeft: 10,
	},
	txt_testScore: {
		fontWeight: "bold",
		color: "#121212",
		fontSize: 15,
		marginLeft: 9,
	},
	input6: {
		color: "#121212",
		height: 30,
		width: "93%",
		marginTop: 2,
		marginLeft: 9,
	},
	input61: {
		color: "#121212",
		height: 30,
		width: "93%",
		marginTop: 2,
		marginLeft: 9,
		marginBottom: 10,
	},
	input7: {
		color: "#121212",
		height: 30,
		width: "95%",
		marginTop: 5,
		marginLeft: 9,
	},
	input8: {
		color: "#121212",
		height: 30,
		width: "93%",
		marginTop: 2,
		marginLeft: 9,
	},
	input9: {
		color: "#121212",
		height: 30,
		width: "93%",
		marginTop: 5,
		marginLeft: 9,
	},
	input10: {
		color: "#121212",
		height: 30,
		width: "93%",
		marginTop: 5,
		marginLeft: 9,
	},
	op_submit_grp: {
		width: "100%",
		height: 40,
		marginTop: 16,
		// marginLeft: 15,
	},
	txt_submit: {
		width: "100%",
		height: 40,
		backgroundColor: "#4a76ff",
		alignSelf: "center",
	},
	op_btn_submit: {
		color: "rgba(255,255,255,1)",
		fontSize: 16,
		marginTop: 10,
		alignSelf: "center",
	},
});
