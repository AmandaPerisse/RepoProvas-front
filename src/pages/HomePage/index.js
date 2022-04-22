import React from 'react';
import Header from '../../components/Header/Header.js';
import styled from 'styled-components';

export default function HomePage() {

    return (
        <Content>
            <Header />
        </Content>
    )
};
const Content = styled.div`
    padding: 20px 50px;
`;
