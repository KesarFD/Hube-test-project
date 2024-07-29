import { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Cookies from "ts-cookies";

import {
    Home,
    Person,
    Chat,
    TrendingUp,
    Star,
    Settings,
    ExitToApp,
} from "@mui/icons-material";
import PaymentsIcon from "@mui/icons-material/Payments";
import WalletIcon from "@mui/icons-material/Wallet";
import TuneIcon from "@mui/icons-material/Tune";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

const StyledButton = styled("button")`
    background: transparent;
    border: none;
    padding: 11px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 12px;
    background-color: #d8e0ea;
    box-shadow: 0px 3.42px 3.42px 0px rgba(255, 255, 255, 0.25) inset;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    svg {
        width: 30px;
        height: 30px;
        color: #8293aa;
    }

    &.selected {
        background-color: #2c77db;
        svg {
            color: #fff;
        }
    }
`;

const NavigationPanel = () => {
    const [selectedIcon, setSelectedIcon] = useState<any>(Settings);
    const navigate = useNavigate();

    const handleIconClick = (icon: any) => {
        setSelectedIcon(icon === selectedIcon ? null : icon);
        if (icon !== ExitToApp) {
            navigate("/test");
        }
    };

    const handleLogout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        navigate("/auth");
    };

    return (
        <nav>
            <StyledButton
                onClick={() => handleIconClick(Home)}
                className={selectedIcon === Home ? "selected" : ""}
            >
                <Home />
            </StyledButton>
            <StyledButton
                onClick={() => handleIconClick(PaymentsIcon)}
                className={selectedIcon === PaymentsIcon ? "selected" : ""}
            >
                <PaymentsIcon />
            </StyledButton>
            <StyledButton
                onClick={() => handleIconClick(Person)}
                className={selectedIcon === Person ? "selected" : ""}
            >
                <Person />
            </StyledButton>
            <StyledButton
                onClick={() => handleIconClick(InsertDriveFileOutlinedIcon)}
                className={
                    selectedIcon === InsertDriveFileOutlinedIcon
                        ? "selected"
                        : ""
                }
            >
                <InsertDriveFileOutlinedIcon />
            </StyledButton>
            <StyledButton
                onClick={() => handleIconClick(Chat)}
                className={selectedIcon === Chat ? "selected" : ""}
            >
                <Chat />
            </StyledButton>
            <StyledButton
                onClick={() => handleIconClick(TrendingUp)}
                className={selectedIcon === TrendingUp ? "selected" : ""}
            >
                <TrendingUp />
            </StyledButton>
            <StyledButton
                onClick={() => handleIconClick(WalletIcon)}
                className={selectedIcon === WalletIcon ? "selected" : ""}
            >
                <WalletIcon />
            </StyledButton>
            <StyledButton
                onClick={() => handleIconClick(Star)}
                className={selectedIcon === Star ? "selected" : ""}
            >
                <Star />
            </StyledButton>
            <StyledButton
                onClick={() => handleIconClick(TuneIcon)}
                className={selectedIcon === TuneIcon ? "selected" : ""}
            >
                <TuneIcon />
            </StyledButton>
            <StyledButton
                onClick={() => handleIconClick(Settings)}
                className={selectedIcon === Settings ? "selected" : ""}
            >
                <Settings />
            </StyledButton>
            <StyledButton
                onClick={() => {
                    handleIconClick(ExitToApp);
                    handleLogout();
                }}
                className={selectedIcon === ExitToApp ? "selected" : ""}
            >
                <ExitToApp />
            </StyledButton>
        </nav>
    );
};

export default NavigationPanel;
