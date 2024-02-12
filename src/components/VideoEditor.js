import React, { useState } from 'react';
import { View, Text, Button } from 'native-base';
import { Video } from 'expo';
import { VideoEditor } from 'react-native-video-editor';
import { Alert } from 'react-native';

const VideoEditor = ({ videoUri }) => {
  const [editedUri, setEditedUri] = useState(null);

  const trimVideo = async () => {
    try {
      const trimmedUri = await VideoEditor.trim({
        source: videoUri,
        startTime: 0, 
        endTime: 10, 
      });
      setEditedUri(trimmedUri);
    } catch (error) {
      Alert.alert('Error', 'Failed to trim video');
    }
  };

  const applyFilter = async () => {
    try {
      const filteredUri = await VideoEditor.filter({
        source: videoUri,
        filterType: 'blackAndWhite', 
      });
      setEditedUri(filteredUri);
    } catch (error) {
      Alert.alert('Error', 'Failed to apply filter to video');
    }
  };
  const adjustVolume = async () => {
    try {
      const adjustedUri = await VideoEditor.volume({
        source: videoUri,
        volume: 0.5,
      });
      setEditedUri(adjustedUri);
    } catch (error) {
      Alert.alert('Error', 'Failed to adjust volume');
    }
  };

  const saveVideo = async () => {
    try {
      const savedUri = await VideoEditor.save({
        source: editedUri || videoUri,
        quality: 'high',
      });
      Alert.alert('Success', 'Video saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save video');
    }
  };

  return (
    <View>
      <Video
        source={{ uri: editedUri ? editedUri : videoUri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        style={{ width: 300, height: 300 }}
      />
      <Button onPress={trimVideo}><Text>Trim</Text></Button>
      <Button onPress={applyFilter}><Text>Apply Filter</Text></Button>
      <Button onPress={adjustVolume}><Text>Adjust Volume</Text></Button>
      <Button onPress={saveVideo}><Text>Save Video</Text></Button>
    </View>
  );
};

export default VideoEditor;
