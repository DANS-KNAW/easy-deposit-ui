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
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

axios.defaults.headers = { "Pragma": "no-cache" }

function change503Response(e: any): void {
    if (e.response && e.response.status === 503)
        e.response.data = "The server is temporarily unavailable"
}

async function runAxiosCall<T = any>(axiosPromise: () => Promise<AxiosResponse<T>>): Promise<AxiosResponse<T>> {
    try {
        return await axiosPromise()
    }
    catch (e) {
        change503Response(e)
        throw e
    }
}

async function modifiedGet<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return runAxiosCall(() => axios.get(url, config))
}

async function modifiedDelete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return runAxiosCall(() => axios.delete(url, config))
}

async function modifiedHead(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return runAxiosCall(() => axios.head(url, config))
}

async function modifiedPost<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return runAxiosCall(() => axios.post(url, data, config))
}

async function modifiedPut<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return runAxiosCall(() => axios.put(url, data, config))
}

async function modifiedPatch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return runAxiosCall(() => axios.patch(url, data, config))
}

export default ({
    get: modifiedGet,
    delete: modifiedDelete,
    head: modifiedHead,
    post: modifiedPost,
    put: modifiedPut,
    patch: modifiedPatch,
})
