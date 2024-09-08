import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginUserContext } from "../providers/LoginUserProvider";

export const useRegister = () => {
  const navigate = useNavigate();
  const register = (user) => {
    console.log("登録処理開始");
    const endpoint = "http://localhost:8000/users";
    const queries = { name:user.username, password:user.password };
    axios.post(endpoint, queries).then((res) => {
      console.log(res.data);
      if (Object.keys(res.data).length > 0) {
        console.log("登録成功");
        navigate("/registersucceeded", { state: user});
      } else {
        console.log("登録失敗");
        navigate("/registerfailed", { state: user});
      }
    })
    .catch((e) =>{
        console.log(e)
        navigate("/registerfailed", { state: user})
    })
  };
  return { register };
};
