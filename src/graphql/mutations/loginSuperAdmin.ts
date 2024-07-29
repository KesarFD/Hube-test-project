import { gql } from "@apollo/client";

export const LOGIN_SUPER_ADMIN = gql`
    mutation LoginSuperAdmin($input: LoginByPhoneInput!) {
        loginSuperAdmin(input: $input) {
            accessToken
            refreshToken
        }
    }
`;