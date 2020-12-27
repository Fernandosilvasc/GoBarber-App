import React, { useRef, useCallback } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  BackToLoginInButton,
  BackToLoginText,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required.'),
          email: Yup.string()
            .required('Email is required.')
            .email('Type a valid email.'),
          password: Yup.string().min(6, 'At least 6 characters is required.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'User has been created with success!',
          'Now you already allow to sign in GoBarber!',
        );

        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Register Error',
          'Error has occurred during register, please check your credentials',
        );
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Register</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
                autoCapitalize="words"
                returnKeyType="next"
                name="name"
                icon="user"
                placeholder="Nome"
              />
              <Input
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                name="email"
                icon="mail"
                placeholder="E-mail"
              />
              <Input
                ref={passwordInputRef}
                onSubmitEditing={() => formRef.current?.submitForm()}
                textContentType="newPassword"
                returnKeyType="send"
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Password"
              />
              <View>
                <Button onPress={() => formRef.current?.submitForm()}>
                  Sign Up
                </Button>
              </View>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToLoginInButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToLoginText>Back to Login</BackToLoginText>
      </BackToLoginInButton>
    </>
  );
};

export default SignUp;
