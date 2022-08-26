import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

export function CheckOrientation(): 'PORTRAIT' | 'LANDSCAPE' {
  // State to hold the connection status
  const [orientation, setOrientation] = useState(
    isPortrait() ? 'PORTRAIT' : 'LANDSCAPE',
  );

  useEffect(() => {
    const callback = () =>
      setOrientation(isPortrait() ? 'PORTRAIT' : 'LANDSCAPE');
    const subscription = Dimensions.addEventListener('change', callback);
    //Dimensions.addEventListener('change', callback);

    return () => {
      //Dimensions.removeEventListener('change', callback);
      subscription.remove();
    };
  }, []);

  return orientation;
}
