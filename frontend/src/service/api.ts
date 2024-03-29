import { defer, Observable, EMPTY } from 'rxjs';
import initializeAxios from '../config/axiosSetup';
import { axiosRequestConfiguration } from '../config/axios';
import { catchError, map } from 'rxjs/operators';

const axiosInstance = initializeAxios(axiosRequestConfiguration);

const get = <T>(url: string, queryParams?: object): Observable<T> => {
  return defer(() => axiosInstance.get<T>(url, { params: queryParams }))
    .pipe(
      map(result => result.data),
      catchError(err => {
        console.log(err);
        return EMPTY
      })
    );
};

const post = <T, K = void>(url: string, body: T, queryParams?: object): Observable<K | void> => {
  return defer(() => axiosInstance.post<K>(url, body, { params: queryParams }))
    .pipe(
      map(result => result.data),
      catchError(err => {
        console.log(err);
        return EMPTY
      })
    );
};

const put = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
  return defer(() => axiosInstance.put<T>(url, body, { params: queryParams }))
    .pipe(map(result => result.data));
};

const patch = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
  return defer(() => axiosInstance.patch<T>(url, body, { params: queryParams }))
    .pipe(map(result => result.data));
};

const deleteR = <T>(url: string, id: number): Observable<T | void> => {
  return defer(() => (axiosInstance.delete(`${url}/${id}`)))
    .pipe(map(result => result.data)
    );
};

export default { get, post, put, patch, delete: deleteR };