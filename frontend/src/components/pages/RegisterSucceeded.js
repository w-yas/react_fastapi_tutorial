import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

const RegisterSucceeded = () => {
    const { state } = useLocation()
    return <div>
     <Container maxWidth="xs">
        <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
            <Typography variant="h5">登録完了しました。</Typography>
            <Typography variant="h5">名前：{state.username}</Typography>
            <Typography variant="h5">パスワード：{state.password}</Typography>
            <Link to="/login">ログイン画面へ</Link>
        </Box>
    </Container>
        
    </div>;
};
export default RegisterSucceeded;
