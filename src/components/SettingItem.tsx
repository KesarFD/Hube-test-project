import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import "../App.css";

interface SettingItemProps {
    title: string;
    description: string;
    defaultValue: string;
    type: string;
    id: string;
    onChange: (id: string, value: string) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
    title,
    description,
    defaultValue,
    type,
    id,
    onChange,
}) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        onChange(id, value);
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <div className="comp">
            <div className="comp_content">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div className="comp_input">
                <TextField
                    id={`setting-${id}`}
                    defaultValue={defaultValue}
                    type={type === "INTEGER" ? "number" : "text"}
                    size="small"
                    placeholder={type === "INTEGER" ? "0" : "Текст..."}
                    onChange={handleChange}
                    sx={{
                        m: 1,
                        width: window.innerWidth > 375 ? "230px" : "100%",
                        backgroundColor: "#fff",
                        color: "#8B9DB6",
                    }}
                />
            </div>
        </div>
    );
};

export default SettingItem;
