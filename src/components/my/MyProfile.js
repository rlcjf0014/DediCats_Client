import React from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#edf1f5',
  },
  photoView: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  photo: {
    width: '75%',
    height: '100%',
    resizeMode: 'stretch',
    overflow: 'hidden',
    borderRadius: 30,
  },
  infoView: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nickName: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 5,
  },
  address: {
    fontSize: 15,
    color: '#444444',
    marginBottom: 10,
  },
  btn: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#6772f1',
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});

class MyProfile extends React.Component {
  componentDidMount() {
    console.log('MyProfile mount');
    this.props.getMyInfo();
  }

  render() {
    console.disableYellowBox = 'true';
    console.log('프로필 렌더할 때 유저정보 =', this.props.userInfo);
    if (!this.props.userInfo) {
      return <View style={styles.container} />;
    }
    const { userInfo } = this.props;
    const { nickname, createAt } = userInfo;
    const { convertDateTime, navigation, signOut, myUri } = this.props;
    const defaultPhotoUrl =
      'https://ca.slack-edge.com/T5K7P28NN-U5NKFNELV-g3d11e3cb933-512';

    return (
      <View style={styles.container}>
        <View style={styles.profileView}>
          <View style={styles.photoView}>
            <Image
              style={styles.photo}
              source={{
                uri:
                  userInfo.photoPath === null
                    ? myUri
                    : userInfo.photoPath !== null && myUri !== defaultPhotoUrl
                    ? myUri
                    : userInfo.photoPath,
              }}
            />
          </View>
          <View style={styles.infoView}>
            <Text style={styles.nickName}>{nickname}</Text>
            <Text style={styles.address}>
              {`가입일 : ${convertDateTime(createAt).slice(0, 8)}`}
            </Text>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigation.navigate('EditMyProfile');
              }}
            >
              <Text style={styles.btnTxt}>회원정보 수정</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                const result = await signOut();
                if (result) navigation.navigate('AuthLoading');
              }}
            >
              <Text style={{ paddingTop: 5, color: '#677ef1' }}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default inject(({ auth, helper, user }) => ({
  userInfo: auth.userInfo,
  getMyInfo: auth.getMyInfo,
  signOut: auth.signOut,
  convertDateTime: helper.convertDateTime,
  myUri: user.myUri,
  myPhotoPath: user.myPhotoPath,
}))(observer(withNavigation(MyProfile)));
