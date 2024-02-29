import {useWindowDimensions } from 'react-native';
import { Provider} from "react-redux";
import store from './reduxStore/store';
import ToastManager from 'toastify-react-native'
import { Index } from './index';


export default function App() {

  const {width} = useWindowDimensions();

  return (
    <>
     <Provider store={store}>
       <Index/>
      </Provider>
      <ToastManager width={width - 20} height={'5.8%'} positionValue={20} textStyle={{ fontSize: 15, fontWeight: 'bold' }} animationStyle={'rightInOut'} duration={2000}/>
    </>
  );
}



