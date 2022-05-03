import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import UserContext from '../../providers/UserContext';

export default function RegisterForm({ fetchTests, dataList, testsList }){

    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const [pdf, setPdf] = React.useState('');

    const [term, setTerm] = React.useState('');
    const [discipline, setDiscipline] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [teacher, setTeacher] = React.useState('');
    let disabledTeacher = "disabled";
    let disabledDiscipline = "disabled";

    const {token, setToken} = useContext(UserContext);

    if(discipline === ""){
        disabledTeacher = 'disabled';
    }
    else{
        disabledTeacher = '';
    }

    if(term === ""){
        disabledDiscipline = 'disabled';
    }
    else{
        disabledDiscipline = '';
    }

    async function handleRegister(e){
        e.preventDefault();
        try{
            if(category && discipline && teacher && term){
                const response = await axios.post('http://localhost:5000/register', {
                name: name,
                pdf: pdf,
                category: category,
                discipline: discipline,
                teacher: teacher,
                term: term
                }, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            fetchTests();
            navigate("/home");
            }
            else{
                alert("Preencha todos os campos!");
            }
        }
        catch(error){
            alert("Erro no sistema! Tente novamente.");
        }
    }

    function CategoriesOptions(){
        if(dataList.categories.length > 0){
            return (
                (dataList.categories).map(categoryOptions => {
                    let selected;
                    if(categoryOptions.name === category){
                        selected = "selected";
                    }
                    else{
                        selected = "";
                    }
                    return(
                        <option selected = {selected} value = {categoryOptions.name}>{categoryOptions.name}</option>
                    )                   
                })
            )
        }
    }

    function TermsOptions(){
        if(dataList.terms.length > 0){
            return (
                (dataList.terms).map(termOptions => {
                    let selected;
                    if(termOptions.semester === term){
                        selected = "selected";
                    }
                    else{
                        selected = "";
                    }
                    return(
                        <option selected = {selected} value = {termOptions.semester}>{termOptions.semester}</option>
                    )                   
                })
            )
        }
    }

    function DisciplinesOptions({ term }){
        let disciplineArray = [];
        if(dataList.disciplines.length > 0){
            for(let i = 0; i< testsList.length; i++){
                if(testsList[i].complement[0].semester === term){
                    if(!disciplineArray.includes(testsList[i].disciplineName[0].name)){
                        disciplineArray.push(testsList[i].disciplineName[0].name);
                    }
                }
            }
            return (
                (disciplineArray).map(disciplineOptions => {
                    let selected;
                    if(disciplineOptions === discipline){
                        selected = "selected";
                    }
                    else{
                        selected = "";
                    }
                    return(
                        <option selected = {selected} value = {disciplineOptions}>{disciplineOptions}</option>
                    )                   
                })
            )
        }
    }

    function TeachersOptions({ discipline, term }){
        let teachersArray = [];
        for(let i = 0; i< testsList.length;i++){
            if(testsList[i].complement[0].semester === term){
                if(testsList[i].disciplineName[0].name === discipline){
                    if(!teachersArray.includes(testsList[i].complement[0].teacher)){
                        teachersArray.push(testsList[i].complement[0].teacher);
                    }
                }
            }
        }
        if(teachersArray.length > 0){
            return (
                (teachersArray).map(teacherOptions => {
                    let selected;
                    if(teacherOptions === teacher){
                        selected = "selected";
                    }
                    else{
                        selected = "";
                    }
                    return(
                        <option selected = {selected} value = {teacherOptions}>{teacherOptions}</option>
                    )                   
                })
            )
        }
    }

    return (
        <Form onSubmit = {handleRegister}>
            <input required type="text" onChange = {(e) => setName(e.target.value)} value = {name} placeholder='Nome da Prova'/>
            <input required type="url" onChange = {(e) => setPdf(e.target.value)} value = {pdf} placeholder='PDF da Prova'/>
            <select onChange = {(e) => setCategory(e.target.value)} name = "select">
                <option disabled hidden selected = "selected" value = "0">Escolha a Categoria</option>
                <CategoriesOptions />
            </select>
            <select onChange = {(e) => {setTerm(e.target.value); setDiscipline(""); setTeacher("")}} name = "select">
                <option selected = "selected" value = "0">Escolha o Período</option>
                <TermsOptions />
            </select>
            <select disabled = {disabledDiscipline} onChange = {(e) => {setDiscipline(e.target.value); setTeacher("")}} name = "select">
                <option selected = "selected" value = "0">Escolha a Disciplina</option>
                <DisciplinesOptions term = {term} />
            </select>
            <select disabled = {disabledTeacher} onChange = {(e) => setTeacher(e.target.value)} name = "select">
                <option selected = "selected" value = "0">Escolha o Professor</option>
                <TeachersOptions term = {term} discipline = {discipline}/>
            </select>
            <Button type="submit">
                <h3>Enviar</h3>
            </Button>
        </Form>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    input{
        width: 100%;
    }
    gap: 10px;
`;
const Button = styled.button`
    background: #1976D2;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    width: 100%;
    padding: 8px;
    h3{
        color: white;
    }
`;