import 'react-native';
import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import {createMockClient} from 'mock-apollo-client';
import renderer from 'react-test-renderer';

import Home from '../src/Home';
import {GET_PROCESS, SAVE_USER} from '../src/gql';

const wait = async (time) => {
  await new Promise((resolve) => setTimeout(resolve, time));
};

const mockSaveUser = jest.fn().mockResolvedValue({
  data: {saveUser: {}},
});

describe('Home', () => {
  let wrapper;

  const mockClient = createMockClient();
  mockClient.setRequestHandler(GET_PROCESS, () =>
    Promise.resolve({data: {process: {flow: 'new'}}}),
  );
  mockClient.setRequestHandler(SAVE_USER, mockSaveUser);

  beforeEach(async () => {
    await renderer.act(() => {
      wrapper = renderer.create(
        <ApolloProvider client={mockClient}>
          <Home />
        </ApolloProvider>,
      );
      return wait(0);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should save user and navigate to first screen on form submit', async () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());

    await renderer.act(async () => {
      wrapper.root.findAllByType('TextInput')[0].props.onChangeText('John Doe');
      await wait(0);

      wrapper.root
        .findAllByType('TextInput')[1]
        .props.onChangeText('john_doe@email.com');
      await wait(0);

      wrapper.root.findAllByType('View')[1].props.onClick();
      return wait(0);
    });

    expect(mockSaveUser).toHaveBeenCalledWith({
      fullName: 'John Doe',
      email: 'john_doe@email.com',
    });
    expect(console.log).toHaveBeenCalledWith('navigate to first screen');
  });
});
