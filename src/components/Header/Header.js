import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UserContext from '../../providers/UserContext.js';
import axios from 'axios';
import Logo from '../../Imgs/Logo.js';
import Logout from '../../Imgs/LogOut.js';

export default function Header({ pageNumber, search, setSearch, setType, type} ) {

    const { token, setUserInfos, setToken } = useContext(UserContext);
    const navigate = useNavigate();

    let showSearch;

    let button0Background = "";
    let button0H2Color = "";
    let button1Background = "";
    let button1H2Color = "";
    let button2Background = "";
    let button2H2Color = "";

    let searchFor;

    if(pageNumber === 0){
        button0Background = "#1976D2";
        button0H2Color = "white";
        button1Background = "white";
        button1H2Color = "#1976D2";
        button2Background = "white";
        button2H2Color = "#1976D2";

        searchFor = "pesquisar por disciplina";
        showSearch = 'visible';
    }
    else if(pageNumber === 1){
        button1Background = "#1976D2";
        button1H2Color = "white";
        button0Background = "white";
        button0H2Color = "#1976D2";
        button2Background = "white";
        button2H2Color = "#1976D2";

        searchFor = "pesquisar por professor";
        showSearch = 'visible';
    }
    else if(pageNumber === 2){
        button2Background = "#1976D2";
        button2H2Color = "white";
        button1Background = "white";
        button1H2Color = "#1976D2";
        button0Background = "white";
        button0H2Color = "#1976D2";

        searchFor = "";
        showSearch = 'hidden';

    }
    else if(pageNumber === 3){
        button2Background = "white";
        button2H2Color = "#1976D2";
        button1Background = "white";
        button1H2Color = "#1976D2";
        button0Background = "white";
        button0H2Color = "#1976D2";

        if (type === 0){
            searchFor = "disciplina";
        }
        else if (type === 1){
            searchFor = "professor";
        }

        showSearch = 'visible';
    }

    async function handleSearch(e){
        e.preventDefault();
        if(searchFor === "disciplina"){
            setType(0);
        }
        else if (searchFor === "professor"){
            setType(1);
        }
        navigate("/search");
    }

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
        <>
            <Content>
                <Logo />
                <button onClick={handleLogout}>
                    <Logout />
                </button>
            </Content>
            <Form showSearch = {showSearch} onSubmit = {handleSearch}>
                <input type="text" onChange = {(e) => setSearch(e.target.value)} value = {search} placeholder={`${searchFor}`}/>
            </Form>
            <Separator />
            <Buttons>
                <Button0 onClick={() => {navigate("/home"); setSearch("")}} button0Background ={button0Background} button0H2Color = {button0H2Color}>
                    <h2>
                        DISCIPLINAS
                    </h2>
                </Button0>
                <Button1 onClick={() => {navigate("/home-teachers"); setSearch("")}} button1Background ={button1Background} button1H2Color = {button1H2Color}>
                    <h2>
                        PESSOA INSTRUTORA
                    </h2>
                </Button1>
                <Button2 onClick={() => {navigate("/register"); setSearch("")}}button2Background ={button2Background} button2H2Color = {button2H2Color}>
                    <h2>
                        ADICIONAR
                    </h2>
                </Button2>
            </Buttons>
        </>
    )
}
const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Form = styled.form`
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    input{
        width: 70%;
        visibility: ${props => props.showSearch};
    }
`;
const Separator = styled.div`
    width: 100%;
    background-color: #c9c9c9;
    height: 1px;
    margin-top: 30px;
`;
const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 50px 0px;
`;
const Button0 = styled.button`
    text-align: center;
    width: 33%;
    padding: 15px;
    border: 1px solid #1976D2;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    background-color: ${props => props.button0Background};
    h2{
        color: ${props => props.button0H2Color};
    }
`;
const Button1 = styled.button`
    text-align: center;
    width: 33%;
    padding: 15px;
    border: 1px solid #1976D2;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    background-color: ${props => props.button1Background};
    h2{
        color: ${props => props.button1H2Color};
    }
`;
const Button2 = styled.button`
    text-align: center;
    width: 33%;
    padding: 15px;
    border: 1px solid #1976D2;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    background-color: ${props => props.button2Background};
    h2{
        color: ${props => props.button2H2Color};
    }
`;