/*
 * Copyright (C) 2018 DANS - Data Archiving and Networked Services (info@dans.knaw.nl)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Action, AnyAction } from "redux"
import { ThunkAction as LibThunkAction } from "redux-thunk"
import { AppState } from "../model/AppState"

export interface ReduxAction<T> extends Action {
    payload: T
}

export interface PromiseAction<T> extends Action {
    payload: () => Promise<T>
}

export interface FetchAction<S, State = any, T = any> extends PromiseAction<T> {
    meta: {
        transform: (t: T, state: () => State) => S
    }
}

export type ThunkAction<A extends Action, S = AppState> = LibThunkAction<A, S, {}, AnyAction>

export type PromiseThunkAction<ExtraArgs = any> = LibThunkAction<Promise<void>, AppState, ExtraArgs, AnyAction>

export type ComplexThunkAction<ExtraArgs = any> = LibThunkAction<void, AppState, ExtraArgs, AnyAction>
