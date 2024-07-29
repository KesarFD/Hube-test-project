import React from "react";
import Button from "@mui/material/Button";

interface MyButtonProps extends React.ComponentProps<typeof Button> {
    text: string;
}

const MyButton: React.FC<MyButtonProps> = ({ text, ...props }) => {
    return (
        <Button
            sx={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: "bold",
                fontSize: "12px",
                color: "#2C77DB",
                border: "2px #2C77DB solid",
                background: "#F1F4F8",
                padding: window.innerWidth > 375 ? "5px 15px" : "5px 12px",
                "&:hover": {
                    border: "2px #2C77DB solid",
                },
            }}
            variant="outlined"
            {...props}
        >
            {text}
        </Button>
    );
};

export default MyButton;
