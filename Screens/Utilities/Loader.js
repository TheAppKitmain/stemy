import Model from 'react-native-modal';
import {View, ActivityIndicator, Colors} from 'react-native';

export function Loadingcomponent({isVisible}) {
  return (
    <Model
      isVisible={isVisible}
      backdropOpacity={0.5}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'trasnsparent',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <ActivityIndicator size={'large'} color={'#000000'} />
      </View>
    </Model>
  );
}
