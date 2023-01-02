import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import React from 'react';

const renderBackdrop = (props: any) => (
  <BottomSheetBackdrop
    {...props}
    pressBehavior="close"
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    //force rendered first dackdrop balck screen.
  />
);

export const BottomSheetContainer = React.forwardRef((props: any, ref: any) => {
  const {snapPoints} = props;

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      style={{alignItems: 'center'}}>
      {props.children}
    </BottomSheetModal>
  );
});
