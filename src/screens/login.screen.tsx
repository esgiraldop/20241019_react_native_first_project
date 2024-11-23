import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {theme} from '../theme/main.theme';
import {AuthService} from '../services/auth.service';
import {IUser} from '../interfaces/user.interface';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces';
import {formStyles} from '../styles/form.styles';
import {textStyles} from '../styles/text.styles';
import {buttonStyle} from '../styles/buttons.style';
import {registrationSchema} from '../schemas/auth.schema';
import {containerStyles} from '../styles/container.styles';
// import {useAuth} from '../contexts/auth.context';
import {setValueAsyncStorage} from '../utilities/set-variable-async-storage.utility';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation<LoginScreenProp>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorSubmitting, setErrorSubmitting] = useState<boolean | null>(null);
  // const {login} = useAuth(); // this didn´t work

  const onSubmit = async (values: IUser) => {
    setIsSubmitting(true);
    const response = await AuthService.login(values);
    if (response) {
      // await login(token); // This didn't work
      await setValueAsyncStorage('token', response.data.accessToken);
      setIsSubmitting(false);
      setErrorSubmitting(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Contacts'}],
        }),
      );
    } else {
      setIsSubmitting(false);
      setErrorSubmitting(true);
    }
  };

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <View
      style={[
        containerStyles.container,
        formStyles.VerticallyCenteredcontainer,
      ]}>
      {isSubmitting ? (
        <ActivityIndicator size="large" color={theme.colors.accent} />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={registrationSchema}
          onSubmit={onSubmit}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            isValid,
          }) => (
            <View style={formStyles.formContainer}>
              <Text style={textStyles.titleText}>Sign in</Text>
              <Text style={textStyles.label}>Email</Text>
              <TextInput
                style={textStyles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Enter email"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={formStyles.error}>{errors.email}</Text>
              )}

              <Text style={textStyles.label}>Password</Text>
              <TextInput
                style={textStyles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Enter password"
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry={true}
              />
              {errors.password && (
                <Text style={formStyles.error}>{errors.password}</Text>
              )}

              <View style={formStyles.buttonContainer}>
                <TouchableOpacity
                  style={buttonStyle.button5}
                  onPress={() => handleSubmit()}
                  disabled={!isValid || isSubmitting}>
                  <Text style={textStyles.buttonText}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      )}
      {errorSubmitting !== null &&
        (errorSubmitting ? (
          <Text style={textStyles.errorText}>
            There was an error logging in. Please try again later
          </Text>
        ) : (
          <Text style={textStyles.sucessText}>Log in sucessful</Text>
        ))}
    </View>
  );
}
