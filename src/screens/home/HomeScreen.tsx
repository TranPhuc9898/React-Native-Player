import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {FlatList, View} from 'react-native';
import {IListFeatureItem} from 'src/utils/types';
import MyCard from '../../components/Card/MyCard';
import {LIST_FEATURE} from '../../utils/mockupData';

const HomeScreen: React.FC<any> = ({navigation}) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: IListFeatureItem;
    index: number;
  }) => {
    const handleOnPress = () => {
      switch (index) {
        case 0:
          navigation.navigate('FavoritePlayScreen');
          break;
        case 1:
          break;
      }
    };

    return (
      <MyCard
        key={`${item.title}${index}`}
        header={(props) => (
          <View>
            <Text {...props} category="h5">
              {`${index + 1}. ${item.title}`}
            </Text>
          </View>
        )}
        onPress={handleOnPress}>
        <Text>{item.description}</Text>
      </MyCard>
    );
  };

  return (
    <Layout>
      <FlatList
        data={LIST_FEATURE}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.toString()}-${index}`}
      />
    </Layout>
  );
};

export default HomeScreen;
