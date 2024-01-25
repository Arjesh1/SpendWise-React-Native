import  { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  const navigation = useNavigation();

  useEffect(() => {
    if (!token) {
      navigation.navigate('Login');
    }
  }, [token, navigation]);

  return <>{children}</>;
};