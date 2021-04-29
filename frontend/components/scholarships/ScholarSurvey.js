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
	StatusBar
} from "react-native";
// import InputScreen2 from "./InputInfoScreen2";

//import DatePicker from "@dietime/react-native-date-picker";
//import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
// import { Feather } from '@expo/vector-icons';


const items = [
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
				name: "Public Policy",
				id: 594,
			},
			{
				name: "Social Services",
				id: 595,
			},
			{
				name: 'Religious Studies',
				id: 596,
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
				name: "Autism/Asperger Syndrome",
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
				name: "Hearing Impairment",
				id: 1049,
			},
			{
				name: "Hearing Impairment Parent",
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
				name: "Dyslexia",
				id: 1058,
			},
			{
				name: "Epilepsy",
				id: 1059,
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
	{
		name: 'United States',
		id: 1192,
		// these are the children or 'sub items'
		children: [
			{
				name: 'No Preference',
				id: 1193,
			},
			{
				name: 'Alabama',
				id: 1194,
			},
			{
				name: 'Alaska',
				id: 1195,
			},
			{
				name: 'Arizona',
				id: 1196,
			},
			{
				name: 'Arkansas',
				id: 1197,
			},
			{
				name: 'California',
				id: 1198,
			},
			{
				name: 'Colorado',
				id: 1199,
			},
			{
				name: 'Connecticut',
				id: 1200,
			},
			{
				name: 'Delaware',
				id: 1201,
			},
			{
				name: 'Flordia',
				id: 1202,
			},
			{
				name: 'Georgia',
				id: 1203,
			},
			{
				name: 'Hawaii',
				id: 1204,
			},
			{
				name: 'Idaho',
				id: 1205,
			},
			{
				name: 'Illinois',
				id: 1206,
			},
			{
				name: 'Indiana',
				id: 1207,
			},
			{
				name: 'Iowa',
				id: 1208,
			},
			{
				name: 'Kansas',
				id: 1209,
			},
			{
				name: 'Kentucky',
				id: 1210,
			},
			{
				name: 'Louisiana',
				id: 1211,
			},
			{
				name: 'Maine',
				id: 1212,
			},
			{
				name: 'Maryland',
				id: 1213,
			},
			{
				name: 'Massachusetts',
				id: 1214,
			},
			{
				name: 'Michigan',
				id: 1215,
			},
			{
				name: 'Minnesota',
				id: 1216,
			},
			{
				name: 'Mississippi',
				id: 1217,
			},
			{
				name: 'Missouri',
				id: 1218,
			},
			{
				name: 'Montana',
				id: 1219,
			},
			{
				name: 'Nebraska',
				id: 1220,
			},
			{
				name: 'Nevada',
				id: 1221,
			},
			{
				name: 'New Hampshire',
				id: 1222,
			},
			{
				name: 'New Jersey',
				id: 1223,
			},
			{
				name: 'New Mexico',
				id: 1224,
			},
			{
				name: 'New York',
				id: 1225,
			},
			{
				name: 'North Carolina',
				id: 1226,
			},
			{
				name: 'North Dakota',
				id: 1227,
			},
			{
				name: 'Ohio',
				id: 1228,
			},
			{
				name: 'Oklahoma',
				id: 1229,
			},
			{
				name: 'Oregon',
				id: 1230,
			},
			{
				name: 'Pennsylvania',
				id: 1231,
			},
			{
				name: 'Rhode Island',
				id: 1232,
			},
			{
				name: 'South Carolina',
				id: 1233,
			},
			{
				name: 'South Dakota',
				id: 1234,
			},
			{
				name: 'Tennessee',
				id: 1235,
			},
			{
				name: 'Texas',
				id: 1236,
			},
			{
				name: 'Utah',
				id: 1237,
			},
			{
				name: 'Vermont',
				id: 1238,
			},
			{
				name: 'Virginia',
				id: 1239,
			},
			{
				name: 'Washington',
				id: 1240,
			},
			{
				name: 'West Virgina',
				id: 1241,
			},
			{
				name: 'Wisconsin',
				id: 1242,
			},
			{
				name: 'Wyoming',
				id: 1243,
			},
		],
	},
	{
		name: 'Canada',
		id: 1244,
		children: [
			{
				name: 'Alberta',
				id: 1245,
			},
			{
				name: 'British Columbia',
				id: 1246,
			},
			{
				name: 'Manitoba',
				id: 1247,
			},
			{
				name: 'New Brunswick',
				id: 1248,
			},
			{
				name: 'Newfoundland and Labrador',
				id: 1249,
			},
			{
				name: 'Nova Scotia',
				id: 1250,
			},
			{
				name: 'Ontario',
				id: 1251,
			},
			{
				name: 'Prince Edward Island',
				id: 1252,
			},
			{
				name: 'Quebec',
				id: 1253,
			},
			{
				name: 'Saskatchewan',
				id: 1254,
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

export default function ScholarSurvey(props) {
	// console.log("Email from InputScreen1: " + JSON.stringify(route.params.email));
	// console.log("navigation from InputScreen1: " + JSON.stringify(navigation));
	// console.log(props);
	// Delete the navigation & atttribute that is not used nowhere.
	return <InputScreen1a email={props.route.params.email} />
}

class InputScreen1a extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: this.props.email,
			gender: "",
			dob: "",
			gpa: "",
			sat_score: "",
			act_score: "",
			selectedResidences: [],
			selectedMajors: [],
			selectedRaces: [],
			selectedReligions: [],
			selectedDisabilities: [],
			selectedEthnicities: [],
			firstTime: 0,
			currentMethod: "POST",
			
		};
		this.handleGender = this.handleGender.bind(this);
		this.handleDOB = this.handleDOB.bind(this);
		this.handleGPA = this.handleGPA.bind(this);
		this.handleSAT = this.handleSAT.bind(this);
		this.handleACT = this.handleACT.bind(this);
	}

	//handle functions
	handleSAT(text) {
		let textInt = parseInt(text, 10);
		if (text.length > 2 && textInt >= 400 && textInt <= 1600) {
			this.setState({
				sat_score: text,
			});
			//console.log("SAT: "+this.state.Sat)
		}
		else if (text.substring(0, 1).localeCompare("2") == 0 || text.substring(0, 1).localeCompare("3") == 0 || text.substring(0, 1).localeCompare("0") == 0) {
			alert("Please enter a valid SAT score");
		}
		else if ((text.length < 3 || text.substring(0, 1).localeCompare("1") == 0) && text.substring(1).localeCompare("7") != 0) {
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
				act_score: text,
			});
		}
		else {
			alert("Please Enter a Valid ACT Score");
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
		if (text.localeCompare(invalidVal1) != 0 && text.localeCompare(invalidVal2) != 0) {
			this.setState({
				dob: text,
			});
		}
		else {
			alert("Please enter a valid age");
		}
	}
	
	gpaErrorHandling(text)
	{
		let valid = false;
		let gpaFloat = parseFloat(text);
				if (text.toString().length > 0 && gpaFloat >= 0.0 && gpaFloat <= 5.0) 
				{
					valid = true;
				}
				return valid
	}

	handleGPA(text) 
	{

		this.setState({
			gpa: text,
		});	
			/*
			if (text.toString().length > 0) 
			{
				let gpaFloat = parseFloat(text);
				if (gpaFloat >= 0.0 && gpaFloat <= 5.0) 
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
			else
			{
				console.log("Waiting for user GPA input")
			}
		*/	
		
	}

	// multiselc fucntions
	onSelectedResidencesChange = (selectedResidences) => {
		this.setState({ selectedResidences });
	};

	onSelectedMajorsChange = (selectedMajors) => {
		//If the user has selected Business and Management (Business Management for scholarships.com) and they have not already selected Business Management
		if (this.findPosition("Business and Management", selectedMajors) != -1 && this.findPosition("Business Management", selectedMajors) == -1) {
			selectedMajors.push("Business Management");
		}
		//If the user has selected K and PT which is not supported by scholarships.com (listed separately)
		if (this.findPosition("Kinesiology and Physical Therapy", selectedMajors) != -1) {
			//If the user has not selected Kinesiology, it will be added to the array
			if (this.findPosition("Kinesiology", selectedMajors) == -1) {
				selectedMajors.push("Kinesiology");
			}
			//If the user has not selected Physical Therapy, it will be added to the array
			if (this.findPosition("Physical Therapy", selectedMajors) == -1) {
				selectedMajors.push("Physical Therapy");
			}
		}
		//If the user has selected Public Policy and Social Services (separate for scholarships.com) 
		if (this.findPosition("Public Policy and Social Services", selectedMajors) != -1) {
			//If the user hasn't selected Public Policy, it will be added to the array
			if (this.findPosition("Public Policy", selectedMajors) == -1) {
				selectedMajors.push("Public Policy");
			}
			//If the user has not seelected Social Services, it will be added to the array
			if (this.findPosition("Social Services", selectedMajors) == -1) {
				selectedMajors.push("Social Services");
			}
		}
		//If the user has selected Film and Photography (separately listed for scholarships.com)
		if (this.findPosition("Film and Photography", selectedMajors) != -1) {
			//If the user hasn't selected Film, it will be added to the array
			if (this.findPosition("Film", selectedMajors) == -1) {
				selectedMajors.push("Film");
			}
			//If the user hasn't selected Photography, it will be added to the array
			if (this.findPosition("Photography", selectedMajors) == -1) {
				selectedMajors.push("Photography");
			}
		}
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

	setFirstTime = (int) => {
		this.setState({firstTime: int});
	};

	checkGender() {
		let exists = false;
		if (this.state.gender.localeCompare("") != 0) {
			exists = true;
		}
		return exists;
	}

	checkAge() {
		let exists = false;
		if (this.state.dob.localeCompare("") != 0) {
			exists = true;
		}
		return exists;
	}

	checkGPA() {
		let exists = false;
		if (this.state.gpa.localeCompare("") != 0) {
			exists = true;
		}
		return exists;
	}

	checkSAT() {
		let existingScore = false;
		//this.checkExamScores()
		if (this.state.sat_score.localeCompare("") != 0) {
			existingScore = true;
		}
		return existingScore;
	}

	checkACT() {
		let existingScore = false;
		//this.checkExamScores()
		if (this.state.act_score.localeCompare("") != 0) {
			existingScore = true;
		}
		return existingScore;
	}

	findPosition(item, array) {
		let position = -1;
		var i;
		for (i = 0; i < array.length; i++) {
			if (array[i].localeCompare(item) == 0) {
				position = i;
			}
		}
		return position;
	}

	upload2sever = () => {
		if(this.state.firstTime == 1)
		{
			this.setState({currentMethod: "PATCH"});
		}

		this.setFirstTime(1);
		
		console.log(JSON.stringify({
			email: this.state.email,
			gender: this.state.gender,
			dob: this.state.dob,
			gpa: this.state.gpa,
			sat_score: this.state.sat_score,
			act_score: this.state.act_score,
			selectedMajors: this.state.selectedMajors,
			selectedResidences: this.state.selectedResidences,
			selectedRaces: this.state.selectedRaces,
			selectedEthnicities: this.state.selectedEthnicities,
			selectedReligions: this.state.selectedReligions,
			selectedDisabilities: this.state.selectedDisabilities,
			existing: this.firstTime,
		}));

		// console.log("Email from InputScreen2: " + this.props);

		let URL = "http://fef7a490b9ab.ngrok.io/api/v1.2/users/id/" + this.state.email + "/surveys/scholarship";
		fetch(URL, {
			method: this.state.currentMethod,
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: this.state.email,
				gender: this.state.gender,
				dob: this.state.dob,
				gpa: this.state.gpa,
				sat_score: this.state.sat_score,
				act_score: this.state.act_score,
				selectedMajors: this.state.selectedMajors,
				selectedResidences: this.state.selectedResidences,
				selectedRaces: this.state.selectedRaces,
				selectedEthnicities: this.state.selectedEthnicities,
				selectedReligions: this.state.selectedReligions,
				selectedDisabilities: this.state.selectedDisabilities,
				existing: this.state.firstTime,
			}),
		})

			// =============================================
			// .then((response) => response.json())
			// .then((json) => {
			//   console.log("Email: " + this.state.email);
			//   console.log(json);
			// })
			// =============================================

			.then((response) => {
				if (response.status == 202) {

					console.log(response);
					// Alert.alert(
					// 	"Your data have been successfully \ninserted! " +
					// 	"You will be navigated back!"
					// );

					// setTimeout(() => {
					// 	this.props.navigation.goBack();
					// }, 2500);

				} else {
					json_mesg = response.json();
					Alert.alert("Error: " + json_mesg.mesg);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	onSubmit() {
		let noInput = "";
		if (this.state.gender.localeCompare(noInput) != 0 && this.state.dob.localeCompare(noInput) != 0 /*&& this.state.zip.localeCompare(noInput) != 0 */ && this.state.gpa.localeCompare(noInput) != 0 && this.gpaErrorHandling(this.state.gpa)) {
			this.upload2sever();
			

			/*
			this.props.navigation.navigate('InputScreen2', {
				email: this.state.email,
				gender: this.state.gender,
				dob: this.state.dob,
				gpa: this.state.gpa,
			})
			console.log(this.state.zip);
			*/
		}
		/*
		else if(this.state.zip.localeCompare(noInput) == 0)
		{
			alert("Error, incomplete or invalid Zip code");
		}
		*/
		else if(this.gpaErrorHandling(this.state.gpa) == false)
		{
			alert("Please Enter a Valid GPA");
		}
		else {
			alert("Please Fill All Fields Before Submitting");
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

	getExistingData = () => {
		//insert correct URL for user's profile
		let URL = "http://fef7a490b9ab.ngrok.io/api/v1.2/users/id/" + this.state.email + "/surveys/scholarship";


		fetch(URL, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			// format the API response into json
			.then((response) => response.json())
			.then((json) => {
				// set the val to state
				this.setState({
					dob: json.dob,
					gender: json.gender,
					gpa: json.gpa,
					//Not sure how this is stored/named in the backend
					selectedResidences: json.region,
					//Not sure how this is stored/named in the backend
					selectedMajors: json.major,
					//Not sure how this is stored/named in the backend 
					selectedRaces: json.race,
					//Not sure how this is stored/named in the backend
					selectedReligions: json.religion,
					//Not sure how this is stored/named in the backend
					selectedDisabilities: json.disability,
					//Not sure how this is stored/named in the backend 
					selectedEthnicities: json.ethnicity,

					//This field needs to be added to the backend
					firstTime: json.existing,

				}).catch((error) => {
					console.log('An error happened: ' + error);
				});
			});
		// 	// validate
	}

	render() {
		// console.log("DOB is: " + this.state.dob);
		// console.log(this.props);

		// check();
		this.getExistingData();
		return (
			<DismissKeyboard>
				<KeyboardAwareScrollView
					style={styles.container}>
					<StatusBar backgroundColor="#007FF9" barStyle="light-content" />

					<View style={styles.card_grp1}>
						<Text style={styles.findScholar}>To Find your Scholarship:</Text>
						<Text style={styles.surveyDescription}>
							To provide you with the best possible scholarship recommendations,
							Please complete all mandatory fields and as many of the optional
							fields as possible. A complete survey will yield the best results.
						</Text>
					</View>

					<View style={styles.requiredGrp}>
						<Text style={styles.re_text}>Required Quesetions</Text>
						<View style={styles.input1_grp}>
							<Text style={styles.txt_display}>Gender</Text>
							<DropDownPicker
								items={[
									{ label: 'Male', value: 'Male' },
									{ label: 'Female', value: 'Female' },
									{ label: 'Transgender', value: 'Transgender' },
									{ label: 'Other', value: 'Other' },
								]}
								defaultValue={this.state.gender}
								defaultIndex={0}
								containerStyle={{ height: 30, marginTop: 8, marginLeft: 10, width: "90%" }}
								itemStyle={{ justifyContent: 'flex-start' }}
								//dropDownStyle={{marginTop: 2}}
								//dropDownStyle={{backgroundColor: '#fafafa', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}
								onChangeItem={item => this.handleGender(item.value)}
							/>
						</View>
						<View style={styles.input2_grp}>
							<Text style={styles.txt_display}>Age</Text>
							{this.checkAge() ?
								<TextInput
									onChangeText={this.handleDOB}
									value={this.state.dob}
									keyboardType="numeric"
									maxLength={2}
									style={styles.input2}
								></TextInput>
								:
								<TextInput
									onChangeText={this.handleDOB}
									placeholder="Please Enter Your Age"
									keyboardType="numeric"
									maxLength={2}
									style={styles.input2}
								></TextInput>
							}
						</View>
						<View style={styles.input3_grp}>
							<Text style={styles.txt_display}>State of Residence and/or Schooling</Text>
							<SectionedMultiSelect
								items={items.slice(items.length - 2)}
								IconRenderer={MaterialIcons}
								uniqueKey="name"
								subKey="children"
								selectText="Choose State(s) If Applicable"
								// style={styles.multiSelecter}
								showDropDowns={true}
								readOnlyHeadings={true}
								onSelectedItemsChange={this.onSelectedResidencesChange}
								selectedItems={this.state.selectedResidences}
							/>
						</View>
						<View style={styles.input4_grp}>
							<Text style={styles.txt_display}>GPA</Text>
							{this.checkGPA() ?
								<TextInput
									onChangeText={this.handleGPA}
									value={this.state.gpa}
									keyboardType="numeric"
									style={styles.input4}
									maxLength={4}
								></TextInput>
								:
								<TextInput
									onChangeText={this.handleGPA}
									placeholder="Please Enter Your GPA"
									keyboardType="numeric"
									style={styles.input4}
									maxLength={4}
								></TextInput>
							}
						</View>
					</View>

					{/* Optional Questions */}
					<CollapsibleView
						title={<Text style={styles.collapsibleTitle}>Optional Questions</Text>}
						style={styles.col_view}
						titleStyle={styles.collapsibleTitle}
					>
						<View style={styles.collapsibleContentGrp}>

							<View style={styles.grp1}>
								<Text style={styles.txt_display}>Academic Major:</Text>
								<SectionedMultiSelect
									style={{ margin: 30 }}
									items={items.slice(0, 8)}
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

							<View style={styles.grp1}>
								<Text style={styles.txt_display}>Race:</Text>
								<SectionedMultiSelect
									style={{ margin: 30 }}
									items={items.slice(8, 9)}
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
								<Text style={styles.txt_display}>Religion:</Text>
								<SectionedMultiSelect
									style={{ margin: 30 }}
									items={items.slice(9, 10)}
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
								<Text style={styles.txt_display}>Disabilities:</Text>
								<SectionedMultiSelect
									style={{ margin: 30 }}
									items={items.slice(10, 11)}
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
								<Text style={styles.txt_display}>Test Scores:</Text>
								{this.checkSAT() ?
									<TextInput
										onChangeText={this.handleSAT}
										value={this.state.sat_score}
										keyboardType="numeric"
										style={styles.input6}
										maxLength={4}
									></TextInput>
									:
									<TextInput
										onChangeText={this.handleSAT}
										placeholder="SAT"
										keyboardType="numeric"
										style={styles.input6}
										maxLength={4}
									></TextInput>
								}
								{this.checkACT() ?
									<TextInput
										onChangeText={this.handleACT}
										value={this.state.act_score}
										keyboardType="numeric"
										style={styles.input61}
										maxLength={2}
									></TextInput>
									:
									<TextInput
										onChangeText={this.handleACT}
										placeholder="ACT"
										keyboardType="numeric"
										style={styles.input61}
										maxLength={2}
									></TextInput>
								}
							</View>

							<View style={styles.grp6}>
								<Text style={styles.txt_display}>Ethnicity:</Text>
								<SectionedMultiSelect
									style={{ margin: 30 }}
									items={items.slice(11, 12)}
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
						</View>
					</CollapsibleView>

					<View style={styles.submit_grp}>
						<TouchableOpacity
							onPress={() =>
								this.onSubmit()
								// console.log(this.props)
							}
							style={styles.btn_submit}
						>
							<Text style={styles.next}>Submit</Text>
						</TouchableOpacity>
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
		backgroundColor: '#E6E6E6',
	},
	card_grp1: {
		width: '93%',
		height: "auto",
		backgroundColor: 'rgba(255,255,255,1)',
		borderWidth: 0,
		borderColor: '#000000',
		borderRadius: 5,
		overflow: 'hidden',
		marginTop: 30,
		alignSelf: 'center',
	},
	findScholar: {
		color: "#007FF9",
		height: 37,
		width: 298,
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 20,
		marginLeft: 20,
	},
	surveyDescription: {
		color: "rgba(0,0,0,1)",
		height: 120,
		width: 298,
		fontSize: 16,
		// marginTop: 10,
		marginLeft: 20,
		marginBottom: 10,
		// alignSelf: "center"
	},
	requiredGrp: {
		marginTop: 20,
		marginBottom: 10,
		backgroundColor: 'white',
		borderWidth: 0,
		borderRadius: 5,
		overflow: 'hidden',
		width: "93%",
		marginLeft: 15,
	},
	col_view: {
		flex: 1,
		width: "93%",
		overflow: "hidden",
		borderRadius: 5,
		borderColor: 'white',
		backgroundColor: "white",
		justifyContent: 'center',
		marginLeft: 15,
	},
	collapsibleTitle: {
		fontWeight: "bold",
		fontSize: 20,
		color: '#007FF9',
		marginRight: "auto",
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 10,
	},
	collapsibleContentGrp: {
		marginTop: 10,
		marginLeft: 9,
		marginRight: 10,
		maxWidth: "100%",
		height: "auto",
	},
	requiredDetails: {
		fontWeight: "bold",
		color: "black",
		lineHeight: 0,
		fontSize: 20,
		marginLeft: 20,
	},
	toggleMultiSelectWrapper: {
		width: "90%",
		marginLeft: 10,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#e6e6e6',
	},
	// multiSelecter: {
	// 	marginLeft: 0,
	// 	// marginTop: -5,
	// 	// marginBottom: -5,
	// 	top: 0,
	// 	bottom: 0,
	// },
	input1_grp: {
		width: "100%",
		height: 50,
		// verify the platform for using the dropdown menu
		...Platform.OS !== 'android' && {
			zIndex: 1,
		},
		marginLeft: 10,
	},
	re_text: {
		marginTop: 20,
		marginBottom: 10,
		marginLeft: 20,
		fontWeight: "bold",
		fontSize: 20,
		color: '#007FF9',
	},
	txt_display: {
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
		marginLeft: 10,
	},
	input2: {
		color: "#121212",
		height: 30,
		width: "95%",
		marginTop: 2,
		marginLeft: 25,
	},
	input3_grp: {
		width: "92%",
		height: "auto",
		marginTop: 15,
		marginLeft: 10,
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
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 10,
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
		height: 45,
		marginTop: 20,
		borderRadius: 5,
		marginBottom: 20,
	},
	btn_submit: {
		width: "92%",
		height: 45,
		borderRadius: 5,
		backgroundColor: "#007FF9",
		justifyContent: 'center',
		alignSelf: "center",
	},
	next: {
		color: "rgba(255,255,255,1)",
		fontSize: 16,
		alignSelf: "center",
	},
	container: {
		flex: 1,
	},
	grp1: {
		width: "100%",
		height: "auto",
	},
	input1: {
		color: "#121212",
		height: 30,
		width: "95%",
		marginTop: 2,
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
