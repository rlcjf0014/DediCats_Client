import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import { Button, ListItem, Content, Text } from 'native-base';
import ActionSheet from 'react-native-actionsheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    paddingTop: 20,
    fontSize: 25,
    fontWeight: '600',
  },
  profileView: {
    flex: 10,
    width: '100%',
    alignItems: 'center',
  },
  photo: {
    alignItems: 'center',
  },
  myPhoto: {
    width: 170,
    height: 170,
    resizeMode: 'stretch',
    overflow: 'hidden',
    borderRadius: 30,
    borderColor: '#edf1f5',
    borderWidth: 1,
    marginBottom: 20,
  },
  content: { width: '95%' },
  listView: { flexDirection: 'row' },
  nickname: { width: '30%', paddingLeft: 0 },
  rest: { width: '30%', paddingRight: 30 },
  index: { color: '#444444' },
  field: { width: '70%' },
  disabledBtn: { width: '100%' },
  editTxt: { color: '#677ef1', fontWeight: 'bold' },
  font16: {
    fontSize: 16,
  },
});

class MyProfile_Elements extends React.Component {
  _showActionSheet = () => this.ActionSheet.show();

  componentDidMount() {
    console.log('MyProfile_Elements mount');
    this.props.getMyInfo();
  }

  render() {
    const {
      navigation,
      getPermissionAsync,
      pickImage,
      userInfo,
      convertDateTime,
      postMyPhoto,
      myUri,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.title}>회원정보 수정</Text>
        </View>
        <View style={styles.profileView}>
          <Image
            style={styles.myPhoto}
            source={{
              uri: userInfo.photoPath === null ? myUri : userInfo.photoPath,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this._showActionSheet();
            }}
          >
            <Text>사진수정</Text>
          </TouchableOpacity>

          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title="프로필 사진 설정"
            options={['앨범에서 사진 선택', '기본 이미지로 변경', '취소']}
            cancelButtonIndex={2}
            onPress={async index => {
              if (index === 0) {
                await getPermissionAsync();
                await pickImage('user', 'my');
                postMyPhoto();
              }
              if (index === 1) {
                // delete 함수 짜야함
              }
            }}
          />

          <Content style={styles.content}>
            <ListItem style={styles.listView}>
              <View style={styles.nickname}>
                <Text style={styles.index}>
                  <MaterialCommunityIcons name="paw" style={styles.font16} />{' '}
                  Nickname
                </Text>
              </View>
              <View style={styles.field}>
                <Button disabled bordered style={styles.disabledBtn}>
                  <Text>{userInfo.nickname}</Text>
                </Button>
              </View>
            </ListItem>

            <ListItem style={styles.listView}>
              <View style={styles.rest}>
                <Text style={styles.index}>
                  <MaterialCommunityIcons
                    name="email-check-outline"
                    style={styles.font16}
                  />{' '}
                  Email
                </Text>
              </View>
              <View style={styles.field}>
                <Button disabled bordered style={styles.disabledBtn}>
                  <Text>{userInfo.email}</Text>
                </Button>
              </View>
            </ListItem>
            <ListItem style={styles.listView}>
              <View style={styles.rest}>
                <Text style={styles.index}>
                  <MaterialCommunityIcons
                    name="calendar"
                    style={styles.font16}
                  />{' '}
                  Since
                </Text>
              </View>
              <View style={styles.field}>
                <Button disabled bordered style={styles.disabledBtn}>
                  <Text>{convertDateTime(userInfo.createAt).slice(0, 8)}</Text>
                </Button>
              </View>
            </ListItem>
            <ListItem />
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChangePW');
                }}
              >
                <Text style={styles.editTxt}>비밀번호 수정하기</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChangePW');
                }}
              >
                <Text>문의하기</Text>
              </TouchableOpacity>
            </ListItem>
          </Content>
        </View>
      </View>
    );
  }
}

export default inject(({ auth, helper, user }) => ({
  userInfo: auth.userInfo,
  getMyInfo: auth.getMyInfo,
  getPermissionAsync: auth.getPermissionAsync,
  pickImage: helper.pickImage,
  convertDateTime: helper.convertDateTime,
  myUri: user.myUri,
  postMyPhoto: user.postMyPhoto,
}))(observer(withNavigation(MyProfile_Elements)));
