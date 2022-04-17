import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, Fonts } from '../constants';
import { Logout } from '../store/actions';
import Feather from 'react-native-vector-icons/Feather';
import { Display } from '../utils';
import moment from 'moment';
import { Guid } from 'guid-typescript';
import axios from 'axios';
import { API, BASE_URL } from '../utils/Config';

const VIEWS = ['ClockIn', 'ClockOut'];
const LOCATION = {
  id: '40aa51f7-5c18-4aff-841b-f544d4765fa2',
  latitude: 10.8247911,
  longitude: 78.6861847,
};

const WelcomeScreen = ({ navigation }) => {
  const [checkIn, setCheckIn] = useState(Guid.EMPTY);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('ClockIn');

  const dispatch = useDispatch();

  const {
    userReducer: { authToken, employeeId, businessUnitId },
  } = useSelector(state => state);

  const handleSubmit = () => {
    dispatch(Logout());
  };

  const getRecentClockIn = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: BASE_URL + API.getLastCheckIn,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          BusinessUnitId: businessUnitId,
          EmployeeId: employeeId,
          Date: moment().format('YYYY-MM-DD'),
        },
      });

      if (response && response.data) {
        setLoading(false);
        const [recentCheckIn] = response.data;
        setCheckIn(recentCheckIn.Id);
        console.log(recentCheckIn);
        ToastAndroid.show('recent checkin data fetched', ToastAndroid.SHORT);
      }
    } catch (error) {
      setLoading(false);
      console.log('error occurred', error);
    }
  };

  const postAttendance = async () => {
    setLoading(true);

    const attendance = {
      Attachment: null,
      EmployeeIdList: [
        {
          EmpId: employeeId,
          Id: view === 'ClockIn' ? Guid.EMPTY : checkIn,
          Temperature: 0,
        },
      ],
      LocationId: LOCATION.id,
      View: view,
      lat: LOCATION.latitude,
      lng: LOCATION.longitude,
      ProjectId: null,
      ProjectLocationId: null,
      Remarks: '',
    };

    try {
      const response = await axios({
        url: BASE_URL + API.postAttendance,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          ...attendance,
        },
      });

      if (response && response.data) {
        setLoading(false);
        ToastAndroid.show(response.data, ToastAndroid.SHORT);
      }
    } catch (error) {
      setLoading(false);
      console.log('error occurred', error);
    }
  };

  useEffect(() => {
    if (view === 'ClockOut') {
      getRecentClockIn();
    }
  }, [view]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={Colors.DEFAULT} />
        </View>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              // alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginTop: 32,
              }}>
              {VIEWS.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={
                    item === view
                      ? styles.activeButtonStyle
                      : styles.inActiveButtonStyle
                  }
                  key={item + index}
                  onPress={() => setView(item)}>
                  <Text
                    style={
                      item === view
                        ? styles.activeButtonText
                        : styles.inActiveButtonText
                    }>
                    {item === 'ClockIn' ? 'Check In' : 'Check Out'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: Colors.DEFAULT,
                width: 150,
                height: 150,
                borderRadius: 150 / 2,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 64,
                alignSelf: 'center',
              }}
              onPress={postAttendance}>
              <Feather name="power" size={32} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={handleSubmit}>
              <Feather name={'log-out'} size={20} color={Colors.WHITE} />
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontFamily: Fonts.VARELA_REGULAR,
    color: Colors.DEFAULT,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginBottom: 10,
    marginHorizontal: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.DEFAULT,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.WHITE,
    marginLeft: 12,
  },
  activeButtonStyle: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.DEFAULT,
    borderRadius: 8,
  },
  activeButtonText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontWeight: '700',
    color: 'white',
  },
  inActiveButtonStyle: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  inActiveButtonText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: '#64748B',
  },
});

export default WelcomeScreen;
