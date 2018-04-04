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
import { ReduxAction } from "../lib/redux"
import { FoldableCardConstants } from "../constants/foldableCardConstants"

export const registerCard: (id: string, open: boolean) => ReduxAction<{ id: string, open: boolean }> = (id, open) => ({
    type: FoldableCardConstants.REGISTER_CARD,
    payload: { id, open },
})

export const unregisterCard: (id: string) => ReduxAction<string> = id => ({
    type: FoldableCardConstants.UNREGISTER_CARD,
    payload: id,
})

export const toggleCard: (id: string) => ReduxAction<string> = id => ({
    type: FoldableCardConstants.TOGGLE_CARD,
    payload: id,
})
