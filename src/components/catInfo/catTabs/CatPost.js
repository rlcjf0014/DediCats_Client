import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';


const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    borderRadius: 20,
  },
});

class CatPost extends React.Component {
  setCatPostHere = (item) => {
    this.props.setCatPost(item);
    this.props.navigation.navigate('SelectedPost');
  };

  render() {
    if (this.props.item) {
      console.log('createAt:::', this.props.item);
    }
    const { content, createAt, user, photos } = this.props.item;
    const usrImgUri = user.photoPath !== null ? user.photoPath : '';
    const postImgUri = photos[0].path !== null ? photos[0].path : '';
  
    return (
      <TouchableWithoutFeedback onPress={() => this.setCatPostHere(this.props.item)}>
        <Card style={{ width: 400, borderRadius: 20, overflow: 'hidden' }}>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: usrImgUri}} />
              <Body>
                <Text>{user.nickname}</Text>
              </Body>
            </Left>
            <Right>
              <Text style={{ color: 'grey' }}>{this.props.convertDateTime(createAt)}</Text>
            </Right>
          </CardItem>
          <CardItem cardBody>
            <Image source={{uri: postImgUri}} style={{height: 200, width: null, flex: 1}}/>
          </CardItem>
          <CardItem>
            <Text note>{content}</Text>
          </CardItem>
          <CardItem style={{ marginLeft: 260 }}>
            <Right>
              <Button
                transparent
              >
                <Icon active name="chatbubbles" style={{ marginRight: 10 }} />
                <Text>4 Comments</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(CatPost);
