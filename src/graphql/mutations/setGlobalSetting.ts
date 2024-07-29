import { gql } from "@apollo/client";

export const SET_GLOBAL_SETTING = gql`
    mutation SetGlobalSetting($input: GlobalSettingInput!) {
        setGlobalSetting(input: $input) {
            id
            name
            value
            description
            type
        }
    }
`;