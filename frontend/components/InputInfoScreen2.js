import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Card } from 'react-native-elements';

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
        id: 82.
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



export default class InputScreen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.route.params.email,
      gender: this.props.route.params.gender,
      dob: this.props.route.params.dob,
      zip: this.props.route.params.zip,
      gpa: this.props.route.params.gpa,
      major: "",
      race: "",
      religion: "",
      Disabilities: "",
      Sat: "",
      ethnicity: "",
      selectedItems: [],
      selectedItems2: [],
      selectedItems3: [],
      selectedItems4: [],
      selectedItems5: [],
    };
    this.handleAcamajor = this.handleAcamajor.bind(this);
    this.handleRace = this.handleRace.bind(this);
    this.handleReligion = this.handleReligion.bind(this);
    this.handleDisability = this.handleDisability.bind(this);
    this.handleSAT = this.handleSAT.bind(this);
    this.handleethnicity = this.handleethnicity.bind(this);
    // this.navigation = useNavigation();
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  onSelectedItemsChange2 = (selectedItems2) => {
    this.setState({ selectedItems2});
  };

  onSelectedItemsChange3 = (selectedItems3) => {
    this.setState({ selectedItems3});
  };

  onSelectedItemsChange4 = (selectedItems4) => {
    this.setState({ selectedItems4 });
  };

  onSelectedItemsChange5 = (selectedItems5) => {
    this.setState({ selectedItems5 });
  };

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
    this.setState({
      Sat: text,
    });
  }

  handleethnicity(text) {
    this.setState({
      ethnicity: text,
    });
  }

  upload2sever = () => {
    console.log(      JSON.stringify({
        email: this.state.email,
        gender: this.state.gender,
        dob: this.state.dob,
        zip: this.state.zip,
        gpa: this.state.gpa,
        major: this.state.selectedItems,
        race: this.state.race,
        ethnicity: this.state.ethnicity,
        religion: this.state.religion,
        disabilities: this.state.Disabilities,
        sat_score: this.state.Sat,
      }));

    // console.log("Email from InputScreen2: " + this.props);

    let URL = "http://5144454dac7b.ngrok.io/api/v1.2/usr/" + this.state.email + "/survey/scholarship";
    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        gender: this.state.gender,
        dob: this.state.dob,
        zip: this.state.zip,
        gpa: this.state.gpa,
        major: "Computer Science",
        race: this.state.race,
        ethnicity: this.state.ethnicity,
        religion: this.state.religion,
        disabilities: this.state.Disabilities,
        sat_score: this.state.Sat,
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

          Alert.alert(
            "Your data have been successfully \ninserted! " +
            "You will be navigated back!"
          );

          setTimeout(() => {
            this.props.navigation.goBack();
          }, 2500);

        } else {
          json_mesg = response.json();
          Alert.alert("Error: " + json_mesg.mesg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  render() {
    const { selectedItems } = this.state;
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Card>
          {/* <View style={styles.containerGrp1}>
            <View style={styles.containerBkground1}> */}
          {/* <Text style={styles.optionalDetails}>Optional Details</Text> */}

          <View style={styles.grp1}>
            <Text style={styles.txt_major}>Academic Major:</Text>
            <SectionedMultiSelect
              style={{ margin: 30 }}
              items={items.slice(0,items.length-4)}
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
              style = {{ margin: 30 }}
              items = {items.slice(items.length-4, items.length-4 + 1)}
              IconRenderer = {MaterialIcons}
              uniqueKey = "name"
              subKey="children"
              selectText = "Select all that apply"
              showDropDowns = {true}
              readOnlyHeadings = {true}
              onSelectedItemsChange = {this.onSelectedItemsChange2}
              selectedItems = {this.state.selectedItems2}
              />
          </View>
          <View style={styles.grp3}>
            <Text style={styles.txt_religion}>Religion:</Text>
            <SectionedMultiSelect
              style = {{ margin: 30 }}
              items = {items.slice(items.length-3, items.length-3 + 1)}
              IconRenderer = {MaterialIcons}
              uniqueKey = "name"
              subKey = "children"
              selectText = "Select all that apply"
              showDropDowns = {true}
              readOnlyHeadings = {true}
              onSelectedItemsChange = {this.onSelectedItemsChange3}
              selectedItems = {this.state.selectedItems3}
              />
          </View>
          <View style={styles.grp4}>
            <Text style={styles.txt_disability}>Disabilities:</Text>
            <SectionedMultiSelect
              style = {{ margin: 30}}
              items = {items.slice(items.length-2, items.length-2 + 1)}
              IconRenderer = {MaterialIcons}
              uniqueKey = "name"
              subKey = "children"
              selectText = "Select all that apply"
              showDropDowns = {true}
              readOnlyHeadings = {true}
              onSelectedItemsChange = {this.onSelectedItemsChange4}
              selectedItems = {this.state.selectedItems4}
              />
          </View>
          <View style={styles.grp5}>
            <Text style={styles.txt_testScore}>Test Score:</Text>
            <TextInput
              onChangeText={this.handleSAT}
              placeholder="SAT"
              keyboardType="numeric"
              style={styles.input6}
              maxLength={4}
            ></TextInput>
          </View>
          <View style={styles.grp6}>
            <Text style={styles.txt_testScore}>Ethnicity:</Text>
            <SectionedMultiSelect
              style = {{ margin: 30 }}
              items = {items.slice(items.length-1, items.length)}
              IconRenderer = {MaterialIcons}
              uniqueKey = "name"
              subKey = "children"
              selectText = "Select all that apply"
              showDropDowns = {true}
              readOnlyHeadings = {true}
              onSelectedItemsChange = {this.onSelectedItemsChange5}
              selectedItems = {this.state.selectedItems5}
            />
          </View>
          <View style={styles.submit_grp}>
            <TouchableOpacity
              onPress={() => this.upload2sever()}
              style={styles.txt_submit}
            >
              <Text style={styles.btn_submit}>Submit</Text>
            </TouchableOpacity>
          </View>
          {/* </View>
          </View> */}
          {/* </KeyboardAwareScrollView> */}
        </Card>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
    marginTop: 20,
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
  submit_grp: {
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
  btn_submit: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    marginTop: 10,
    alignSelf: "center",
  },
});
