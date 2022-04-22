import React from 'react';
import Logo from '../../Imgs/Logo.js';
import Form from './Form';
import styled from 'styled-components';

export default function LoginPage() {

    return (
        <Content>
            <Logo />
            <Login>
                <h1><strong>
                    Login
                </strong></h1>
                <Options>
                    <GithubButton>
                        <h3>
                            ENTRAR COM O GITHUB
                        </h3>
                    </GithubButton>
                    <DivOu>
                        <Separator></Separator>
                        <h4>ou</h4>
                        <Separator></Separator>
                    </DivOu>
                    <Form />
                </Options>
            </Login>
        </Content>
    )
}

const Content = styled.body`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 45%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    gap: 100px;
    width: 500px;
`;
const Login = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
`;
const Options = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
`;
const GithubButton = styled.button`
    padding: 0px;
    background-color: #424445;
    border-radius: 4px;
    width: 100%;
    padding: 5px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
    h3{
        color: white;
    }
`;
const DivOu = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;
const Separator = styled.div`
    width: 100%;
    background-color: #C4C4C4;
    height: 1px;
`;