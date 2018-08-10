import axios from "axios"
import { PromiseAction } from "../lib/redux"
import { ConfigurationConstants } from "../constants/configurationConstants"
import { Configuration } from "../model/Configuration"

export const fetchConfiguration: () => PromiseAction<Promise<Configuration>> = () => ({
    type: ConfigurationConstants.FETCH_CONFIG,
    async payload() {
        const response = await axios.get(require(`../../resources/application.json`))
        return response.data
    },
})
