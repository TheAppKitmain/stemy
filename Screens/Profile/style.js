import {StyleSheet} from 'react-native';
import {Colors} from '../Utilities/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackGround,
  },

  barText: {
    fontSize: 16,
    color: Colors.black,
    marginTop: 19,
    alignSelf: 'center',
    fontFamily: 'SF Pro Display Regular',
  },

  lableText: {
    fontSize: 16,
    marginLeft: 15,
    color: Colors.black,
    marginTop: 19,
    fontWeight: '600',
  },

  barCenterText: {
    fontSize: 18,
    marginLeft: 15,
    color: Colors.black,
    marginTop: 19,
    flex: 1,
    textAlign: 'center',
    fontFamily: 'SFPRO-BOLD',
  },

  logintxt: {
    fontSize: 14,
    marginLeft: 15,
    marginTop: 8,
    color: Colors.black,
  },

  editTextBackground: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 24,
    marginHorizontal: 15,
    height: 45,
    marginTop: 10,
  },

  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  pickerStyle: {
    height: 40,
    width: 100,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#000',
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    color: '#000',
    textAlign: 'right',
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: 'right',
  },

  flagStyle: {
    height: 24,
    width: 24,
    borderRadius: 30,
  },

  input: {
    width: '90%',
    height: '40%',
    color: 'black',
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#FAFAFA',
    textAlignVertical: 'top',
    padding: 15,
    borderWidth: 0.2,
    marginVertical: 20,
    fontFamily: 'SF Pro Display Regular',
  },

  item: {
    height: 30,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 8,
    marginHorizontal: 10,
    borderWidth: 0.2,
    borderRadius: 20,
    alignItems: 'center',
  },

  itemSelected: {
    height: 30,
    backgroundColor: '#fff9ed',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 8,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    borderColor: '#DBAA4A',
  },

  itemLink: {
    height: 30,
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 8,
    marginHorizontal: 10,
  },

  itemSelectedLink: {
    height: 30,
    width: '100%',
    backgroundColor: '#fff9ed',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 8,
    marginHorizontal: 10,
    borderColor: '#DBAA4A',
  },

  item2: {
    height: 30,
    paddingVertical: 5,
    marginVertical: 8,
    flexDirection: 'column',
  },

  title: {
    textAlignVertical: 'center',
    color: 'black',
    fontSize: 14,
    alignSelf: 'center',
    fontFamily: 'SF Pro Display Regular',
  },

  title2: {
    textAlignVertical: 'center',
    color: 'black',
    fontSize: 14,
    paddingStart: 20,
  },

  titleLink: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'SF Pro Display Regular',
  },

  inputAddLink: {
    width: '90%',
    height: 50,
    color: 'black',
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    textAlignVertical: 'top',
    paddingHorizontal: 15,
    borderWidth: 0.2,
    marginVertical: 15,
  },

  forget: {fontSize: 14, alignSelf: 'flex-end', marginRight: 15},
});
export default styles;
``;
