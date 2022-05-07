import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { styles } from './styles';
import { theme } from '../../theme';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Options } from '../Options';
import { FeedbackType, Form } from '../Form';
import { Success } from '../Success';

function Widget() {
  const [optionSelected, setSelectedOption] = useState<FeedbackType | null>(
    null
  );
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleSelectOption(option: FeedbackType) {
    setSelectedOption(option);
  }
  function onResetFeedback() {
    setSelectedOption(null);
    setFeedbackSent(false);
  }
  function onFeedbackSent() {
    setFeedbackSent(true);
  }

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpenWidget() {
    bottomSheetRef.current?.expand();
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpenWidget}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {!optionSelected ? (
          <Options handleSelectOption={handleSelectOption} />
        ) : !feedbackSent ? (
          <Form
            feedback={optionSelected}
            onResetFeedback={onResetFeedback}
            onFeedbackSent={onFeedbackSent}
          />
        ) : (
          <Success onResetFeedback={onResetFeedback} />
        )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
