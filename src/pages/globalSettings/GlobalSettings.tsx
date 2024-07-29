import React, { useState, useCallback } from "react";
import MainLogo from "../../../public/assets/SmallLogo.jpg";
import "./GlobalSettings.css";
import NavigationPanel from "../../components/NavigationPanel.tsx";
import SettingsItem from "../../components/SettingItem.tsx";
import MyButton from "../../components/UI/MyButton.tsx";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GLOBAL_SETTINGS } from "../../graphql/queries/globalSettings";
import { SET_GLOBAL_SETTING } from "../../graphql/mutations/setGlobalSetting";
import BurgerIcon from "../../../public/assets/BurgerIcon.svg";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import Cookies from "ts-cookies";
import { GlobalSetting } from "../../types/settings.ts";

// Пример как можно декомпозировать на компоненты

const Header: React.FC<{ onToggleNav: () => void }> = ({ onToggleNav }) => (
    <div className="header">
        <div className="container">
            <div className="header-line">
                <div className="header-logo">
                    <img src={MainLogo} alt="Logo" />
                    <img
                        src={BurgerIcon}
                        className="burger-menu-icon"
                        onClick={onToggleNav}
                    />
                </div>
                <h1 className="title">Глобальные настройки</h1>
            </div>
        </div>
    </div>
);

const BurgerMenu: React.FC<{ isVisible: boolean; onLogout: () => void }> = ({
    isVisible,
    onLogout,
}) =>
    isVisible ? (
        <div className="burger-menu">
            <div className="burger-menu-item">ГЛОБАЛЬНЫЕ НАСТРОЙКИ</div>
            <div className="burger-menu-item" onClick={onLogout}>
                ВЫХОД
            </div>
        </div>
    ) : null;

const GlobalSettings: React.FC = () => {
    const navigate = useNavigate();

    const { loading, data, error } = useQuery<{
        getGlobalSettings: GlobalSetting[];
    }>(GET_GLOBAL_SETTINGS);
    const [setGlobalSetting] = useMutation(SET_GLOBAL_SETTING);

    const [settings, setSettings] = useState<Record<string, string>>({});
    const [isNavVisible, setIsNavVisible] = useState<boolean>(false);

    const handleSettingChange = useCallback((id: string, value: string) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [id]: value,
        }));
    }, []);

    const handleApplySettings = useCallback(() => {
        if (data) {
            data.getGlobalSettings.forEach((setting) => {
                const newValue = settings[setting.id];
                if (newValue !== undefined && newValue !== setting.value) {
                    setGlobalSetting({
                        variables: {
                            input: {
                                name: setting.name,
                                value: newValue,
                                description: setting.description,
                                type: setting.type,
                            },
                        },
                    });
                }
            });
        }
    }, [data, settings, setGlobalSetting]);

    const handleLogout = useCallback(() => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        navigate("/auth");
    }, [navigate]);

    return (
        <div className="settings-wrapper">
            <Header onToggleNav={() => setIsNavVisible(!isNavVisible)} />
            <div className="main-container">
                <NavigationPanel />
                <BurgerMenu isVisible={isNavVisible} onLogout={handleLogout} />
                <div className="content-container">
                    <div className="button-block">
                        <MyButton text="Восстановить настройки по умолчанию" />
                        <MyButton
                            text="Применить настройки"
                            endIcon={<CheckIcon />}
                            onClick={handleApplySettings}
                        />
                    </div>
                    {loading && <p>Загрузка...</p>}
                    {error && <p>Ошибка: {error.message}</p>}
                    {data && (
                        <div className="list-container">
                            <ul>
                                {data.getGlobalSettings.map(
                                    (setting: GlobalSetting) => (
                                        <li key={setting.id}>
                                            <SettingsItem
                                                id={setting.id}
                                                title={setting.name}
                                                description={
                                                    setting.description
                                                }
                                                defaultValue={setting.value}
                                                type={setting.type}
                                                onChange={handleSettingChange}
                                            />
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlobalSettings;
