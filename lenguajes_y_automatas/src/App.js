import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./estilos.css";
import Ionicon from 'react-ionicons';

class App extends Component {
  render() {
    return (
      <div className="row">

        <div className="col-md-2 col-2">
        </div>
        <div className="col-md-10 col-10 header row">
          <div className="col-md-1 col-1 navbar-item">
            <Ionicon icon="logo-javascript" color="#ffff62" fontSize="14" /> App.js
            </div>
          <div className="col-md-1 col-1 navbar-item">
            <Ionicon icon="logo-css3" color="#d4d4ef" fontSize="14" /> estilos.css
            </div>
          <div className="col-md-1 col-1 navbar-item-selected">
            <Ionicon icon="logo-javascript" color="#ffff62" fontSize="14" /> Compilador.js
            </div>
          <div className="col-md-1 col-1 navbar-execute">
            <a className=""><Ionicon icon="ios-play" color="white" fontSize="14" /> EJECUTAR</a>
          </div>
        </div>

        <div className="col-md-2 col-2 left-bar row">
          <div className="col-md-2 col-2 config-bar">
            <div className="col-md-12 col-12">
              <Ionicon icon="md-document" color="white" fontSize="40" className="config-bar-icon" />
              <Ionicon icon="md-search" color="#e0e0e0" fontSize="40" className="config-bar-icon" />
              <Ionicon icon="ios-git-network" color="#e0e0e0" fontSize="40" className="config-bar-icon" />
              <Ionicon icon="ios-bug" color="#e0e0e0" fontSize="40" className="config-bar-icon" />
              <Ionicon icon="ios-exit" color="#e0e0e0" fontSize="40" className="config-bar-icon" />
              <Ionicon icon="md-cog" color="#e0e0e0" fontSize="35" className="config-bar-config" />
            </div>
          </div>
          <div className="col-md-10 col-10">
            <div className="col-md-12 col-12 element ml-4 mt-3">EXPLORER</div>
            <div className="col-md-12 col-12 menu-drops ml-2 mt-1"><Ionicon icon="md-arrow-dropright" color="white" /> Open Editors <span class="badge badge-primary"> 1 Unsaved</span></div>
            <div className="col-md-12 col-12 menu-drops ml-2"><Ionicon icon="md-arrow-dropright" color="white" className="arrow-open" /> Lenguajes_y_automatas</div>
            <div className="col-md-12 col-12 element ml-2 mt-1"><Ionicon icon="md-arrow-dropright" color="white" /><Ionicon icon="md-folder" color="#6262ff" /> .vs</div>
            <div className="col-md-12 col-12 element ml-2"><Ionicon icon="md-arrow-dropright" color="white" className="arrow-open" /><Ionicon icon="md-folder-open" color="#6262ff" /> icon</div>
            <div className="col-md-12 col-12 element ml-5"><Ionicon icon="md-image" color="#6262ff" /> vs-icon.png</div>
            <div className="col-md-12 col-12 element ml-2"><Ionicon icon="md-arrow-dropright" color="white" /><Ionicon icon="md-folder" color="#6262ff" /> js</div>
            <div className="col-md-12 col-12 element ml-2"><Ionicon icon="md-arrow-dropright" color="white" className="arrow-open" /><Ionicon icon="md-folder-open" color="#6262ff" /> lenguajes_y_automatas</div>
            <div className="col-md-12 col-12 element ml-5"><Ionicon icon="md-arrow-dropright" color="white" /><Ionicon icon="md-folder" color="#00b100" /> node_modules</div>
            <div className="col-md-12 col-12 element ml-5"><Ionicon icon="md-arrow-dropright" color="white" className="arrow-open" /><Ionicon icon="md-folder" color="#6262ff" /> public</div>
            <div className="col-md-12 col-12 element ml-5"><Ionicon icon="md-arrow-dropright" color="white" className="arrow-open" /><Ionicon icon="md-folder-open" color="#6262ff" /> src</div>
            <div className="col-md-12 col-12 element-in ml-5"><Ionicon icon="logo-javascript" color="#ffff62" /> acciones.js</div>
            <div className="col-md-12 col-12 element-in ml-5"><Ionicon icon="logo-css3" color="#d4d4ef" /> App.css</div>
            <div className="col-md-12 col-12 element-in ml-5"><Ionicon icon="logo-javascript" color="#ffff62" /> App.js</div>
            <div className="col-md-12 col-12 element-in ml-5"><Ionicon icon="logo-javascript" color="#ffff62" /> Compilador.js</div>
            <div className="col-md-12 col-12 element-in ml-5"><Ionicon icon="logo-css3" color="#d4d4ef" /> estilos.css</div>
            <div className="col-md-12 col-12 element-in ml-5"><Ionicon icon="logo-css3" color="#d4d4ef" /> index.css</div>
            <div className="col-md-12 col-12 element-in ml-5"><Ionicon icon="logo-javascript" color="#ffff62" /> index.js</div>
            <div className="col-md-12 col-12 element ml-5"><Ionicon icon="md-git-branch" color="#d90000" /> .gitignore</div>
            <div className="col-md-12 col-12 element ml-5"><Ionicon icon="logo-html5" color="#d90000" /> index.html</div>
          </div>
        </div>

        <div className="col-md-2 col-2">
        </div>
        <div className="col-md-10 col-10 code">
          <textarea ref="codigo" className="textarea-codigo" spellCheck="false" rows="36"></textarea>
        </div>

        <div className="col-md-2 col-2">
        </div>
        <div className="col-md-10 col-10 output">
          <ul className="nav nav-pills mt-1">
            <li className="nav-item">
              <a className="nav-link" href="#">Output</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Tabla de Simbolos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Disabled</a>
            </li>
          </ul>
        </div>

        <div className="col-md-2 col-2">
        </div>
        <div className="col-md-10 col-10 output-option">
          
        </div>
      </div>
    );
  }
}

export default App;
