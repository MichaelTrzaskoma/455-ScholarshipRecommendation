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

const items2 = [
	// this is the parent or 'item'
	{
		name: 'Arts',
		id: 0,
		// these are the children or 'sub items'
		children: [
			{
				name: 'Art',
				id: 11,
			},
			{
				name: 'Design',
				id: 12,
			},
			{
				name: 'Film and Photography',
				id: 13,
			},
			{
				name: 'Film',
				id: 14,
			},
			{
				name: 'Photography',
				id: 15,
			},
			{
				name: 'Music',
				id: 16,
			},
		],
	},
	{
		name: 'Business',
		id: 2,
		children: [
			{
				name: 'Business Management',
				id: 21,
			},
			{
				name: 'Business and Management',
				id: 22,
			},
			{
				name: 'Finance and Accounting',
				id: 23,
			},
			{
				name: 'Sports Management',
				id: 24,
			},
		],
	},
	{
		name: 'Education',
		id: 3,
		children: [
			{
				name: 'Education',
				id: 31
			},
		],
	},
	{
		name: 'Health Professions',
		id: 4,
		children: [
			{
				name: 'Dental',
				id: 41,
			},
			{
				name: 'Food and Nutrition',
				id: 42,
			},
			{
				name: 'Health Care',
				id: 43,
			},
			{
				name: 'Health',
				id: 43,
			},
			{
				name: 'Kinesiology',
				id: 44,
			},
			{
				name: 'Physical Therapy',
				id: 45,
			},
			{
				name: "Kinesiology and Physical Therapy",
				id: 46,
			},
			{
				name: 'Medical',
				id: 47
			},
			{
				name: 'Nursing',
				id: 48,
			},
			{
				name: 'Public Health',
				id: 49,
			},
			{
				name: 'Veterinary',
				id: 491,
			}
		],
	},
	{
		name: 'Humanities',
		id: 5,
		children: [
			{
				name: 'Anthropology',
				id: 51,
			},
			{
				name: 'Communications',
				id: 52,
			},
			{
				name: 'Economics',
				id: 53,
			},
			{
				name: 'English',
				id: 54,
			},
			{
				name: 'Foreign Language',
				id: 55,
			},
			{
				name: 'History',
				id: 56,
			},
			{
				name: 'International Relations',
				id: 57,
			},
			{
				name: 'Legal Studies',
				id: 58,
			},
			{
				name: 'Philosophy',
				id: 59,
			},
			{
				name: 'Political Science',
				id: 591,
			},
			{
				name: 'Psychology',
				id: 592,
			},
			{
				name: 'Public Policy and Social Services',
				id: 593,
			},
			{
				name: 'Religious Studies',
				id: 594,
			}
		],
	},
	{
		name: 'Protective Services',
		id: 6,
		children: [
			{
				name: 'Criminal Justice',
				id: 61,
			},
			{
				name: 'Protective Services',
				id: 62,
			},
		],
	},
	{
		name: 'Science, Technology, & Math',
		id: 7,
		children: [
			{
				name: 'Agriculture',
				id: 71,
			},
			{
				name: 'Biology',
				id: 72,
			},
			{
				name: 'Chemistry',
				id: 73,
			},
			{
				name: 'Computer Science',
				id: 74,
			},
			{
				name: 'Environmental Science',
				id: 75,
			},
			{
				name: 'Engineering',
				id: 76,
			},
			{
				name: 'Information Technology',
				id: 77,
			},
			{
				name: 'Math',
				id: 78,
			},
			{
				name: 'Physics',
				id: 79,
			}
		],
	},
	{
		name: 'Trades & Personal Services',
		id: 8,
		children: [
			{
				name: 'Cosmetology',
				id: 81,
			},
			{
				name: 'Culinary Arts',
				id: 82,
			},
			{
				name: 'Mechanics',
				id: 83,
			},
		],
	},
	{
		name: "Race",
		id: 90,
		children: [
			{
				name: "African American",
				id: 91,
			},
			{
				name: "Alaska Native",
				id: 92,
			},
			{
				name: "Asian/Pacific Islander",
				id: 93,
			},
			{
				name: "Caucasian",
				id: 94,
			},
			{
				name: "Hispanic",
				id: 95,
			},
			{
				name: "Native American",
				id: 96,
			},
			{
				name: "Other Ethnic/Racial Heritage",
				id: 97,
			},
		]
	},
	{
		name: "Religion",
		id: 1000,
		children: [
			{
				name: "Agnostic",
				id: 1001,
			},
			{
				name: "All Religions (encompasses all religions)",
				id: 1002,
			},
			{
				name: "Amish",
				id: 1003,
			},
			{
				name: "Atheist",
				id: 1004,
			},
			{
				name: "Baha'i",
				id: 1005,
			},
			{
				name: "Baptist",
				id: 1006,
			},
			{
				name: "Buddhist",
				id: 1007,
			},
			{
				name: "Catholic",
				id: 1008,
			},
			{
				name: "Christian",
				id: 1009,
			},
			{
				name: "Church of Christ (Christian Scientist)",
				id: 1010,
			},
			{
				name: "Church of Jesus Christ ( LDS)",
				id: 1011,
			},
			{
				name: "Church of the Brethren",
				id: 1012,
			},
			{
				name: "Confucianist",
				id: 1013,
			},
			{
				name: "Disciples of Christ",
				id: 1014,
			},
			{
				name: "Episcopalian",
				id: 1015,
			},
			{
				name: "Evangelical",
				id: 1016,
			},
			{
				name: "Hindu",
				id: 1017,
			},
			{
				name: "Islam/Muslim",
				id: 1018,
			},
			{
				name: "Jain",
				id: 1019,
			},
			{
				name: "Jesuit",
				id: 1020,
			},
			{
				name: "Jewish/Judaism",
				id: 1021,
			},
			{
				name: "Lutheran",
				id: 1022,
			},
			{
				name: "Mennonite",
				id: 1023,
			},
			{
				name: "Methodist",
				id: 1024,
			},
			{
				name: "Non-religious",
				id: 1025,
			},
			{
				name: "Orthodox",
				id: 1026,
			},
			{
				name: "Pagan/Wiccan",
				id: 1027,
			},
			{
				name: "Presbyterian",
				id: 1028,
			},
			{
				name: "Quaker",
				id: 1029,
			},
			{
				name: "Reformed Church in America",
				id: 1030,
			},
			{
				name: "Sikh",
				id: 1031,
			},
			{
				name: "Taoist",
				id: 1032,
			},
			{
				name: "Unitarian Universalist",
				id: 1033,
			},
		]
	},
	{
		name: "Disabilities",
		id: 1034,
		children: [
			{
				name: "ADD/ADHD",
				id: 1035,
			},
			{
				name: "Allergies",
				id: 1036,
			},
			{
				name: "Alopecia",
				id: 1037,
			},
			{
				name: "ALS (Lou Gehrig's Disease)",
				id: 1038,
			},
			{
				name: "Any Impairment",
				id: 1039,
			},
			{
				name: "Arthritis/Rheumatism",
				id: 1040,
			},
			{
				name: "Autism",
				id: 1041,
			},
			{
				name: "Autoimmune Disorder",
				id: 1042,
			},
			{
				name: "Batten disease",
				id: 1043,
			},
			{
				name: "Bipolar Disorder",
				id: 1044,
			},
			{
				name: "Cancer Related",
				id: 1045,
			},
			{
				name: "Clinically Depressed",
				id: 1046,
			},
			{
				name: "Clinically Overweight",
				id: 1047,
			},
			{
				name: "Cystic Fibrosis",
				id: 1048,
			},
			{
				name: "Deaf/Hard of Hearing",
				id: 1049,
			},
			{
				name: "Deaf/Hard of Hearing Parent",
				id: 1050,
			},
			{
				name: "Developmental Impairment",
				id: 1051,
			},
			{
				name: "Diabetes",
				id: 1052,
			},
			{
				name: "Digestive Impairment",
				id: 1053,
			},
			{
				name: "Disabled Parent",
				id: 1054,
			},
			{
				name: "Down Syndrome",
				id: 1055,
			},
			{
				name: "Dyscalculia",
				id: 1056,
			},
			{
				name: "Dysgraphia",
				id: 1057,
			},
			{
				name: "Dyslexia",
				id: 1058,
			},
			{
				name: "Epilepsy",
				id: 1059,
			},
			{
				name: "Executive Function Challenges",
				id: 1060,
			},
			{
				name: "Glycogen Storage Disease",
				id: 1061,
			},
			{
				name: "Heart Disease",
				id: 1062,
			},
			{
				name: "Hemophilia",
				id: 1063,
			},
			{
				name: "Hepatitis",
				id: 1064,
			},
			{
				name: "HIV Positive",
				id: 1065,
			},
			{
				name: "Kidney Related Impairment",
				id: 1066,
			},
			{
				name: "Learning Disability",
				id: 1067,
			},
			{
				name: "Medical Disability",
				id: 1068,
			},
			{
				name: "Mental Impairment",
				id: 1069,
			},
			{
				name: "Mucopolysaccharidoses (MPS)",
				id: 1070,
			},
			{
				name: "Multiple Sclerosis",
				id: 1071,
			},
			{
				name: "Muscular Dystrophy",
				id: 1072,
			},
			{
				name: "Narcolepsy",
				id: 1073,
			},
			{
				name: "Parkinson's Disease",
				id: 1074,
			},
			{
				name: "Phenylketonuria (PKU)",
				id: 1075,
			},
			{
				name: "Physical Impairment",
				id: 1076,
			},
			{
				name: "Post-Traumatic Stress Disorder",
				id: 1077,
			},
			{
				name: "Primary Immune Deficiency",
				id: 1078,
			},
			{
				name: "Relative w/ Alzheimer's",
				id: 1079,
			},
			{
				name: "Respiratory Impairment",
				id: 1080,
			},
			{
				name: "Sickle Cell Disease",
				id: 1081,
			},
			{
				name: "Spina Bifida",
				id: 1082,
			},
			{
				name: "Tourette Syndrome (TS)",
				id: 1083,
			},
			{
				name: "Visual Impairment",
				id: 1084,
			},
			{
				name: "Wheelchair User/Mobility Challenged",
				id: 1085,
			},
		]
	},
	{
		name: "Ethnicity",
		id: 1086,
		children: [
			{
				name: "Afghan",
				id: 1087,
			},
			{
				name: "Albanian",
				id: 1088,
			},
			{
				name: "Algerian",
				id: 1089,
			},
			{
				name: "American",
				id: 1090,
			},
			{
				name: "Argentinian",
				id: 1091,
			},
			{
				name: "Armenian",
				id: 1092,
			},
			{
				name: "Barbadian",
				id: 1093,
			},
			{
				name: "Belarusian",
				id: 1094,
			},
			{
				name: "Belgian",
				id: 1095,
			},
			{
				name: "Belizean",
				id: 1096,
			},
			{
				name: "Bolivian",
				id: 1097,
			},
			{
				name: "Bosnian",
				id: 1098,
			},
			{
				name: "Brazilian",
				id: 1099,
			},
			{
				name: "British",
				id: 1100,
			},
			{
				name: "Bulgarian",
				id: 1101,
			},
			{
				name: "Cambodian",
				id: 1102,
			},
			{
				name: "Cameroonian",
				id: 1103,
			},
			{
				name: "Canadian",
				id: 1104,
			},
			{
				name: "Chilean",
				id: 1105,
			},
			{
				name: "Chinese",
				id: 1106,
			},
			{
				name: "Colombian",
				id: 1107,
			},
			{
				name: "Congolese",
				id: 1108,
			},
			{
				name: "Costa Rican",
				id: 1109,
			},
			{
				name: "Croatian",
				id: 1110,
			},
			{
				name: "Cuban",
				id: 1111,
			},
			{
				name: "Czech",
				id: 1112,
			},
			{
				name: "Dominican",
				id: 1113,
			},
			{
				name: "Dutch",
				id: 1114,
			},
			{
				name: "Ecuadorian",
				id: 1115,
			},
			{
				name: "Egyptian",
				id: 1116,
			},
			{
				name: "Ethiopian",
				id: 1117,
			},
			{
				name: "Fijian",
				id: 1118,
			},
			{
				name: "Filipino",
				id: 1119,
			},
			{
				name: "French",
				id: 1120,
			},
			{
				name: "German",
				id: 1121,
			},
			{
				name: "Greek",
				id: 1122,
			},
			{
				name: "Guatemalan",
				id: 1123,
			},
			{
				name: "Guyanese",
				id: 1124,
			},
			{
				name: "Haitian",
				id: 1125,
			},
			{
				name: "Honduran",
				id: 1126,
			},
			{
				name: "Hungarian",
				id: 1127,
			},
			{
				name: "Indian",
				id: 1128,
			},
			{
				name: "Indonesian",
				id: 1129,
			},
			{
				name: "Iranian",
				id: 1130,
			},
			{
				name: "Iraqi",
				id: 1131,
			},
			{
				name: "Irish",
				id: 1132,
			},
			{
				name: "Israeli",
				id: 1133,
			},
			{
				name: "Italian",
				id: 1134,
			},
			{
				name: "Jamaican",
				id: 1135,
			},
			{
				name: "Japanese",
				id: 1136,
			},
			{
				name: "Jordanian",
				id: 1137,
			},
			{
				name: "Kenyan",
				id: 1138,
			},
			{
				name: "Kyrgyzstan",
				id: 1139,
			},
			{
				name: "Laotian",
				id: 1140,
			},
			{
				name: "Latvian",
				id: 1141,
			},
			{
				name: "Lebanese",
				id: 1142,
			},
			{
				name: "Liberian",
				id: 1143,
			},
			{
				name: "Libyan",
				id: 1144,
			},
			{
				name: "Lithuanian",
				id: 1145,
			},
			{
				name: "Macedonian",
				id: 1146,
			},
			{
				name: "Madagascan",
				id: 1147,
			},
			{
				name: "Malaysian",
				id: 1148,
			},
			{
				name: "Mexican",
				id: 1149,
			},
			{
				name: "Moldovan",
				id: 1150,
			},
			{
				name: "Mongolian",
				id: 1151,
			},
			{
				name: "Moroccan",
				id: 1152,
			},
			{
				name: "Mozambican",
				id: 1153,
			},
			{
				name: "Native American",
				id: 1154,
			},
			{
				name: "Nepalese",
				id: 1155,
			},
			{
				name: "Nicaraguan",
				id: 1156,
			},
			{
				name: "Nigerian",
				id: 1157,
			},
			{
				name: "North Korean",
				id: 1158,
			},
			{
				name: "Pakistani",
				id: 1159,
			},
			{
				name: "Palestinian",
				id: 1160,
			},
			{
				name: "Panamanian",
				id: 1161,
			},
			{
				name: "Paraguayan",
				id: 1162,
			},
			{
				name: "Peruvian",
				id: 1163,
			},
			{
				name: "Polish",
				id: 1164,
			},
			{
				name: "Portuguese",
				id: 1165,
			},
			{
				name: "Puerto Rican",
				id: 1166,
			},
			{
				name: "Romanian",
				id: 1167,
			},
			{
				name: "Russian",
				id: 1168,
			},
			{
				name: "Salvadoran",
				id: 1169,
			},
			{
				name: "Saudi Arabian",
				id: 1170,
			},
			{
				name: "Scandinavian",
				id: 1171,
			},
			{
				name: "Serbian",
				id: 1172,
			},
			{
				name: "Singaporean",
				id: 1173,
			},
			{
				name: "Slovakian",
				id: 1174,
			},
			{
				name: "Slovene",
				id: 1175,
			},
			{
				name: "Somalian",
				id: 1176,
			},
			{
				name: "South Korean",
				id: 1177,
			},
			{
				name: "Spanish",
				id: 1178,
			},
			{
				name: "Sudanese",
				id: 1179,
			},
			{
				name: "Swazi",
				id: 1180,
			},
			{
				name: "Syrian",
				id: 1181,
			},
			{
				name: "Taiwanese",
				id: 1182,
			},
			{
				name: "Tanzanian",
				id: 1183,
			},
			{
				name: "Thai",
				id: 1184,
			},
			{
				name: "Tunisian",
				id: 1185,
			},
			{
				name: "Ugandan",
				id: 1186,
			},
			{
				name: "Ukrainian",
				id: 1187,
			},
			{
				name: "Uruguayan",
				id: 1188,
			},
			{
				name: "Venezuelan",
				id: 1189,
			},
			{
				name: "Vietnamese",
				id: 1190,
			},
			{
				name: "Yemeni",
				id: 1191,
			},
		]
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
			// zip: "",
			gpa: "",
			major: "",
			race: "",
			religion: "",
			Disabilities: "",
			Sat: "",
			Act: "",
			ethnicity: "",
			selectedItems: [],
			selectedItems1: [],
			selectedItems2: [],
			selectedItems3: [],
			selectedItems4: [],
			selectedItems5: [],

		};
		this.handleGender = this.handleGender.bind(this);
		this.handleDOB = this.handleDOB.bind(this);
		// this.handleZip = this.handleZip.bind(this);
		this.handleGPA = this.handleGPA.bind(this);
		this.handleAcamajor = this.handleAcamajor.bind(this);
		this.handleRace = this.handleRace.bind(this);
		this.handleReligion = this.handleReligion.bind(this);
		this.handleDisability = this.handleDisability.bind(this);
		this.handleSAT = this.handleSAT.bind(this);
		this.handleACT = this.handleACT.bind(this);
		this.handleethnicity = this.handleethnicity.bind(this);
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
			console.log(JSON.stringify({
				email: this.state.email,
				gender: this.state.gender,
				dob: this.state.dob,
				gpa: this.state.gpa,
				major: this.state.selectedItems,
				race: this.state.race,
				ethnicity: this.state.ethnicity,
				religion: this.state.religion,
				disabilities: this.state.Disabilities,
				sat_score: this.state.Sat,
			  }));
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

	onSelectedResidencesChange = (selectedResidences) => {
		this.setState({ selectedResidences });
	};

	onSelectedMajorsChange = (selectedMajors) => {
		this.setState({ selectedMajors });
	};

	onSelectedRacesChange = (selectedRaces) => {
		this.setState({ selectedRaces });
	};

	onSelectedReligionChange = (selectedReligions) => {
		this.setState({ selectedReligions });
	};

	onSelectedDisabilitiesChange = (selectedDisabilities) => {
		this.setState({ selectedDisabilities });
	};

	onSelectedEthnicitiesChange = (selectedEthnicities) => {
		this.setState({ selectedEthnicities });
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

	// handleZip(text) {
	// 	//Error Checking for User Zip Code input
	// 	//Lowest US Zip code is 00501, Highest US Zip Code is 99950
	// 	let zipInt = parseInt(text, 10);
	// 	//console.log(zipInt);
	// 	if ((zipInt >= 501) && (zipInt <= 99950) && (text.length > 4)) {
	// 		this.setState({
	// 			zip: text,
	// 		});
	// 		//console.log("ZipInt: "+zipInt +" Current Length: "+text.length+ " current state: " + this.state.zip);
	// 	}
	// 	else if (text.length < 5) {
	// 		console.log("waiting for user input" + " " + text.length);
	// 	}
	// 	else {
	// 		alert("Please enter a valid zip code")
	// 	}
	// 	//console.log(this.state.zip);
	// }

	handleGPA(text) {
		let gpaFloat = parseFloat(text);
		if (gpaFloat >= 0.0 && gpaFloat <= 4.0) {
			this.setState({
				gpa: text,
			});
		}
		else {
			alert("Please enter a valid GPA");
		}
	}


	handleAcamajor(text) {
		this.setState({
			major: text,
		});
	}

	handleRace(text) {
		this.setState({
			race: text,
		});
	}

	handleReligion(text) {
		this.setState({
			religion: text,
		});
	}

	handleDisability(text) {
		this.setState({
			Disabilities: text,
		});
	}

	handleSAT(text) {
		let textInt = parseInt(text, 10);
		if (text.length > 2 && textInt >= 400 && textInt <= 1600) {
			this.setState({
				Sat: text,
			});
			//console.log("SAT: "+this.state.Sat)
		}
		else if (text.substring(0, 1).localeCompare("2") == 0 || text.substring(0, 1).localeCompare("3") == 0 || text.substring(0, 1).localeCompare("0") == 0) {
			alert("Please enter a valid SAT score");
		}
		else if (text.length < 3 || text.substring(0, 1).localeCompare("1") == 0) {
			console.log("Waiting for User Input");
		}
		else {
			alert("Please enter a valid SAT score");
		}
	}

	handleACT(text) {
		let textInt = parseInt(text, 10);
		if (textInt >= 1 && textInt <= 36) {
			this.setState({
				Act: text,
			});
		}
		else {
			alert("Please Enter a Valid ACT Score");
		}
	}

	handleethnicity(text) {
		this.setState({
			ethnicity: text,
		});
	}

	upload2sever = () => {
		
	}
	

	render() {
		// console.log("DOB is: " + this.state.dob);
		return (
			<DismissKeyboard>
				<KeyboardAwareScrollView
					style={styles.container}>
					<View style={styles.scholar_Container}>

						{/* Required Questions */}
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
									onSelectedItemsChange={this.onSelectedResidencesChange}
									selectedItems={this.state.selectedResidences}
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

						{/* Optional Questions */}
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
										items={items2.slice(0, items2.length - 4)}
										IconRenderer={MaterialIcons}
										uniqueKey="name"
										subKey="children"
										selectText="Choose your major"
										showDropDowns={true}
										readOnlyHeadings={true}
										onSelectedItemsChange={this.onSelectedMajorsChange}
										selectedItems={this.state.selectedMajors}
									/>
								</View>
								<View style={styles.grp2}>
									<Text style={styles.txt_race}>Race:</Text>
									<SectionedMultiSelect
										style={{ margin: 30 }}
										items={items2.slice(items2.length - 4, items2.length - 4 + 1)}
										IconRenderer={MaterialIcons}
										uniqueKey="name"
										subKey="children"
										selectText="Select all that apply"
										showDropDowns={true}
										readOnlyHeadings={true}
										onSelectedItemsChange={this.onSelectedRacesChange}
										selectedItems={this.state.selectedRaces}
									/>
								</View>
								<View style={styles.grp3}>
									<Text style={styles.txt_religion}>Religion:</Text>
									<SectionedMultiSelect
										style={{ margin: 30 }}
										items={items2.slice(items2.length - 3, items2.length - 3 + 1)}
										IconRenderer={MaterialIcons}
										uniqueKey="name"
										subKey="children"
										selectText="Select all that apply"
										showDropDowns={true}
										readOnlyHeadings={true}
										onSelectedItemsChange={this.onSelectedReligionChange}
										selectedItems={this.state.selectedReligions}
									/>
								</View>
								<View style={styles.grp4}>
									<Text style={styles.txt_disability}>Disabilities:</Text>
									<SectionedMultiSelect
										style={{ margin: 30 }}
										items={items2.slice(items2.length - 2, items2.length - 2 + 1)}
										IconRenderer={MaterialIcons}
										uniqueKey="name"
										subKey="children"
										selectText="Select all that apply"
										showDropDowns={true}
										readOnlyHeadings={true}
										onSelectedItemsChange={this.onSelectedDisabilitiesChange}
										selectedItems={this.state.selectedDisabilities}
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
										items={items2.slice(items2.length - 1, items2.length)}
										IconRenderer={MaterialIcons}
										uniqueKey="name"
										subKey="children"
										selectText="Select all that apply"
										showDropDowns={true}
										readOnlyHeadings={true}
										onSelectedItemsChange={this.onSelectedEthnicitiesChange}
										selectedItems={this.state.selectedEthnicities}
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
	scholar_Container: {
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
