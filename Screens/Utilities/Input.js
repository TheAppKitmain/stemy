import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Colors, Fonts} from './Colors';
import VectorIcon from './vectorIcons';
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export function CommonInput({
  label,
  labeltype,
  iconSource,
  secureTextEntry,
  onChangeText,
  value,
  onPress,
  source,
  error,
  showlabel,
  errorspacing,
  placeholder,
  lefticon,
  keyboardType,
  maxLength,
  returnKeyType,
  model,
  onFocus,
  autoFocus,
  multi,
  multiline,
  blurOnSubmit,
  height,
  size,
  txtlabel,
  selectionColor,
  ref,
  istab,
  icolor,
  placeholderTextColor,
  isicon,
  txtcolor,
  editable,
  onSubmitEditing,
  eye,
  hidepass,
  eyename,
}) {
  return (
    <View>
      <View style={styles.flexrow}>
        {showlabel === 'no' ? null : (
          <Text style={styles.showlabel}>{txtlabel}</Text>
        )}
      </View>

      <View
        style={[
          styles.textBoxBtnHolder,
          {borderRadius: multi === 'yes' ? 25 : 25, borderColor: 'grey'},
        ]}>
        <TextInput
          underlineColorAndroid="transparent"
          secureTextEntry={secureTextEntry}
          style={[
            styles.textBox,
            {
              paddingRight: eye === 'YES' ? 40 : 10,
              minHeight: multi === 'yes' ? height : 54,
              textAlignVertical: 'center',
              paddingVertical: multi === 'yes' ? 10 : 0,
              justifyContent: 'center',
            },
          ]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          onFocus={onFocus}
          autoFocus={autoFocus}
          multiline={multiline}
          blurOnSubmit={blurOnSubmit}
          selectionColor={Colors.mainColor}
          editable={editable}
          ref={ref}
          onSubmitEditing={onSubmitEditing}
          placeholderTextColor={placeholderTextColor}
        />
        {eye !== 'NO' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.visibilityBtn}
            onPress={onPress}>
            <VectorIcon
              groupName={'Entypo'}
              name={eyename}
              size={25}
              color={Colors.icons}
              onPress={hidepass}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text
        style={[
          styles.errortxt,
          {marginVertical: errorspacing === 'yes' ? 10 : 5},
        ]}>
        {error}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: Colors.label,
    marginBottom: 5,
    // fontFamily: Fonts.Regular,
  },

  textBoxBtnHolder: {
    position: 'relative',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -10,
    borderWidth: 1,
    height: 48,
    width: screenWidth / 1.1,
  },
  backbtnimg: {
    height: 41,
    width: 41,
    resizeMode: 'contain',
  },
  textBox: {
    fontSize: 14,
    height: 48,
    paddingHorizontal: 13,
    width: screenWidth / 1.3,
    paddingVertical: 0,
    // fontFamily: Fonts.Regular,
    color: Colors.black,
    fontWeight: '400',
    borderRadius: 8,
  },

  visibilityBtn: {
    position: 'absolute',
    right: 10,
  },

  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  errortxt: {
    fontSize: 10,
    color: Colors.red,
    marginVertical: 10,
    // fontFamily: Fonts.Normal,
    alignSelf: 'flex-start',
    marginLeft: 18,
  },

  showlabel: {
    fontSize: 16,
    marginLeft: 15,
    color: Colors.black,
    // fontFamily: Fonts.RobotoMedium_0,
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginVertical: 2,
  },
});
