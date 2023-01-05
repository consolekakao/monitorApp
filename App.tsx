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
import * as Progress from 'react-native-progress';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {BottomSheetContainer} from './src/components/BottomSheet/BottomSheet';
import {BottomSheetSample} from './src/components/BottomSheet/BottomSheetSample';
import {FULL_SCREEN_HEIGHT} from './src/lib/size';
import axiosInstance from './src/services/axios';
import {SampleInstance} from './src/services/sample';
interface diskInfo {
  used: number;
  total: number;
  available: number;
}

interface memoryInfo {
  used: number;
  total: number;
  available: number;
}

interface pm2Info {
  user: string;
  mem: string;
  name: string;
  pid: string;
  status: string;
}

const App = () => {
  const [sensorsInfo, setSensorsInfo] = useState<[]>([]);
  const [memoryInfo, setMemoryInfo] = useState<memoryInfo>();
  const [diskInfo, setDiskInfo] = useState<diskInfo>();
  const [pm2Info, setPm2Info] = useState<pm2Info>();

  const sampleModal = useRef<BottomSheetModal>(null);
  const handleSampleModalPress = () => sampleModal.current?.present();

  const handleAxiosPress = async () => {
    const service = await SampleInstance().getIpAddress();
    Alert.alert('My ip is ', service);
  };

  const init = async () => {
    const sensors = await SampleInstance().getSensorsInfo();
    const disk = await SampleInstance().getDiskInfo();
    const memory = await SampleInstance().getMemoryInfo();
    const pm2 = await SampleInstance().pm2Info();
    const restartPm2 = await SampleInstance().restartPm2();

    setSensorsInfo(sensors);
    setDiskInfo(disk);
    setMemoryInfo(memory);
    setPm2Info(pm2);
  };

  useEffect(() => {
    init();
    // setInterval(init, 60000);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{backgroundColor: '#fff'}}>
          {/* // status bar style */}
          <View style={{display: 'flex', height: FULL_SCREEN_HEIGHT}}>
            <ScrollView style={{marginBottom: 50}}>
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
                          duration={700}
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

                <Text
                  style={{
                    fontSize: RFValue(20),
                    color: 'rgb(105, 185, 255)',
                    marginTop: 8,
                  }}>
                  Disk
                </Text>

                {diskInfo && (
                  <View
                    style={{
                      marginHorizontal: 8,
                      marginVertical: 8,
                      backgroundColor: '#000',
                      padding: 16,
                      borderRadius: 20,
                    }}>
                    <Progress.Bar
                      progress={diskInfo.used / diskInfo.total}
                      width={250}
                      color={'#3fe29b'}
                      unfilledColor={'#d3d3d3'}
                      borderColor={'#d3d3d3'}
                    />
                    <Text
                      style={{
                        color: '#3fe29b',
                        textAlign: 'center',
                        fontSize: 30,
                        marginTop: 16,
                      }}>
                      {~~(diskInfo.available / 1000)}GB Free
                    </Text>
                  </View>
                )}

                <Text
                  style={{
                    fontSize: RFValue(20),
                    color: 'rgb(105, 185, 255)',
                    marginTop: 8,
                  }}>
                  Memory
                </Text>

                {memoryInfo && (
                  <View
                    style={{
                      marginHorizontal: 8,
                      marginVertical: 8,
                      backgroundColor: '#000',
                      padding: 16,
                      borderRadius: 20,
                    }}>
                    <Progress.Bar
                      progress={memoryInfo.used / memoryInfo.total}
                      width={250}
                      color={'#3fe29b'}
                      unfilledColor={'#d3d3d3'}
                      borderColor={'#d3d3d3'}
                    />
                    <Text
                      style={{
                        color: '#3fe29b',
                        textAlign: 'center',
                        fontSize: 30,
                        marginTop: 16,
                      }}>
                      {(memoryInfo.available / 1000).toFixed(2)}GB Free
                    </Text>
                  </View>
                )}

                <Text
                  style={{
                    fontSize: RFValue(20),
                    color: 'rgb(105, 185, 255)',
                    marginTop: 8,
                  }}>
                  PM2
                </Text>

                {memoryInfo && (
                  <View
                    style={{
                      marginHorizontal: 8,
                      marginVertical: 8,
                      backgroundColor: '#000',
                      padding: 8,
                      borderRadius: 20,
                      width: 280,
                    }}>
                    <Text
                      style={{
                        color: '#3fe29b',
                        textAlign: 'center',
                        fontSize: 20,
                        marginTop: 4,
                      }}>
                      Name: {pm2Info?.name}
                    </Text>

                    <Text
                      style={{
                        color: '#3fe29b',
                        textAlign: 'center',
                        fontSize: 20,
                        marginTop: 4,
                      }}>
                      Status: {pm2Info?.status}
                    </Text>

                    <Text
                      style={{
                        color: '#3fe29b',
                        textAlign: 'center',
                        fontSize: 20,
                        marginTop: 4,
                      }}>
                      Uptime: {pm2Info?.pid}
                    </Text>

                    <Text
                      style={{
                        color: '#3fe29b',
                        textAlign: 'center',
                        fontSize: 20,
                        marginTop: 4,
                      }}>
                      Memory: {pm2Info?.mem}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
