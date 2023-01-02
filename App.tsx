import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {BottomSheetContainer} from './src/components/BottomSheet/BottomSheet';
import {BottomSheetSample} from './src/components/BottomSheet/BottomSheetSample';
import {FULL_SCREEN_HEIGHT} from './src/lib/size';
import axiosInstance from './src/services/axios';
import {SampleInstance} from './src/services/sample';
const App = () => {
  const [sensorsInfo, setSensorsInfo] = useState<[]>([]);
  const sampleModal = useRef<BottomSheetModal>(null);
  const handleSampleModalPress = () => sampleModal.current?.present();

  const handleAxiosPress = async () => {
    const service = await SampleInstance().getIpAddress();
    Alert.alert('My ip is ', service);
  };

  const handleServerInfoPress = async () => {
    const service = await SampleInstance().getSensorsInfo();
    setSensorsInfo(service);
  };

  useEffect(() => {
    handleServerInfoPress();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{backgroundColor: '#fff'}}>
          {/* // status bar style */}
          <View style={{display: 'flex', height: FULL_SCREEN_HEIGHT}}>
            <BottomSheetSample ref={sampleModal} />

            {/* start point */}
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text
                style={{fontSize: RFValue(20), color: 'rgb(105, 185, 255)'}}>
                CPU Temperature
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                  marginTop: 20,
                }}>
                {sensorsInfo &&
                  sensorsInfo.map((v: string, i: number) => (
                    <View
                      key={i}
                      style={{
                        marginHorizontal: 8,
                        marginVertical: 8,
                        backgroundColor: '#000',
                        padding: 16,
                        borderRadius: 20,
                      }}>
                      <CircularProgress
                        value={~~v}
                        radius={50}
                        duration={2000}
                        progressValueColor={
                          ~~v > 80
                            ? '#ff0000'
                            : ~~v > 70
                            ? '#f99e2e'
                            : '#3fe29b'
                        }
                        activeStrokeWidth={10}
                        maxValue={100}
                        title={''}
                        titleColor={'black'}
                        titleStyle={{fontWeight: 'bold'}}
                        valueSuffix={'°C'}
                        inActiveStrokeColor={'#d3d3d3'}
                      />
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
