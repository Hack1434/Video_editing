import React, { useState } from 'react';
import { View } from 'native-base';
import VideoSelector from '../components/VideoSelector';

const HomeScreen = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSelectVideo = (videoUri) => {
    setSelectedVideo(videoUri);
  };

  return (
    <View>
      {!selectedVideo ? (
        <VideoSelector onSelectVideo={handleSelectVideo} />
      ) : (
        <VideoEditor videoUri={selectedVideo} />
      )}
    </View>
  );
};

export default HomeScreen;
