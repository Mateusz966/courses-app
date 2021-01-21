import { ApiErrorCode } from '../../../app-types/global';
//TODO error notification
// import { errorNotification } from '../actions/notifications';
// import { store } from '../config/store';


// export const handlingError = (response: any, setError: any) => {
//   if (!response) {
//     return store.dispatch(errorNotification(ApiErrorCode.OtherError));
//   };
//   const { status, data } = response;
//   const { message } = data;
//   switch (status) {
//     case 401: 
//     return null;
//     case 400:
//       typeof message === 'object' 
//       ? message.map(({ path, message }: any) => setError(path, { message, }))
//       : store.dispatch(errorNotification(data.error_code));
//       break;
//     default:
//       store.dispatch(errorNotification(data.error_code));
//   }
// };
