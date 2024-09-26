import {Dimensions} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const scale = viewportWidth / 375;

export function getHeight(value) {
  return (value / 926) * viewportHeight;
}

export function moderateScale(size) {
  const newSize = size * scale;
  return Math.round(newSize);
}
