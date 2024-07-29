import React, { useReducer } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import Cookies from "ts-cookies";
import {
    TextField,
    Button,
    FormControl,
    Typography,
    CircularProgress,
} from "@mui/material";
import InputMask from "react-input-mask";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LOGIN_SUPER_ADMIN } from "../../graphql/mutations/loginSuperAdmin";
import { SEND_CODE } from "../../graphql/queries/sendCode";
import { AuthResponse, SendCodeResponse } from "../../types";
import "./Auth.css";
import Woman from "../../../public/assets/woman.png";
import SmallWoman from "../../../public/assets/smallWoman.png";

// Пример организации логики со стейт менеджером

const initialState = {
    phone: "",
    code: "",
    isLoginLoading: false,
    isPhoneError: false,
    isCodeError: false,
    isCodeSended: false,
};

type State = typeof initialState;

type Action =
    | { type: "SET_PHONE"; payload: string }
    | { type: "SET_CODE"; payload: string }
    | { type: "SET_IS_LOGIN_LOADING"; payload: boolean }
    | { type: "SET_IS_PHONE_ERROR"; payload: boolean }
    | { type: "SET_IS_CODE_ERROR"; payload: boolean }
    | { type: "SET_IS_CODE_SENDED"; payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PHONE":
            return { ...state, phone: action.payload };
        case "SET_CODE":
            return { ...state, code: action.payload };
        case "SET_IS_LOGIN_LOADING":
            return { ...state, isLoginLoading: action.payload };
        case "SET_IS_PHONE_ERROR":
            return { ...state, isPhoneError: action.payload };
        case "SET_IS_CODE_ERROR":
            return { ...state, isCodeError: action.payload };
        case "SET_IS_CODE_SENDED":
            return { ...state, isCodeSended: action.payload };
        default:
            return state;
    }
};

const Auth: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const [loginSuperAdmin] = useMutation<{ loginSuperAdmin: AuthResponse }>(
        LOGIN_SUPER_ADMIN
    );
    const [sendCode, { loading: sendCodeLoading }] = useLazyQuery<{
        sendCode: SendCodeResponse;
    }>(SEND_CODE);

    const handleLogin = async () => {
        dispatch({ type: "SET_IS_PHONE_ERROR", payload: false });
        dispatch({ type: "SET_IS_CODE_ERROR", payload: false });
        dispatch({ type: "SET_IS_LOGIN_LOADING", payload: true });

        try {
            if (state.phone.length === 0) {
                dispatch({ type: "SET_IS_PHONE_ERROR", payload: true });
                return;
            }
            if (state.code.length === 0) {
                dispatch({ type: "SET_IS_CODE_ERROR", payload: true });
                return;
            }
            const { data } = await loginSuperAdmin({
                variables: {
                    input: {
                        phone: state.phone.replace(/[- )(]/g, ""),
                        code: Number(state.code),
                    },
                },
            });

            if (data?.loginSuperAdmin) {
                Cookies.set("accessToken", data.loginSuperAdmin.accessToken);
                Cookies.set("refreshToken", data.loginSuperAdmin.refreshToken);

                setAuth(true);
                navigate("/settings");
            }
        } catch (error) {
            dispatch({ type: "SET_IS_CODE_ERROR", payload: true });
            dispatch({ type: "SET_IS_PHONE_ERROR", payload: true });
        } finally {
            dispatch({ type: "SET_IS_LOGIN_LOADING", payload: false });
        }
    };

    const handleSendCode = async () => {
        dispatch({ type: "SET_IS_PHONE_ERROR", payload: false });

        try {
            const { data } = await sendCode({
                variables: { phone: state.phone.replace(/[- )(]/g, "") },
            });
            if (data?.sendCode) {
                dispatch({ type: "SET_IS_CODE_SENDED", payload: true });
            } else {
                dispatch({ type: "SET_IS_PHONE_ERROR", payload: true });
            }
        } catch (error) {
            dispatch({ type: "SET_IS_PHONE_ERROR", payload: true });
            console.log("Неуспешно");
        }
    };

    return (
        <div className="authContainer">
            <Header />
            <div className="input-container">
                <PhoneInput
                    phone={state.phone}
                    isPhoneError={state.isPhoneError}
                    onPhoneChange={(value) =>
                        dispatch({ type: "SET_PHONE", payload: value })
                    }
                    onSendCode={handleSendCode}
                    sendCodeLoading={sendCodeLoading}
                    isCodeSended={state.isCodeSended}
                />
                <CodeInput
                    code={state.code}
                    isCodeError={state.isCodeError}
                    onCodeChange={(value) =>
                        dispatch({ type: "SET_CODE", payload: value })
                    }
                    onLogin={handleLogin}
                    isLoginLoading={state.isLoginLoading}
                />
            </div>
            <WomanImage />
        </div>
    );
};

