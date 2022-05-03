import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import UserContext from '../../providers/UserContext';
import Header from '../../components/Header/Header.js';
import RegisterForm from './RegisterForm.js';

export default function HomePage({ pageNumber }) {

    const navigate = useNavigate();

    const [type, setType] = React.useState(0);

    const [search, setSearch] = React.useState('');

    const [dataList, setDataList] = React.useState([]);

    const [testsList, setTestsList] = React.useState([]);
    const [testsName, setTestsNames] = React.useState([]);
    const [testsTeachers, setTestsTeachers] = React.useState([]);
    let arrayTestsTeachers = [];
    let arrayTestsNames = [];

    const {token, setToken} = useContext(UserContext);

    const fetchTests = async () => {
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

    const fetchData = async () => {
        const promise = await axios.get('http://localhost:5000/register', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const { data } = promise;
        setDataList(data);
    };

    useEffect(() => {
        try{
            fetchTests();
            fetchData();
        }
        catch(e){
            alert('Falha.');
        }
    }, []);

    async function handleClickTab(name){
        const tab = document.querySelectorAll(".tabs");
        for(let i = 0; i< tab[0].children.length;i++){
            if (tab[0].children[i].children[0].children[0].innerText === name){
                tab[0].children[i].children[1].classList.toggle("hidden");
            }
        }
    }

    async function handleClickTest(url, setSearch){
        try{
            const updateViews = async () => {
                const promise = await axios.put('http://localhost:5000/setViews', {
                    url: url,
                    }, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                });
            };
            updateViews();
            fetchTests();
        }
        catch(e){
            alert('Falha.');
        }
    }

    function DisciplineTabs(){
        if (testsList.length > 0 && pageNumber === 0){
            return (
                testsName.map(name => {
                    return(
                        <Tab1>
                            <button onClick={() => {handleClickTab(name)}}>
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
        else if (testsList.length > 0 && pageNumber === 1){
            return (
                testsTeachers.map(name => {
                    return(
                        <Tab1>
                            <button onClick={() => {handleClickTab(name)}}>
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
        else if(pageNumber === 2){
            return(
                <RegisterForm fetchTests ={fetchTests} dataList = {dataList} testsList = {testsList} />
            );
        }
        else if (testsList.length > 0 && pageNumber === 3){
            if(type === 0){
                return (
                    testsName.map(name => {
                        if(name === search){
                            return(
                                <Tab1>
                                    <button onClick={() => {handleClickTab(name)}}>
                                        <h1>{name}</h1>
                                    </button>
                                    <TabContent className='hidden'>
                                        <TermsTabs name = {name}/>
                                    </TabContent>
                                </Tab1>
                            )
                        }
                    })
                )
            }
            else if (type === 1){
                return (
                    testsTeachers.map(name => {
                        if(name === search){
                            return(
                                <Tab1>
                                    <button onClick={() => {handleClickTab(name)}}>
                                        <h1>{name}</h1>
                                    </button>
                                    <TabContent className='hidden'>
                                        <TermsTabs name = {name}/>
                                    </TabContent>
                                </Tab1>
                            )
                        }
                    })
                )
            }
        }
    }
    
    function TermsTabs({ name }){
        if (testsList.length > 0 && pageNumber === 0){
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
        else if (testsList.length > 0 && pageNumber === 1){
            let termsArray = [];
            for(let i =0; i<testsList.length;i++){
                if(testsList[i].complement[0].teacher === name){
                    if(!termsArray.includes(testsList[i].disciplineName[0].name)){
                        termsArray.push(testsList[i].disciplineName[0].name);
                    }
                }
            }
            return (
                termsArray.map(test => {
                    return(
                        <>
                            <br />
                            <h2>{test}</h2>
                            <br />
                            <TabContent>
                                <CategoriesTabs name = {name} semester = {test}/>
                            </TabContent>
                        </>
                    )                   
                })
            )
        }
        else if (testsList.length > 0 && pageNumber === 3){
            if(type === 0){
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
            else if (type === 1){
                let termsArray = [];
                for(let i =0; i<testsList.length;i++){
                    if(testsList[i].complement[0].teacher === name){
                        if(!termsArray.includes(testsList[i].disciplineName[0].name)){
                            termsArray.push(testsList[i].disciplineName[0].name);
                        }
                    }
                }
                return (
                    termsArray.map(test => {
                        return(
                            <>
                                <br />
                                <h2>{test}</h2>
                                <br />
                                <TabContent>
                                    <CategoriesTabs name = {name} semester = {test}/>
                                </TabContent>
                            </>
                        )                   
                    })
                )
            }    
        }
    }

    function CategoriesTabs({ name, semester }){
        if (testsList.length > 0 && pageNumber === 0){
            let categoriesArray = [];
            for(let i =0; i<testsList.length;i++){
                if(testsList[i].disciplineName[0].name === name){
                    if(testsList[i].complement[0].semester === semester){
                        if(!categoriesArray.includes(testsList[i].complement[0].category)){
                            categoriesArray.push(testsList[i].complement[0].category);
                        }
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
        else if (testsList.length > 0 && pageNumber === 1){
            let categoriesArray = [];
            for(let i =0; i<testsList.length;i++){
                if(testsList[i].complement[0].teacher === name){
                    if(testsList[i].disciplineName[0].name === semester){
                        if(!categoriesArray.includes(testsList[i].complement[0].category)){
                            categoriesArray.push(testsList[i].complement[0].category);
                        }
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
        else if (testsList.length > 0 && pageNumber === 3){
            if(type === 0){
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
            else if (type === 1){
                let categoriesArray = [];
                for(let i =0; i<testsList.length;i++){
                    if(testsList[i].complement[0].teacher === name){
                        if(testsList[i].disciplineName[0].name === semester){
                            if(!categoriesArray.includes(testsList[i].complement[0].category)){
                                categoriesArray.push(testsList[i].complement[0].category);
                            }
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
    }

    function TestsTabs({ name, semester, category }){
        if (testsList.length > 0 && pageNumber === 0){
            let testsNameArray = [];
            for(let i =0; i<testsList.length;i++){
                if(testsList[i].disciplineName[0].name === name){
                    if(testsList[i].complement[0].semester === semester){
                        if(testsList[i].complement[0].category === category){
                            testsNameArray.push({name: testsList[i].complement[0].name, url: testsList[i].complement[0].url, views: testsList[i].complement[0].views, teacher: testsList[i].complement[0].teacher})
                        }
                    }
                }
            }
            return (
                testsNameArray.map(test => {
                    return(
                        <Flex>
                            <Link to = {`${test.url}`} onClick={() => {handleClickTest(test.url)}}><h3>{test.teacher} - {test.name}</h3></Link>
                            <h3>views: {test.views}</h3>
                        </Flex>
                    )                   
                })
            )
        }
        else if (testsList.length > 0 && pageNumber === 1){
            let testsNameArray = [];
            for(let i =0; i<testsList.length;i++){
                if(testsList[i].complement[0].teacher === name){
                    if(testsList[i].disciplineName[0].name === semester){
                        if(testsList[i].complement[0].category === category){
                            testsNameArray.push({views: testsList[i].complement[0].views, name: testsList[i].complement[0].name, url: testsList[i].complement[0].url, semester: testsList[i].complement[0].semester})
                        }
                    }
                }
            }
            return (
                testsNameArray.map(test => {
                    return(
                        <Flex>
                            <a href = {`${test.url}`}><h3>{test.semester} - {test.name}</h3></a>
                            <h3>views: {test.views}</h3>
                        </Flex>
                    )                   
                })
            )
        }
        else if (testsList.length > 0 && pageNumber === 3){
            if(type === 0){
                let testsNameArray = [];
                for(let i =0; i<testsList.length;i++){
                    if(testsList[i].disciplineName[0].name === name){
                        if(testsList[i].complement[0].semester === semester){
                            if(testsList[i].complement[0].category === category){
                                testsNameArray.push({views: testsList[i].complement[0].views, name: testsList[i].complement[0].name, url: testsList[i].complement[0].url, teacher: testsList[i].complement[0].teacher})
                            }
                        }
                    }
                }
                return (
                    testsNameArray.map(test => {
                        return(
                            <Flex>
                                <a href = {`${test.url}`}><h3>{test.teacher} - {test.name}</h3></a>
                                <h3>views: {test.views}</h3>
                            </Flex>
                        )                   
                    })
                )
            }
            else if (type === 1){
                let testsNameArray = [];
                for(let i =0; i<testsList.length;i++){
                    if(testsList[i].complement[0].teacher === name){
                        if(testsList[i].disciplineName[0].name === semester){
                            if(testsList[i].complement[0].category === category){
                                testsNameArray.push({name: testsList[i].complement[0].name, url: testsList[i].complement[0].url, semester: testsList[i].complement[0].semester})
                            }
                        }
                    }
                }
                return (
                    testsNameArray.map(test => {
                        return(
                            <>
                                <a href = {`${test.url}`}><h3>{test.semester} - {test.name}</h3></a>
                            </>
                        )                   
                    })
                )
            }
        }
    }

    return (
        <Content>
            <Header pageNumber = {pageNumber} search = {search} setSearch ={setSearch} setType = {setType} type = {type}/>
            <div className = "tabs">
                <DisciplineTabs/>
            </div>
        </Content>
    )
};
const Content = styled.div`
    padding: 20px 50px;
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
const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;