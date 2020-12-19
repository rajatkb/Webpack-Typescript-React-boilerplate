import * as  React  from 'react';
import * as ReactDOM from "react-dom";
import './style/index.scss'
import App from './App'


window.onload = () => {
const appNode = document.getElementById('App')
            ReactDOM.render(<App message="Hello World" />, appNode )
}
