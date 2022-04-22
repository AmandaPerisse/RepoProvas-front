import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UserContext from '../../providers/UserContext.js';
import axios from 'axios';
import Logo from '../../Imgs/Logo.js';
import Logout from '../../Imgs/LogOut.js';

export default function Header() {

    const { token, setUserInfos, setToken } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleLogout() {
        try{
            const response = await axios.post('http://localhost:5000/logout', {
                token: token,
            });
        }
        catch(e){
            alert('Erro ao delogar.');
        }
        setUserInfos(null)
        setToken(null)
        localStorage.removeItem('token');
        localStorage.removeItem('userInfos');
        navigate("/");
    }

    return (
        <Content>
            <Logo />
            <button onClick={handleLogout}>
                <Logout />
            </button>
        </Content>
    )
}
const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
