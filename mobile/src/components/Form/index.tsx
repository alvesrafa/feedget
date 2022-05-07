import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';
import { captureScreen } from 'react-native-view-shot';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { api } from '../../libs/api';
import FileSystem from 'expo-file-system';

export type FeedbackType = keyof typeof feedbackTypes;

interface Props {
  feedback: FeedbackType;
  onResetFeedback: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedback, onResetFeedback, onFeedbackSent }: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const feedbackInfo = feedbackTypes[feedback];
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const [feedbackText, setFeedbackText] = useState('');

  async function handleScreenshotCapture() {
    try {
      const screenshotCaptured = await captureScreen({
        format: 'jpg',
        quality: 0.8,
      });
      setScreenshot(screenshotCaptured);
    } catch (error) {
      console.log(error);
    }
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if (!feedbackText) return;
    setIsSendingFeedback(true);

    try {
      const screenshotBase64 =
        screenshot &&
        (await FileSystem.readAsStringAsync(screenshot, {
          encoding: 'base64',
        }));

      await api.post('/feedbacks', {
        type: feedback,
        comment: feedbackText,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
      });
      onFeedbackSent();
    } catch (error: any) {
      onResetFeedback();
      console.log('send feedback failed', error?.response?.data);
    } finally {
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onResetFeedback}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackInfo.title}</Text>
        </View>
      </View>
      <TextInput
        multiline
        onChangeText={(value) => setFeedbackText(value)}
        value={feedbackText}
        style={styles.input}
        placeholder="Algo não ta legal? Conta pra gente."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onRemoveShot={handleScreenshotRemove}
          onTakeShot={handleScreenshotCapture}
          screenshot={screenshot}
        />
        <Button
          isLoading={isSendingFeedback}
          text="Enviar feedback"
          onPress={handleSendFeedback}
        />
      </View>
    </View>
  );
}
