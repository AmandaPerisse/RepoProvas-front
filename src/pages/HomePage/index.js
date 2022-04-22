import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import UserContext from '../../providers/UserContext';
import Header from '../../components/Header/Header.js';

export default function HomePage({ pageNumber }) {

    let button0Background = "";
    let button0H2Color = "";
    let button1Background = "";
    let button1H2Color = "";
    let button2Background = "";
    let button2H2Color = "";

    if(pageNumber === 0){
        button0Background = "#1976D2";
        button0H2Color = "white";
        button1Background = "white";
        button1H2Color = "#1976D2";
        button2Background = "white";
        button2H2Color = "#1976D2";
    }
    else if(pageNumber === 1){
        button1Background = "#1976D2";
        button1H2Color = "white";
        button0Background = "white";
        button0H2Color = "#1976D2";
        button2Background = "white";
        button2H2Color = "#1976D2";
    }
    else if(pageNumber === 2){
        button2Background = "#1976D2";
        button2H2Color = "white";
        button0Background = "white";
        button0H2Color = "#1976D2";
        button0Background = "white";
        button0H2Color = "#1976D2";
    }

    const [search, setSearch] = React.useState('');
    const [type, setType] = React.useState(pageNumber);
    const [testsList, setTestsList] = React.useState([]);
    const {token, setToken} = useContext(UserContext);

    useEffect(() => {
        try{
            const promise = axios.get('http://localhost:5000/tests-disciplines', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            promise.then(response => {
                const { data } = response.data;
                if(data){
                    setTestsList(data);
                }
            });
        }
        catch(e){
            alert('Falha.');
        }
    }, []);

    async function handleSearch(e){
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/search', {
                type: type,
                search: search
                }, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            const data = response.data;
            if(data){
            }
        }
        catch(e){
            alert('Erro!');
        }
    }

    function Tests(){
        if (testsList.length > 0){
            return (
                testsList.map(test => {
                    return(
                        <></>
                    )
                    
                })
            )
        }
    }

    return (
        <Content>
            <Header />
            <Form onSubmit = {handleSearch}>
                <input type="text" onChange = {(e) => setSearch(e.target.value)} value = {search} placeholder='Pesquisar por disciplina'/>
            </Form>
            <Separator />
            <Buttons>
                <Button0 button0Background ={button0Background} button0H2Color = {button0H2Color}>
                    <h2>
                        DISCIPLINAS
                    </h2>
                </Button0>
                <Button1 button1Background ={button1Background} button1H2Color = {button1H2Color}>
                    <h2>
                        PESSOA INSTRUTORA
                    </h2>
                </Button1>
                <Button2 button2Background ={button2Background} button2H2Color = {button2H2Color}>
                    <h2>
                        ADICIONAR
                    </h2>
                </Button2>
            </Buttons>
            <Tests />
        </Content>
    )
};
const Content = styled.div`
    padding: 20px 50px;
`;
const Form = styled.form`
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    input{
        width: 70%;
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