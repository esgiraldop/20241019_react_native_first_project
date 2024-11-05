import {jest} from '@jest/globals';

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);
