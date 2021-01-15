import { createAction, Action } from '@reduxjs/toolkit'
import { Observable } from 'rxjs'
import { map, filter } from 'rxjs/operators'
import { setUser } from '../slices/user'

// const increment = createAction<number>('INCREMENT')

export const userEpic = (actions$: Observable<Action>) =>
  actions$.pipe(
    filter(setUser.match),
    map((action) => action.payload)
  )