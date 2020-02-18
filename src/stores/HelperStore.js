import { action, decorate, runInAction } from 'mobx';
import { Alert } from 'react-native';
import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';

const defaultCredential = { withCredentials: true };

class HelperStore {
  constructor(root) {
    this.root = root;
  }

  // cat(info) -> selectedCat, inputContent, inputComment, newTag
  // auth -> email, nickname, confirmPW, reConfirmPW, PW, emailVerification
  // cat(addCat) -> catNickname, catSpecies, catDescription
  updateInput = (store, variable, text) => {
    this.root[store][variable] = text;
  };

  // auth: 'email', 'nickname', 'confirmPW', 'reConfirmPW', 'emailVerification', 'PW',
  // selectedCatNewTag, inputComment -> selectedCatInputComment
  clearInput = (store, ...variable) => {
    variable.forEach(el => {
      runInAction(() => {
        this.root[store][el] = '';
      });
    });
  };

  clearAddCatBio = () => {
    // From CatStore
    const { cat } = this.root;
    cat.addCatLocation = { latitude: 37.049784, longitude: 127.049784 };
    cat.addCatPhotoPath = null;
    cat.addCatUri = null;
    cat.addCatNickname = '';
    cat.addCatDescription = '';
    cat.addCatSpecies = '';
    cat.addCatCutClicked = { Y: false, N: false, unknown: false };
    cat.addCatCut = { Y: 0, N: 0, unknown: 0 };
  };

  // selectedCat inputComment, inputContent
  validateAddInput = type => {
    if (this.root.cat[type]) {
      return true;
    }
    Alert.alert('글을 입력하신 후 등록해주세요!');
    return false;
  };

  unFollowCat = catId => {
    const { cat, user } = this.root;
    console.log('캣 아이디는', catId);
    axios
      .post(`${SERVER_URL}/cat/unfollow`, { catId }, defaultCredential)
      .then(res => {
        user.unFollowedCat = catId;
        runInAction(() => {
          cat.getSelectedCatInfo(catId);
          cat.getFollowerList(catId);
        });
      })
      .catch(err => console.dir(err));
  };

  pickImage = async (store, type) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      const imageTarget = `data:image/jpeg;base64,${result.base64}`;
      this.root[store][`${type}Uri`] = result.uri;
      this.root[store][`${type}PhotoPath`] = imageTarget;
    }
  };

  removePhoto = () => {
    this.root.cat.selectedCatUri = null;
  };

  // * Helper Store from CatStore
  makeDateTime = () => moment().format('YYYY-MM-DD');

  changeToDateTime = timeInfo => {
    if (timeInfo === 'today') {
      console.log('today');
      timeInfo = new Date();
      console.log('time = ', JSON.stringify(new Date()).slice(1, 11));
      return JSON.stringify(new Date()).slice(1, 11);
    }
    return timeInfo.slice(0, 10);
  };

  // 'YYYY/MM/DD HH:MM a/pm
  convertDateTime = str => moment(str).format('YY/MM/DD h:mm a');

  // * Helper Store from CatStore
}

decorate(HelperStore, {
  updateInput: action,
  clearInput: action,
  clearAddCatBio: action,
  validateAddInput: action,
  unFollowCat: action,
  pickImage: action,
  removePhoto: action,
  makeDateTime: action,
  changeToDateTime: action,
  convertDateTime: action,
});
export default HelperStore;
