import Nav from './components/Nav.js';
import NewsList from './components/NewsList.js';

const root = document.getElementById('root');

const nav = new Nav(root);
nav.render();

const newsList = new NewsList(root);
newsList.render();
