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
});

const SignIn_Info = ({
  email,
  PW,
  updateInput,
  validateSignIn,
  updateState,
  navigation,
}) => (
  <Container>
    <Header />
    <View style={styles.logo}>
      <Text style={styles.logoTxt}>Dedicat</Text>
    </View>
    <Content style={{ paddingLeft: 10, paddingRight: 10 }}>
      <Form>
        <Item floatingLabel>
          <Label>
            <MaterialCommunityIcons name="email-check-outline" size="16" />{' '}
            hello@cat.com
          </Label>
          <Input
            onChangeText={text => {
              updateInput('email', text);
            }}
            value={email}
          />
        </Item>
        <Item floatingLabel>
          <Label>
            <MaterialCommunityIcons name="lock-outline" size="16" /> Password
          </Label>
          <Input onChangeText={text => updateInput('PW', text)} value={PW} />
        </Item>
      </Form>
      <TouchableOpacity
        style={styles.btn}
        onPress={async () => {
          const validation = await validateSignIn();
          if (validation) {
            await updateState('SignIn');
            navigation.navigate('AuthLoading');
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

export default inject(({ user }) => ({
  email: user.userInfo.email,
  PW: user.userInfo.PW,
  updateInput: user.updateInput,
  validateSignIn: user.validateSignIn,
  updateState: user.updateState,
}))(observer(withNavigation(SignIn_Info)));
