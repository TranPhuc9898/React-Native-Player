import {Avatar, Button, Card, Input, Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ImageURISource,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import {Icon} from 'react-native-eva-icons';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {ContactCard} from '../../components/Card';
import {getArrayData, saveArray} from '../../utils/LocalStorage/LocalStorage';

interface IPlayer {
  name: string;
  age: number;
  number: number;
  avatar: string;
  description: string;
}

const LIST_PLAYER_KEY = '@listplayer';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Header = (props: any) => (
  <View {...props}>
    <Text category="h6">Add Player</Text>
    {/* <Text category="s1">By Wikipedia</Text> */}
  </View>
);

const Footer = (props: any) => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Button
      style={styles.footerControl}
      size="small"
      status="basic"
      onPress={props.onCancelBtnPress}>
      CANCEL
    </Button>
    <Button
      style={styles.footerControl}
      size="small"
      onPress={props.onAcceptBtnPress}>
      ACCEPT
    </Button>
  </View>
);

const FavoritePlayScreen = () => {
  const MOCKUP_DATA = [
    {
      name: 'Ronaldo',
      age: 35,
      number: 7,
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      name: 'Messi',
      age: 35,
      number: 10,
      avatar:
        'https://specials-images.forbesimg.com/imageserve/1211127975/960x0.jpg?fit=scale',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      name: 'Paul Pogba',
      age: 25,
      number: 6,
      avatar: 'https://s.hs-data.com/bilder/spieler/gross/180976.jpg',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      name: 'Neymar',
      age: 27,
      number: 7,
      avatar:
        'https://vtv1.mediacdn.vn/thumb_w/650/2020/6/20/neymar-15926144559062101689769.jpg',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
  ];
  const [listPlayer, setListPlayer] = useState([] as Array<IPlayer>);

  const [refreshing, setRefreshing] = useState(false);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [playerNameValue, setPlayerNameValue] = useState('');
  const [playerAgeValue, setPlayerAgeValue] = useState('');
  const [playerNumberValue, setPlayerNumberValue] = useState('');
  const [playerDescriptionValue, setPlayerDescriptionValue] = useState('');
  const [playerAvatarValue, setPlayerAvatarValue] = useState('');
  const [avatarSource, setAvatarSource] = useState<
    number | ImageURISource | ImageURISource[]
  >();

  const getListPlayerFromLocalStorage = async () => {
    const retrievedListPlayer = await getArrayData(LIST_PLAYER_KEY);
    if (retrievedListPlayer) {
      setListPlayer(retrievedListPlayer);
    } else {
      await saveArray(LIST_PLAYER_KEY, MOCKUP_DATA);
      setListPlayer(MOCKUP_DATA);
    }
  };

  useEffect(() => {
    getListPlayerFromLocalStorage();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(async () => {
      try {
        await saveArray(LIST_PLAYER_KEY, MOCKUP_DATA);
        setListPlayer(MOCKUP_DATA);
      } catch (error) {
        Alert.alert(error.message);
      } finally {
        setRefreshing(false);
      }
    }, 1500);
  };

  const handleActionBtnPress = () => {
    setVisibleModal(true);
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
    setPlayerAvatarValue('');
    setAvatarSource(undefined);
    setPlayerDescriptionValue('');
    setPlayerNumberValue('');
    setPlayerAgeValue('');
    setPlayerNameValue('');
  };
  const handleAddModal = () => {
    setVisibleModal(true);
    setPlayerDescriptionValue(playerDescriptionValue);
  };

  const renderFootballPlayerItem = ({item}: {item: IPlayer}) => {
    const handleOnPress = () => {
      Alert.alert(
        'Remove your favorite player',
        'Do you want to remove ?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              const filteredListPlayer = listPlayer.filter(
                (player) => player.name !== item.name,
              );

              await saveArray(LIST_PLAYER_KEY, filteredListPlayer);
              setListPlayer(filteredListPlayer);
            },
          },
        ],
        {cancelable: false},
      );
    };

    return (
      <ContactCard
        containerStyle={{margin: 10}}
        title={item.name}
        subTitle={`Number: ${item.number.toString()}`}
        description={item.description}
        image={item.avatar}
        topRightIcon={
          <Icon
            onPress={handleOnPress}
            name="archive-outline"
            fill="#000"
            width={24}
            height={24}
          />
        }
      />
    );
  };

  return (
    <Layout style={styles.container}>
      <FlatList
        data={listPlayer}
        renderItem={renderFootballPlayerItem}
        keyExtractor={(index, item) => `${index}-${item}`}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={handleActionBtnPress}
      />
      <Modal
        isVisible={visibleModal}
        onBackdropPress={() => setVisibleModal(false)}>
        <KeyboardAvoidingView behavior="position" enabled>
          <Card
            disabled={true}
            header={Header}
            footer={(props) => {
              return (
                <Footer
                  {...props}
                  onCancelBtnPress={handleCloseModal}
                  onAcceptBtnPress={async () => {
                    // Step 1: Create a object temp player
                    const temp = {
                      name: playerNameValue,
                      age: Number(playerAgeValue) || 0, // nếu như ko phải number mà trong number có 1 chữ sẽ trả về số 0
                      description: playerDescriptionValue,
                      number: Number(playerNumberValue) || 0,
                      avatar: playerAvatarValue,
                    };
                    // Step 2: Push and set new player state
                    const tempList = [...listPlayer];
                    tempList.push(temp); // push js
                    setListPlayer(tempList);

                    // listPlayer = tempList

                    // Step 3:
                    handleCloseModal();

                    //step 4:
                    await saveArray(LIST_PLAYER_KEY, tempList);
                    //
                  }}
                />
              );
            }}>
            {avatarSource ? (
              <Avatar
                style={styles.pickedAvatar}
                size="large"
                source={avatarSource}
              />
            ) : null}
            <Input
              style={styles.rowModal}
              label="Player Name"
              placeholder="Player Name"
              value={playerNameValue}
              onChangeText={(value) => setPlayerNameValue(value)}
            />
            <Input
              style={styles.rowModal}
              label="Player Age"
              placeholder="Player Age"
              value={playerAgeValue}
              onChangeText={(value) => setPlayerAgeValue(value)}
            />
            <Input
              style={styles.rowModal}
              label="Player Number"
              placeholder="Player Number"
              value={playerNumberValue}
              onChangeText={(value) => setPlayerNumberValue(value)}
            />
            <Input
              style={styles.rowModal}
              label="Description"
              placeholder="Description"
              value={playerDescriptionValue}
              onChangeText={(value) => setPlayerDescriptionValue(value)}
            />
            <Input
              style={styles.rowModal}
              label="Player Avatar"
              placeholder="Player Avatar"
              value={playerAvatarValue}
              onChangeText={(value) => setPlayerAvatarValue(value)}
            />
            <Button
              style={styles.rowModal}
              size="small"
              onPress={() => {
                ImagePicker.showImagePicker(options, (response) => {
                  console.log('Response = ', response);

                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  } else if (response.customButton) {
                    console.log(
                      'User tapped custom button: ',
                      response.customButton,
                    );
                  } else {
                    const source = {uri: response.uri};

                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                    setAvatarSource(source);
                    setPlayerAvatarValue(source.uri);
                  }
                });
              }}>
              Upload Image
            </Button>
          </Card>
        </KeyboardAvoidingView>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  pickedAvatar: {
    alignSelf: 'center',
  },
  rowModal: {
    marginTop: 8,
  },
});

export default FavoritePlayScreen;
