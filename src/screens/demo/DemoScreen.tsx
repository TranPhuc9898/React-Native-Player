import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

const DemoScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal isVisible={isModalVisible}>
        {/* Content */}
        <View style={{backgroundColor: 'white'}}>
          <Text>Add Player</Text>
          <TextInput />
          <TextInput />
          <TextInput />

          <Button title="Add" onPress={() => {}} />
        </View>
      </Modal>
    </View>
  );
};

export default DemoScreen;
