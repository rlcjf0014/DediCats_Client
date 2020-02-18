import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  AsyncStorage,
  StyleSheet, Text, View, Button, Image, TouchableOpacity,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6772f1',
  },
  photoView: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  defaultPhoto: {
    width: 160,
    height: 160,
    resizeMode: 'stretch',
    overflow: 'hidden',
    borderRadius: 30,
  },
  catPhoto: {
    width: 160,
    height: 160,
    resizeMode: 'stretch',
    overflow: 'hidden',
    borderRadius: 30,
    borderColor: '#6772f1',
    borderWidth: 1,
  },
  infoView: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nickName: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
    marginVertical: 5,
  },
  address: {
    fontSize: 15,
    color: 'white',
    marginBottom: 10,
  },
  btn: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  btnTxt: {
    color: '#677ef1',
    fontWeight: 'bold',
  },
});
const DEFAULT_CAT = 'https://www.pngitem.com/pimgs/m/85-850345_dog-puppy-silhouette-svg-png-icon-free-download.png';
class MyPage extends React.Component {
  componentDidMount = async () => {
    await this.props.getMyInfo();
  }


  render() {
    if (!this.props.userInfo) {
      return (<View style={styles.container} />);
    }


    return (
      <View style={styles.container}>
        {/* <Text>This is My Page!</Text>
    <Button
      title="회원정보 수정"
      onPress={() => props.navigation.navigate('EditMyProfile')}
    /> */}
        <View style={styles.profileView}>
          <View style={styles.photoView}>
            <Image
              style={styles.defaultPhoto}
              source={{
                uri: DEFAULT_CAT,
              }}
            />
          </View>
          <View style={styles.infoView}>
            <Text style={styles.nickName}>{this.props.userInfo.nickname}</Text>
            <Text style={styles.address}>{ moment(this.props.userInfo.createAt).format('YY/MM/DD h:mm a')}</Text>

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnTxt}>회원정보 수정</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnTxt}>로그아웃</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  }
}


export default inject(({ auth }) => ({
  userInfo: auth.userInfo,
  getMyInfo: auth.getMyInfo,
}))(observer(MyPage));
