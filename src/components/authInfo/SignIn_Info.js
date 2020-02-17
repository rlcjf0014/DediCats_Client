import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react';

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    padding: 50,
  },
  logoTxt: {
    fontSize: 50,
    fontWeight: '600',
  },
  scrollView: { paddingLeft: 10, paddingRight: 10 },
  btn: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#677ef1',
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  signUpBtn: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#EDF1F5',
    borderRadius: 5,
    marginHorizontal: 120,
  },
  white: {
    color: 'white',
  },
  light: {
    color: '#868e96',
  },
  font16: {
    fontSize: 16,
  },
});

const SignIn_Info = ({
  email,
  PW,
  updateInput,
  validateSignIn,
  updateState,
  clearInput,
  navigation,
}) => (
  <Container>
    <Header />
    <View style={styles.logo}>
      <Text style={styles.logoTxt}>Dedicats</Text>
    </View>
    <Content style={styles.scrollView}>
      <Form>
        <Item floatingLabel>
          <Label>
            <MaterialCommunityIcons
              style={styles.font16}
              name="email-check-outline"
            />{' '}
            hello@cat.com
          </Label>
          <Input
            onChangeText={text => {
              updateInput('auth', 'email', text);
            }}
            value={email}
          />
        </Item>
        <Item floatingLabel>
          <Label>
            <MaterialCommunityIcons style={styles.font16} name="lock-outline" />{' '}
            Password
          </Label>
          <Input
            onChangeText={text => updateInput('auth', 'PW', text)}
            value={PW}
          />
        </Item>
      </Form>
      <TouchableOpacity
        style={styles.btn}
        onPress={async () => {
          const validation = await validateSignIn();
          if (validation) {
            const signInResult = await updateState('SignIn');
            console.log('signInResult :', signInResult);
            if (signInResult) {
              clearInput('auth', 'email', 'PW');
              navigation.navigate('AuthLoading');
            }
          }
        }}
      >
        <Text style={styles.white}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpBtn}
        onPress={() => navigation.navigate('Sign Up')}
      >
        <Text style={styles.light}>Sign Up</Text>
      </TouchableOpacity>
    </Content>
  </Container>
);

export default inject(({ auth, helper }) => ({
  email: auth.email,
  PW: auth.PW,
  validateSignIn: auth.validateSignIn,
  updateState: auth.updateState,
  updateInput: helper.updateInput,
  clearInput: helper.clearInput,
}))(observer(withNavigation(SignIn_Info)));
