import React from 'react';
import { Text, View } from 'react-native';
import { Copyright } from '../Copyright';
import { Option } from '../Option';
import { styles } from './styles';

import { feedbackTypes } from '../../utils/feedbackTypes';
import { FeedbackType } from '../Form';

interface Props {
  handleSelectOption: (option: FeedbackType) => void;
}

export function Options({ handleSelectOption }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback!</Text>
      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            title={value.title}
            image={value.image}
            onPress={() => handleSelectOption(key as FeedbackType)}
          />
        ))}
      </View>
      <Copyright />
    </View>
  );
}
