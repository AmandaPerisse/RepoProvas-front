import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import UserContext from '../../providers/UserContext';
import Header from '../../components/Header/Header.js';

export default function HomePage({ pageNumber }) {

    const navigate = useNavigate();

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

        searchFor = "disciplina";
    }
    else if(pageNumber === 1){
        button1Background = "#1976D2";
        button1H2Color = "white";
        button0Background = "white";
        button0H2Color = "#1976D2";
        button2Background = "white";
        button2H2Color = "#1976D2";

        searchFor = "professor";
    }
    else if(pageNumber === 2){
        button2Background = "#1976D2";
        button2H2Color = "white";
        button1Background = "white";
        button1H2Color = "#1976D2";
        button0Background = "white";
        button0H2Color = "#1976D2";

        searchFor = "algo";
    }

    const [search, setSearch] = React.useState('');

    const [type, setType] = React.useState(0);

    const [testsList, setTestsList] = React.useState([]);
    const [testsName, setTestsNames] = React.useState([]);
    const [testsTeachers, setTestsTeachers] = React.useState([]);
    let arrayTestsNames = [];
    let arrayTestsTeachers = [];

    const {token, setToken} = useContext(UserContext);

    useEffect(() => {
        try{
            const fetchData = async () => {
                const promise = await axios.get('http://localhost:5000/tests-disciplines', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const { data } = promise;
                if(data){
                    setTestsList(data);
                }
                for(let i =0; i<data.length;i++){
                    if(!arrayTestsNames.includes(data[i].disciplineName[0].name)){
                        arrayTestsNames.push(data[i].disciplineName[0].name);
                    }
                    if(!arrayTestsTeachers.includes(data[i].complement[0].teacher)){
                        arrayTestsTeachers.push(data[i].complement[0].teacher);
                    }
                }
                setTestsNames(arrayTestsNames);
                setTestsTeachers(arrayTestsTeachers);
            };
            fetchData();
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

    async function handleClick(name){
        const tab = document.querySelectorAll(".tabs");
        for(let i = 0; i< tab[0].children.length;i++){
            if (tab[0].children[i].children[0].children[0].innerText === name){
                tab[0].children[i].children[1].classList.toggle("hidden");
            }
        }
    }

    function DisciplineTabs(){
        if (testsName.length > 0 && type === 0){
            return (
                testsName.map(name => {
                    return(
                        <Tab1>
                            <button onClick={() => {handleClick(name)}}>
                                <h1>{name}</h1>
                            </button>
                            <TabContent className='hidden'>
                                <TermsTabs name = {name}/>
                            </TabContent>
                        </Tab1>
                    )
                })
            )
        }
        else if (testsName.length > 0 && type === 1){
            <h2>oi</h2>
        }
    }
    
    function TermsTabs({ name }){
        if (testsList.length > 0 && type === 0){
            let termsArray = [];
            for(let i =0; i<testsList.length;i++){
                if(testsList[i].disciplineName[0].name === name){
                    if(!termsArray.includes(testsList[i].complement[0].semester)){
                        termsArray.push(testsList[i].complement[0].semester);
                    }
                }
            }
            return (
                termsArray.map(test => {
                    return(
                        <>
                            <h2>{test}</h2>
                            <TabContent>
                                <CategoriesTabs name = {name} semester = {test}/>
                            </TabContent>
                        </>
                    )                   
                })
            )
        }
    }

    function CategoriesTabs({ name, semester }){
        if (testsList.length > 0 && type === 0){
            let categoriesArray = [];
            for(let i =0; i<testsList.length;i++){
                if(testsList[i].disciplineName[0].name === name){
                    if(!categoriesArray.includes(testsList[i].complement[0].category)){
                        categoriesArray.push(testsList[i].complement[0].category);
                    }
                }
            }
            return (
                categoriesArray.map(test => {
                    return(
                        <>
                            <h2>{test}</h2>
                            <TabContent>
                                <TestsTabs name = {name} semester = {semester} category ={test} />
                            </TabContent>
                        </>
                    )                   
                })
            )
        }
    }

    function TestsTabs({ name, semester, category }){
        if (testsList.length > 0 && type === 0){
            let testsNameArray = [];
            for(let i =0; i<testsList.length;i++){
                if(testsList[i].disciplineName[0].name === name){
                    if(testsList[i].complement[0].semester === semester){
                        if(testsList[i].complement[0].category === category){
                            testsNameArray.push({name: testsList[i].complement[0].name, url: testsList[i].complement[0].url, teacher: testsList[i].complement[0].teacher})
                        }
                    }
                }
            }
            return (
                testsNameArray.map(test => {
                    return(
                        <>
                            <a href = {`${test.url}`}><h3>{test.teacher} - {test.name}</h3></a>
                        </>
                    )                   
                })
            )
        }
    }

    return (
        <Content>
            <Header />
            <Form onSubmit = {handleSearch}>
                <input type="text" onChange = {(e) => setSearch(e.target.value)} value = {search} placeholder={`Pesquisar por ${searchFor}`}/>
            </Form>
            <Separator />
            <Buttons>
                <Button0 onClick={() => {navigate("/home")}} button0Background ={button0Background} button0H2Color = {button0H2Color}>
                    <h2>
                        DISCIPLINAS
                    </h2>
                </Button0>
                <Button1 onClick={() => {navigate("/home-teachers")}} button1Background ={button1Background} button1H2Color = {button1H2Color}>
                    <h2>
                        PESSOA INSTRUTORA
                    </h2>
                </Button1>
                <Button2 onClick={() => {navigate("/adicionar")}}button2Background ={button2Background} button2H2Color = {button2H2Color}>
                    <h2>
                        ADICIONAR
                    </h2>
                </Button2>
            </Buttons>
            <div className = "tabs">
                <DisciplineTabs/>
            </div>
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
const Tab1 = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    width: 100%;
    padding: 20px 10px;
    margin-bottom: 10px;
    text-align: left;
    h3{
        color: #cacaca;
    }
    button{
        width: 100%;
        text-align: left;
    }
`;
const TabContent = styled.div`
    padding: 0px 10px;
`;