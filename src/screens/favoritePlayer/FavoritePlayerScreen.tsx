import {Layout} from '@ui-kitten/components';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Alert} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {ContactCard} from '../../components/Card';

interface IPlayer {
  name: string;
  age: number;
  number: number;
  avatar: string;
  description: string;
}

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

const FavoritePlayScreen = () => {
  const [listPlayer, setListPlayer] = useState(MOCKUP_DATA);

  const renderFootballPlayerItem = ({item}: {item: IPlayer}) => {
    const handleOnPress = () =>
      Alert.alert('Detele', 'Do you want to remove this player in your team', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setListPlayer((currentListPlayer) =>
              currentListPlayer.filter((player) => player.name !== item.name),
            );
          },
        },
        {
          text: 'Yes',
          onPress: () => {},
          style: 'Cancel',
        },
        {
          text: 'Yes1',
          onPress: () => {},
          style: 'Cancel',
        },
      ]);

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
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FavoritePlayScreen;