const Header: React.FC = () => (
    <div className="header-auth">
        <div className="header-line-auth">
            <div className="MainLogo" />
            <Typography
                sx={{
                    paddingTop: window.innerWidth > 744 ? "26px" : "90px",
                    fontFamily: '"Nunito", sans-serif',
                    fontSize: window.innerWidth > 744 ? "24px" : "18px",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    color: "#102542",
                }}
                fontFamily="inherit"
                variant="h4"
                gutterBottom
            >
                Авторизация
            </Typography>
        </div>
    </div>
);

const PhoneInput: React.FC<{
    phone: string;
    isPhoneError: boolean;
    onPhoneChange: (value: string) => void;
    onSendCode: () => void;
    sendCodeLoading: boolean;
    isCodeSended: boolean;
}> = ({
    phone,
    isPhoneError,
    onPhoneChange,
    onSendCode,
    sendCodeLoading,
    isCodeSended,
}) => (
    <div className="phone-input-container">
        <FormControl margin="normal">
            <InputMask
                mask="+7 (999) 999-99-99"
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
            >
                {/* InputMask плохо типизирован по этому пришлось доставать старого друга */}
                {/* @ts-ignore */}
                {() => (
                    <TextField
                        sx={{
                            fontFamily: '"Nunito" sans-serif',
                            width:
                                window.innerWidth > 375
                                    ? window.innerWidth > 744
                                        ? "230px"
                                        : "300px"
                                    : "327px",
                        }}
                        size="small"
                        placeholder="Мобильный телефон"
                        error={isPhoneError}
                        variant="outlined"
                        inputProps={{ inputMode: "numeric" }}
                        helperText={isPhoneError ? "Некорректный номер" : ""}
                    />
                )}
            </InputMask>
        </FormControl>
        <Button
            sx={{
                marginTop: window.innerWidth > 744 ? "16px" : "0",
                marginBottom: window.innerWidth > 744 ? "6px" : "0",
                width:
                    window.innerWidth > 375
                        ? window.innerWidth > 744
                            ? isCodeSended
                                ? "300px"
                                : "230px"
                            : "300px"
                        : "327px",
                maxHeight: "32px",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: "bold",
                fontSize: "12px",
            }}
            variant="contained"
            onClick={onSendCode}
            disabled={sendCodeLoading}
        >
            {isCodeSended ? "Отправить код повторно" : "Отправить код"}
        </Button>
    </div>
);

const CodeInput: React.FC<{
    code: string;
    isCodeError: boolean;
    onCodeChange: (value: string) => void;
    onLogin: () => void;
    isLoginLoading: boolean;
}> = ({ code, isCodeError, onCodeChange, onLogin, isLoginLoading }) => (
    <div className="code-input-container">
        <FormControl>
            <TextField
                sx={{
                    fontFamily: '"Nunito" sans-serif',
                    width:
                        window.innerWidth > 375
                            ? window.innerWidth > 744
                                ? "230px"
                                : "300px"
                            : "327px",
                }}
                size="small"
                placeholder="Код из СМС"
                error={isCodeError}
                variant="outlined"
                type="number"
                value={code}
                inputProps={{ inputMode: "numeric" }}
                onChange={(e) => onCodeChange(e.target.value)}
                helperText={isCodeError ? "Неверный код" : ""}
            />
        </FormControl>
        <Button
            sx={{
                marginBottom: "24px",
                maxHeight: "32px",
                width:
                    window.innerWidth > 375
                        ? window.innerWidth > 744
                            ? "230px"
                            : "300px"
                        : "327px",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: "bold",
                fontSize: "12px",
            }}
            variant="contained"
            onClick={onLogin}
            disabled={isLoginLoading}
        >
            {isLoginLoading ? <CircularProgress size={24} /> : "Войти"}
        </Button>
    </div>
);

const WomanImage: React.FC = () => (
    <div className="woman-wrapper">
        <img
            className="woman"
            src={window.innerWidth > 744 ? Woman : SmallWoman}
        />
    </div>
);

export default Auth;
