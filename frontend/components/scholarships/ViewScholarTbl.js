import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

//const itemsPerPage = 10;

export default class ViewScholarTbl extends React.Component {
  constructor(props) {
    super(props);
    // this.props.route.params.itemKey

    this.state = {
      isLoading: true,
      scholarArr: [],
      //stagingArea: [],
      pageNumber: 1,
      modalVisible: false,
      currentBookmarkKey: "",
      //email: this.props.usrInfo.email,
      userProfile: this.props.route.params.usrProfile
    };
  }

  parseMonth(month) {
    switch (month) {
      case "January":
        return "01";
        break;
      case "February":
        return "02";
        break;
      case "March":
        return "03";
        break;
      case "April":
        return "04";
        break;
      case "May":
        return "05";
        break;
      case "June":
        return "06";
        break;
      case "July":
        return "07";
        break;
      case "August":
        return "08";
        break;
      case "September":
        return "09";
        break;
      case "October":
        return "10";
        break;
      case "November":
        return "11";
        break;
      default:
        return "12";
        break;
    }
  }

  componentDidMount() {
    // NSAFE_componentWillMount() {
    this.getDoc();
  }

  getDoc = () => {
    const scholarArr = [];

    let URL = "http://b91079d57729.ngrok.io/api/v1.2/resources/scholarships/view/categories/sub/" + this.props.route.params.itemKey;

    fetch(URL, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        json.forEach((res) => {
          let deadline = "";

          if (res.deadline == "Deadline Varies") {
            deadline = "Varies";
          } else {
            const fields = res.deadline.split(" ");
            const sub_field = fields[1].split(",");
            deadline = this.parseMonth(fields[0]) + "/" + sub_field[0] + "/" + fields[2];
          }

          scholarArr.push({
            key: res.name,
            amount: res.amount,
            deadline: deadline,
            name: res.name,
          });

        });

        this.setState({
          scholarArr,
          isLoading: false,
          //stagingArea: scholarArr.slice(0,5)
        });

      });

    // console.log(this.state.scholarArr);

  };


  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setCurrentBookmarkkey = (itemKey) => {
    this.setState({ currentBookmarkKey: itemKey});
  }

  handleBookmarkOpen(key)
  {
    this.setModalVisible(true)
    this.setState({ currentBookmarkKey: key });
  }

  handleBookmark() {

    console.log("Here is ViewScholarTbl and triggered bookmark")
    this.setState({ modalVisible: false});
    console.log(this.state.currentBookmarkKey)

    //Insert API Call here
    let URL = "http://b91079d57729.ngrok.io/api/v1.2/users/id/"+ this.state.userProfile.email + "/bookmarks/scholarship/"+ this.state.userProfile.jwt+ "/"+ this.state.userProfile.uuid;

    fetch(URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": this.state.currentBookmarkKey,
      }),
    })
      .then((response) => {
        if (response.status == 202) {

          alert("Bookmarked!");

        } else if (response.status == 208) {

          alert("Already bookmarked!");

        } else {
          
          alert("Bookmark failed!");

        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("Bookmark Key: " + this.state.currentBookmarkKey);
    // alert("This scholarship has been bookmarked!");

  }

  FlatListItemSeparator = () => {
    return <View style={styles.ItemSeparator} />;
  };

  renderList(item, i) {
    return (
      <View>
        <TouchableOpacity
          onLongPress={() => { this.handleBookmarkOpen(item.key) }}
          onPress={() => {
            // we are able to navigate to "ViewSubCate"
            // since it is one of the stack screens in App.js
            // therefore, no need to import in this screen
            this.props.navigation.navigate('ViewScholarDetail', {
              title: item.key,
              itemKey: item.key,
              userProfile: this.props.route.params.usrProfile
            });
          }}
        >
          <Text style={styles.item_title}>{item.key}</Text>
          <Text style={styles.item_subTitle}>Amount: {item.amount}</Text>
          <Text style={styles.item_deadline}>
            Deadline: {item.deadline}
          </Text>
        </TouchableOpacity>
      </View>

    );
  }

  /*
  loadMore = ()  => {
  
    //const { pageNumber, scholarArr } = this.state;
    const tempPageNumber = this.state.pageNumber;
    const currentScholarArr = this.state.scholarArr;
    const start = tempPageNumber*itemsPerPage;
    const end = (tempPageNumber+1)*itemsPerPage-1;
    const stagingArea = this.state.stagingArea;

    // here, we will receive next batch of the items
    const newData = currentScholarArr.slice(start, end); 
     // here we are appending new batch to existing batch
    this.setState({
      stagingArea: [...stagingArea, ...newData],
      //pageNumber : tempPageNumber + 1,
    });
  }
  */


  render() {
    const { modalVisible } = this.state;
    // console.log("Checking ViewScholarTbl " + JSON.stringify(this.props.route.params.usrProfile));
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
         <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{this.state.currentBookmarkKey}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.handleBookmark()}
              >
                <Text style={styles.textStyle}>Bookmark</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose2]}
                onPress={() => this.setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
            <View>

            </View>
          </View>
        </Modal>
        <FlatList
          data={this.state.scholarArr}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item, index }) => this.renderList(item, index)}
          keyExtractor={item => item.key}
          //onEndReached={this.loadMore}
          maxToRenderPerBatch={10}
        //onEndThreshold={0}
        ></FlatList>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: 740,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  rect3: {
    backgroundColor: "#E6E6E6",
    flex: 1,
  },
  button: {
    backgroundColor: "rgba(255,255,255,1)",
    height: 100,
  },
  item_title: {
    fontWeight: "bold",
    color: "#121212",
    fontSize: 16,
    height: 37,
    width: "80%",
    marginTop: 16,
    marginLeft: 13,
  },
  item_subTitle: {
    color: "#121212",
    fontSize: 12,
    width: "auto",
    height: 15,
    marginTop: 10,
    marginLeft: 13,
  },
  item_deadline: {
    color: "#121212",
    fontSize: 12,
    width: "100%",
    height: 15,
    marginBottom: 13,
    marginLeft: "68%",
  },
  ItemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonClose2: {
    backgroundColor: "#c42e23",
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
