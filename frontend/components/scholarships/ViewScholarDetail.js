import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, } from 'react-native';
import BeautyWebView from 'react-native-beauty-webview';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDeviceID } from "../../functions/deviceUniqueID";
import { getSecureStorage } from "../../functions/secureStorage";
import * as WebBrowser from 'expo-web-browser';

export default class ViewScholarDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usrInfo: this.props.route.params.usrInfo,
      scholarshipObj: {
        amount: '',
        ava: '',
        contact: '',
        deadline: '',
        description: '',
        applyLink: '',
        title: '',
        isBooked: false,
      },
      applyLinkVisible: false,
      // email: this.props.route.params.email,
    };
    // this.handleApplyLinkVisible = this.handleApplyLinkVisible.bind(this);
    // this.handleBookmark = this.handleBookmark.bind(this);
  }

  handleApplyLinkVisible(boolean) {
    this.setState({
      applyLinkVisible: boolean
    });
  }

  handleBookmark() {
    //Insert API Call here

    let URL = "http://820293c0661c.ngrok.io/api/v1.2/users/id/"+ this.state.usrInfo.email + "/bookmarks/scholarship/"+ this.state.usrInfo.jwt+ "/"+ this.state.usrInfo.uuid;

    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": this.state.scholarshipObj.title,
      }),
    })
      .then((response) => {
        if (response.status == 202) {

          alert(
            "Bookmarked!"
          );
          this.getDetail();

        } else {
          json_mesg = response.json();
          alert("Error: " + json_mesg.mesg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("scholar bookmark title: "+this.state.scholarshipObj.title);  
    //alert("This scholarship has been bookmarked!");
  }

  UNSAFE_componentWillMount() {
    // console.log("User profile from ViewScholarDetail: " + JSON.stringify(this.props.route.params));
    this.getDetail();
    // console.log("JWT: " + JSON.stringify(this.state.usrInfo.jwt));
    // console.log("USer obj: " + JSON.stringify(this.state.usrInfo));
    // console.log("UUID: " + this.state.usrInfo.uuid);
    console.log("isBooked: "+this.state.scholarshipObj.isBooked);

  }

  removeBookmark() {

    // this.setState({ modalVisible: false });
    // console.log(this.state.currentBookmarkKey)

    let URL = "http://820293c0661c.ngrok.io/api/v1.2/users/id/" + this.state.usrInfo.email + "/bookmarks/all/" + this.state.usrInfo.jwt + "/" + this.state.usrInfo.uuid;

    fetch(URL, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": this.state.scholarshipObj.title,
      }),
    })
      .then((response) => {
        if (response.status == 202) {

          alert("Bookmarked Removed!");
          // console.log("Bookmarked Removed");
          // this.getRecommend_scholarship();
          // this.setState({
          //   scholarshipObj :{
          //     isBooked: false,
          //   },
          // });
          this.getDetail();


        } else if (response.status == 208) {

          alert("Already Removed!");

        } else {

          alert("Something else happened!");

        }
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log("Bookmark Key: " + this.state.currentBookmarkKey);
    //alert("This College has been bookmarked!");

  }

  getApplicationLink = () => {
    // if (String(this.state.scholarshipObj.applyLink).length > 1){
    return (this.state.scholarshipObj.applyLink);
    // } else {
    //   return ("about:blank");
    // }
  }

  _handleOpenWithWebBrowser = () => {
    let link = this.state.scholarshipObj.applyLink;
    WebBrowser.openBrowserAsync(link);
  };


  componentDidMount(){
    this.getApplicationLink();
  }

  getDetail = () => {

    let URL =
      //"http://2d071003be2e.ngrok.io/api/v1.2/resources/scholarships/view/titles/" + this.props.route.params.itemKey +"/"+ this.state.usrInfo.email +"/"+ this.state.usrInfo.jwt +"/"+ this.state.usrInfo.uuid ;
      "http://820293c0661c.ngrok.io/api/v1.2/resources/scholarships/view/titles/" + this.props.route.params.itemKey +"/"+ this.state.usrInfo.email +"/"+ this.state.usrInfo.jwt +"/"+ this.state.usrInfo.uuid ;
      // "http://3efdd482435b.ngrok.io/api/v1.2/resources/scholarships/view/titles/" + this.props.route.params.itemKey +"/"+ this.state.usrInfo.email +"/"+ this.state.usrInfo.jwt +"/"+ this.state.usrInfo.uuid ;
    // console.log("URL: "+ URL);
    fetch(URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      // format the API response into json
      .then((response) => response.json())
      .then((json) => {
        
        // set the val to state
        this.setState({
          scholarshipObj: {
            amount: json.amount,
            ava: json.awards_available,
            contact: json.contact_info,
            deadline: json.deadline,
            applyLink: json.direct_link,
            title: json.name,
            description: json.description,
            isBooked: json.isBooked,
          },
        });
        this.forceUpdate();
        // console.log(json.direct_link);

      }).catch((error) => {
        console.log('An error happened: ' + error);
      });
  }

  render() {
    // console.log("Checking ScholarDetail " + JSON.stringify(this.state.usrInfo));

    // console.log("isBooked: "+this.state.isBooked);
    // console.log("usrInfo: "+JSON.stringify(this.state.usrInfo));
    // console.log("usrInfo jwt: "+ JSON.stringify(this.state.usrInfo.jwt));
    // console.log("usrInfo uuid: "+ JSON.stringify(this.state.usrInfo.uuid));

    return (
      <ScrollView horizontal={false} style={styles.container}>
        {this.state.scholarshipObj.isBooked ?
        <View style = {styles.card_grp0}>
        <TouchableOpacity onPress={() => this.removeBookmark()}>
        <MaterialCommunityIcons
                name="bookmark-minus"
                style={styles.unbookmarksIcon}></MaterialCommunityIcons>
              <Text style={styles.removeBookmarksTxt}>Remove Bookmark</Text>
              
        </TouchableOpacity>
      </View>
        :
        <View style = {styles.card_grp0}>
          <TouchableOpacity onPress={() => this.handleBookmark()}>
          <MaterialCommunityIcons
								  name="bookmark-plus"
								  style={styles.bookmarksIcon}></MaterialCommunityIcons>
							  <Text style={styles.bookmarksTxt}>Bookmark This Scholarship</Text>
                
          </TouchableOpacity>
        </View>
        }


        <View style={styles.card_grp1}>
          <View style={styles.title_grp}>
            <Text style={styles.title}>{this.state.scholarshipObj.title}</Text>
          </View>
          <View style={styles.amount_grpStack}>
            <View style={styles.amount_grp}>
              <View style={styles.txt_amountRow}>
                <Text style={styles.txt_amount}>Amount:</Text>
                <Text style={styles.amount}>
                  {this.state.scholarshipObj.amount}
                </Text>
              </View>
            </View>
            <View style={styles.deadline_grp}>
              <View style={styles.txt_deadlineRow}>
                <Text style={styles.txt_deadline}>Deadline:</Text>
                <Text style={styles.deadline}>
                  {this.state.scholarshipObj.deadline}
                </Text>
              </View>
            </View>
            <View style={styles.ava_group}>
              <View style={styles.txt_avaRow}>
                <Text style={styles.txt_ava}>Awards Available:</Text>
                <Text style={styles.ava}>{this.state.scholarshipObj.ava}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card_grp2}>

          <View style={styles.apply_grp}>
            <View style={styles.txt_applyRow}>
              {/* <BeautyWebView
                // Reguired for open and close
                visible={this.state.applyLinkVisible}
                // Reguired for closing the modal
                onPressClose={() => this.handleApplyLinkVisible(false)}
                // use tunnel network here to local test env
                url={this.getApplicationLink()}
              /> */}
              <TouchableOpacity
                style={styles.applyRow}
                onPress={this._handleOpenWithWebBrowser}>
                <Text style={styles.txt_apply}>Apply Link:</Text>
                <Text numberOfLines={5} style={styles.apply}>
                  {this.state.scholarshipObj.applyLink}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.description_grp}>
            <Text style={styles.description2}>Description:</Text>
            <View style={styles.description}>
              <Text style={styles.xtxt}>
                {this.state.scholarshipObj.description}
              </Text>
            </View>
          </View>

          <View style={styles.contact_grp}>
            <Text style={styles.txt_contact}>Contact:</Text>
            <View style={styles.rect}>
              <Text style={styles.contact}>
                {this.state.scholarshipObj.contact}
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6E6',
    width: '100%',
    height: '100%',
  },
  card_grp0: {
    width: '90%',
    marginTop: 25,
    height: 50,
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 5,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  bookmarksIcon:
  {
    color: 'rgba(48,132,188,1)',
    fontSize: 35,
    marginTop: 5,
    marginLeft: 20,
  },
  unbookmarksIcon:
  {
    color: 'rgb(255, 0, 0)',
    fontSize: 35,
    marginTop: 5,
    marginLeft: 20,
  },
  bookmarksTxt: {
    marginLeft: 87,
    marginTop: -22,
    color: 'rgba(48,132,188,1)',
  },
  removeBookmarksTxt: {
    marginLeft: 87,
    marginTop: -22,
    color: 'rgb(175, 7, 45)',
  },
  card_grp1: {
    width: '90%',
    height: 229,
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
    alignSelf: 'center',
  },
  title_grp: {
    backgroundColor: 'rgba(255,255,255,1)',
    height: 97,
    justifyContent: 'center',
  },
  title: {
    color: '#121212',
    fontSize: 20,
    height: "auto",
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  amount_grp: {
    flex: 0.4,
    backgroundColor: 'rgba(255,255,255,1)',
    left: 0,
    top: 0,
    height: 45,
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  txt_amount: {
    color: '#121212',
    fontSize: 14,
    width: "auto",
    height: 32,
    fontWeight: 'bold',
  },
  amount: {
    color: '#121212',
    width: 200,
    height: 32,
    marginLeft: 10,
  },
  txt_amountRow: {
    height: 32,
    flexDirection: 'row',
    flex: 1,
    marginRight: 181,
    marginLeft: 18,
    marginTop: 14,
    fontWeight: 'bold',
  },
  deadline_grp: {
    flex: 0.4,
    backgroundColor: 'rgba(255,255,255,1)',
    left: 0,
    top: 44,
    height: 45,
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  txt_deadline: {
    color: '#121212',
    fontSize: 14,
    width: "auto",
    height: 19,
    fontWeight: 'bold',
  },
  deadline: {
    color: '#121212',
    width: 150,
    height: 32,
    marginLeft: 5,
  },
  txt_deadlineRow: {
    height: 32,
    flexDirection: 'row',
    flex: 1,
    marginRight: 168,
    marginLeft: 18,
    marginTop: 14,
    fontWeight: 'bold',
  },
  ava_group: {
    flex: 0.4,
    backgroundColor: 'rgba(255,255,255,1)',
    left: 0,
    top: 87,
    height: 45,
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  txt_ava: {
    color: '#121212',
    fontSize: 14,
    width: 118,
    height: 32,
    fontWeight: 'bold',
  },
  ava: {
    color: '#121212',
    height: 19,
    width: 108,
    marginLeft: 2,
  },
  txt_avaRow: {
    height: 32,
    flexDirection: 'row',
    flex: 1,
    marginRight: 90,
    marginLeft: 18,
    marginTop: 14,
    fontWeight: 'bold',
  },
  amount_grpStack: {
    height: 132,
    width: "auto",
  },
  card_grp2: {
    width: '90%',
    height: 502,
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 5,
    marginTop: 19,
    alignSelf: 'center',
    marginBottom: 20,
  },
  apply_grp: {
    backgroundColor: 'rgba(255,255,255,1)',
    height: "auto",
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 5,
    flexDirection: 'row',
  },
  txt_apply: {
    color: '#121212',
    width: 71,
    height: 19,
    fontWeight: 'bold',
  },
  apply: {
    color: '#121212',
    height: "auto",
    width: 250,
    // marginLeft: 9,
  },
  txt_applyRow: {
    height: "auto",
    flexDirection: 'row',
    flex: 1,
    marginRight: 197,
    marginLeft: 18,
    marginTop: 15,
    fontWeight: 'bold',
  },
  description_grp: {
    backgroundColor: 'rgba(255,255,255,1)',
    height: "auto",
  },
  description2: {
    color: '#121212',
    width: 80,
    height: 19,
    marginTop: 13,
    marginLeft: 18,
    fontWeight: 'bold',
  },
  description: {
    width: "90%",
    minHeight: 280,
    height: "auto",
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 9,
    marginLeft: 18,
  },
  xtxt: {
    color: '#121212',
    flex: 1,
    height: "auto",
  },
  contact_grp: {
    backgroundColor: 'rgba(255,255,255,1)',
    height: "auto",
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 5,
  },
  txt_contact: {
    color: '#121212',
    width: 71,
    height: "auto",
    marginTop: 15,
    marginLeft: 18,
    fontWeight: 'bold',
  },
  rect: {
    width: 300,
    height: 120,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 6,
    marginLeft: 18,
  },
  contact: {
    color: '#121212',
    flex: 1,
    // height: "auto",
    // marginBottom: 10,
  },
});