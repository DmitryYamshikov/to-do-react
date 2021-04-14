import React from 'react';
import './app-header.css';


const AppHeader = ({liked, counter})=> {
    return (
        <div className='app-header d-flex'>
            <h1>Дмитрий Ямщиков</h1>
            <h2>{counter} записей, из них понравилось {liked}</h2>
        </div>
    )
}

export default AppHeader;