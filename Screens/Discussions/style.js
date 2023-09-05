import {StyleSheet} from 'react-native';
import {Colors} from '../Utilities/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackGround,
  },

  barText: {
    fontSize: 14,
    color: Colors.black,
    marginTop: 19,
    alignSelf:'center'
  },

  lableText: {
    fontSize: 16,
    marginLeft: 15,
    color: Colors.black,
    marginTop: 19,
    fontWeight:'600'
  },

  barCenterText: {
    fontSize: 18,
    marginLeft: 15,
    color: Colors.black,
    marginTop: 19,
    flex:1,
    textAlign:'center',
    fontFamily:'SFPRO-BOLD'  
  },

  logintxt: {
    fontSize: 14,
    marginLeft: 15,
    marginTop: 8,
    color: Colors.black,
  },

  editTextBackground:{
      borderWidth:1,
      borderColor:'gray',
      borderRadius:24,
      marginHorizontal:15,
      height:45,
      marginTop:10
  },

  pickerTitleStyle: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    fontWeight: "bold",
},

  pickerStyle: {
    height: 40,
    width: 100,
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
    fontSize: 16,
    color: "#000",
},
selectedCountryTextStyle: {
    paddingLeft: 5,
    color: "#000",
    textAlign: "right",
},

countryNameTextStyle: {
    paddingLeft: 10,
    color: "#000",
    textAlign: "right",
},

flagStyle:{
    height:24,
    width:24,
    borderRadius:30
},

  forget: {fontSize: 14, alignSelf: 'flex-end', marginRight: 15},
});
export default styles;
