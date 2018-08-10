import axios from "axios"
import { FetchAction } from "../lib/redux"
import { ConfigurationConstants } from "../constants/configurationConstants"
import { Configuration } from "../model/Configuration"
import { configurationConverter } from "../lib/configuration/configuration"

export const fetchConfiguration: () => FetchAction<Configuration> = () => ({
    type: ConfigurationConstants.CONFIGURATION_LOADING,
    async payload() {
        const response = await axios.get(require(`../../resources/application.json`))
        return response.data
    },
    meta: {
        transform: configurationConverter,
    },
})
