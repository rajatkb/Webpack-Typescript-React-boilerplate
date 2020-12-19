import React from 'react';
import style from './style/index.scss';


export default function App(props:{message:string}){
    return (
        <h1>
            This is <span className={style.yellow}>awesome</span> React + Typescript + Webpack Setup.
            {props.message}
        </h1>
    )
}