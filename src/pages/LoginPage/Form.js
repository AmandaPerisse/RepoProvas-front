import axios from 'axios';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import UserContext from '../../providers/UserContext';

export default function Form(){

    const {token, setToken} = useContext(UserContext);
    const {userInfos, setUserInfos} = useContext(UserContext);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigate = useNavigate();
    function resetFields(){
        setEmail('');
        setPassword('');
    }
    async function login(e){
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            const data = response.data;
            if(data){
                setToken(data.token);
                setUserInfos(data.user);
                localStorage.setItem("token", data.token)
                localStorage.setItem("userInfos", JSON.stringify(data.user))
                navigate('/home');
            }
            else{
                alert('E-mail ou senha inválidos!');
                resetFields();
            }
        }
        catch(e){
            alert('Usuário ou senha incorreto!');
            resetFields();
        }
    }

    return (
        
        <LoginForm onSubmit = {login}>
            <input type="email" onChange = {(e) => setEmail(e.target.value)} value = {email} placeholder='E-mail'/>
            <input type="password" onChange = {(e) => setPassword(e.target.value)} value = {password} placeholder='Senha'/>
            <Buttons>
                <Link to="/sign-up">
                    <LinkToSingUp>
                        Não possuo cadastro
                    </LinkToSingUp>
                </Link>
                <Button type="submit">
                    <h3>ENTRAR</h3>
                </Button>
            </Buttons>
        </LoginForm>
    );
}

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    input{
        width: 100%;
    }
    gap: 10px;
`;
const Buttons = styled.div`
	display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Button = styled.button`
    background: #1976D2;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    width: 100px;
    padding: 8px;
    h3{
        color: white;
    }
`;
const LinkToSingUp = styled.h4`
	text-decoration: underline;
    color: rgba(70, 115, 202, 0.8);
    letter-spacing: 0.15px;
`;