import React, {useCallback, useState, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useQuery, useMutation} from '@apollo/react-hooks';

import {GET_PROCESS, SAVE_USER} from './gql';

const Home = () => {
  const {data} = useQuery(GET_PROCESS);
  const [saveUser] = useMutation(SAVE_USER);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const disabled = useMemo(() => {
    if (!fullName || !email) {
      return true;
    } else {
      return false;
    }
  }, [fullName, email]);

  const handleChangeFullName = useCallback((text) => {
    setFullName(text);
  }, []);

  const handleChangeEmail = useCallback((text) => {
    setEmail(text);
  }, []);

  const submit = useCallback(async () => {
    await saveUser({
      variables: {
        fullName,
        email,
      },
    });
    if (data.process.flow === 'new') {
      console.log('navigate to first screen');
    } else {
      console.log('navigate to second screen');
    }
  }, [data, saveUser, fullName, email]);

  return (
    <SafeAreaView style={styles.base}>
      <ScrollView
        style={styles.base}
        contentContainerStyle={styles.content}
        alwaysBounceVertical={false}>
        <Text>FullName</Text>
        <TextInput onChangeText={handleChangeFullName} style={styles.input} />
        <Text>Email</Text>
        <TextInput onChangeText={handleChangeEmail} style={styles.input} />
        <TouchableOpacity
          onPress={submit}
          style={[styles.submit, disabled && styles.disabled]}
          disabled={disabled}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 48,
  },
  input: {
    padding: 8,
    marginTop: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#666666',
  },
  submit: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  submitText: {
    fontSize: 16,
    lineHeight: 19,
    color: 'white',
  },
  disabled: {
    opacity: 0.2,
  },
});

export default Home;
