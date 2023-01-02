import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {useMemo, useRef} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {BottomSheetContainer} from './BottomSheet';

export const BottomSheetSample = React.forwardRef((props: any, ref: any) => {
  const snapPoints = useMemo(() => ['30%'], []);
  const closeModal = () => ref.current.close();

  const handlePress = () => {
    closeModal();
  };

  return (
    <BottomSheetContainer ref={ref} snapPoints={snapPoints}>
      <BottomSheetScrollView>
        <Text>Happy coding!</Text>
        <Text>Happy coding!</Text>
        <Text>Happy coding!</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text
            style={{
              fontSize: RFValue(20),
              color: 'rgb(105, 185, 255)',
              marginTop: 30,
              alignSelf: 'center',
            }}>
            close
          </Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheetContainer>
  );
});
