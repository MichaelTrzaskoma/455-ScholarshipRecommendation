import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, } from 'react-native';
import BeautyWebView from 'react-native-beauty-webview';

export default class ViewScholarDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scholarshipObj: {
        amount: '',
        ava: '',
        contact: '',
        deadline: '',
        description: '',
        applyLink: '',
        title: '',
      },
      applyLinkVisible: false,
    };
    this.handleApplyLinkVisible = this.handleApplyLinkVisible.bind(this);
  }

  handleApplyLinkVisible(boolean) {
    this.setState({
      applyLinkVisible: boolean
    });
  }

  componentDidMount() {
    this.getDetail();
  }

  getDetail = () => {
    // console.log("The Key: " + this.props.route.params.itemKey);
    // let URL = "http://341fad54d4fc.ngrok.io/api/v1.2/scholarship/view/title/" + this.props.route.params.itemKey;
    let URL =
      'http://5144454dac7b.ngrok.io/api/v1.2/scholarship/view/title/Kentucky%20Tuition%20Grant';

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
          scholarshipObj: {
            amount: json.amount,
            ava: json.awards_available,
            contact: json.contact_info,
            deadline: json.deadline,
            applyLink: json.direct_link,
            title: json.name,
            description: json.description,
          },
        }).catch((error) => {
          console.log('An error happened: ' + error);
        });
      });
  }

  render() {
    return (
      <ScrollView horizontal={false} style={styles.container}>
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
              <TouchableOpacity style={styles.applyRow} onPress={() => { this.handleApplyLinkVisible(true) }}>
                <Text style={styles.txt_apply}>Apply Link:</Text>
                <Text numberOfLines={5} style={styles.apply}>
                  {this.state.scholarshipObj.applyLink}
                </Text>
              </TouchableOpacity>
              <BeautyWebView
                // Reguired for open and close
                visible={this.state.applyLinkVisible}
                // Reguired for closing the modal
                onPressClose={() => this.handleApplyLinkVisible(false)}
                // use tunnel network here to local test env
                url={this.state.scholarshipObj.applyLink}
              />

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
  card_grp1: {
    width: '90%',
    height: 229,
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 30,
    alignSelf: 'center',
  },
  title_grp: {
    backgroundColor: 'rgba(255,255,255,1)',
    height: 97,
    justifyContent: 'center',
  },
  title: {
    color: '#121212',
    fontSize: 16,
    height: 52,
    width: '90%',
    textAlign: 'left',
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
  },
  apply_grp: {
    backgroundColor: 'rgba(255,255,255,1)',
    height: 80,
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
    height: 80,
    width: 250,
    marginLeft: 9,
  },
  txt_applyRow: {
    height: 19,
    flexDirection: 'row',
    flex: 1,
    marginRight: 197,
    marginLeft: 18,
    marginTop: 15,
    fontWeight: 'bold',
  },
  description_grp: {
    backgroundColor: 'rgba(255,255,255,1)',
    height: 330,
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
    width: 300,
    height: 281,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 9,
    marginLeft: 18,
  },
  xtxt: {
    color: '#121212',
    flex: 1,
  },
  contact_grp: {
    backgroundColor: 'rgba(255,255,255,1)',
    height: 135,
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 5,
  },
  txt_contact: {
    color: '#121212',
    width: 71,
    height: 19,
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
    // marginBottom: 10,
  },
});
