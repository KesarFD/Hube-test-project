import { gql } from '@apollo/client';

export const SEND_CODE = gql`
    query SendCode($phone: String!) {
        sendCode(phone: $phone) {
            expiresAt
        }
    }
`;