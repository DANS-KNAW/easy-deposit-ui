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
import { AppState } from "../model/AppState"
import { Action, AnyAction, Dispatch as ReduxDispatch, Middleware, MiddlewareAPI } from "redux"

export type Dispatch = ReduxDispatch<AppState>

export interface ReduxAction<T> extends Action {
    payload: T | (() => T)
}

interface ExtendedMiddleware<StateType> extends Middleware {
    <S extends StateType>(api: MiddlewareAPI<S>): (next: ReduxDispatch<S>) => ReduxDispatch<S>;
}

export function createMiddleware<T>(f: (api: MiddlewareAPI<T>, next: ReduxDispatch<T>, action: AnyAction) => any): ExtendedMiddleware<T> {
    return <S extends T>(api: MiddlewareAPI<S>) => (next: ReduxDispatch<S>) => <A extends AnyAction>(action: A) => f(api, next, action)
}
