import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './estilos.css';
import Ionicon from 'react-ionicons';

let modificadoresId = [];
let reservadaId = [];
let tipoId = [];
let nombresId = [];
let comparadoresId = [];
let operadoresId = [];
let booleanLiteralesId = [];
let simbolosEspecialesId = [];
let int_literalesId = [];
var duplicadosEliminados;
let icono;

class Compilador extends Component {
  state = {
    modificadores: ['private', 'public'],
    reservadas: ['class', 'if', 'while'],
    tipo: ['string', 'int', 'boolean'],
    comparadores: ['!=', '==', '<=', '>=', '<', '>'],
    operadores: ['*', '+', '-', '/', '='],
    booleanLiterales: ['true', 'false'],
    simbolosEspeciales: [')', '(', '{', '}', ';'],
    int_literales: new RegExp('^[0-9]+$'),
    ide_literales: new RegExp('^[a-zA-Z]+$'),
    tabla: [],
    nodefinidas: [],
    malDeclaradas: [],
    repetidas: []
  };

  compilador = () => {
    let linea = 1;
    modificadoresId = [];
    reservadaId = [];
    tipoId = [];
    nombresId = [];
    comparadoresId = [];
    operadoresId = [];
    simbolosEspecialesId = [];
    booleanLiteralesId = [];
    int_literalesId = [];
    let booleanos = ['true', 'false'];
    let valorString = [];
    let valor = this.refs.codigo.value;
    let modificadores = this.state.modificadores;
    let tipo = this.state.tipo;
    let comparadores = this.state.comparadores;
    let reservadas = this.state.reservadas;
    let operadores = this.state.operadores;
    let simbolosEspeciales = this.state.simbolosEspeciales;
    let booleanLiterales = this.state.booleanLiterales;
    let int_literales = this.state.int_literales;
    let ide_literales = this.state.ide_literales;

    var str = valor
      .trim()
      .split('\n')
      .join(' ');
    str = str.split('\t').join(' ');
    var res = str.split(' ');
    let puntoComa = '';
    console.log(res);
    let n = 0;
    let counter = 0;
    let count = 0;
    res.map(item => {
      if (item !== '') {
        counter = 0;
        if (item.indexOf(';') !== -1 && item.length > 1) {
          item = item.slice(0, -1);
          puntoComa = ';';
        }
        if (modificadores.indexOf(item) !== -1)
          modificadoresId.push({
            linea: linea,
            item: item,
            tipo: 'modificador',
            n: n
          });
        if (tipo.indexOf(item) !== -1)
          tipoId.push({ linea: linea, item: item, tipo: 'tipo', n: n });
        if (reservadas.indexOf(item) !== -1)
          reservadaId.push({
            linea: linea,
            item: item,
            tipo: 'reservada',
            n: n
          });
        if (comparadores.indexOf(item) !== -1)
          comparadoresId.push({
            linea: linea,
            item: item,
            tipo: 'comparador',
            n: n
          });
        if (operadores.indexOf(item) !== -1)
          operadoresId.push({
            linea: linea,
            item: item,
            tipo: 'operador',
            n: n
          });
        if (booleanLiterales.indexOf(item) !== -1)
          booleanLiteralesId.push({
            linea: linea,
            item: item,
            tipo: 'booleanLiterales',
            n: n
          });
        if (simbolosEspeciales.indexOf(item) !== -1) {
          simbolosEspecialesId.push({
            linea: linea,
            item: item,
            tipo: 'simbolos',
            n: n
          });
          if (item != ')' && item != '(') linea = linea + 1;
        }
        if (int_literales.test(item))
          int_literalesId.push({
            linea: linea,
            item: item,
            tipo: 'int_literales',
            n: n
          });

        if (
          !(reservadas.indexOf(item) !== -1) &&
          !(tipo.indexOf(item) !== -1) &&
          !(modificadores.indexOf(item) !== -1) &&
          !(comparadores.indexOf(item) !== -1) &&
          !(simbolosEspeciales.indexOf(item) !== -1) &&
          !(booleanLiterales.indexOf(item) !== -1) &&
          !(operadores.indexOf(item) !== -1) &&
          !int_literales.test(item)
        ) {
          nombresId.push({
            linea: linea,
            item: item,
            tipo: 'identificador',
            n: n
          });
        }

        if (puntoComa) {
          n = n + 1;
          simbolosEspecialesId.push({
            linea: linea,
            item: puntoComa,
            tipo: 'simbolos',
            n: n
          });
          linea = linea + 1;
        }
        puntoComa = '';
        n = n + 1;
        count = 0;
      } else {
        if (item === '') {
          count++;
          if (count >= 5) {
            linea++;
            count = 0;
          }
        }
      }
    });

    console.log('comparadores= ', comparadoresId);
    console.log('reservadas= ', reservadaId);
    console.log('tipos de datos= ', tipoId);
    console.log('identificadores= ', nombresId);
    console.log('modificadores= ', modificadoresId);
    console.log('simbolos especiales= ', simbolosEspecialesId);
    console.log('boolean literales= ', booleanLiteralesId);
    console.log('int literales= ', int_literalesId);
    console.log('operadores= ', operadoresId);
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////SINTACTICO//////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////

    let alphaArray = comparadoresId.concat(
      reservadaId,
      tipoId,
      nombresId,
      modificadoresId,
      simbolosEspecialesId,
      booleanLiteralesId,
      int_literalesId,
      operadoresId
    );

    alphaArray.sort((a, b) => {
      if (a.n > b.n) {
        return 1;
      }
      if (a.n < b.n) {
        return -1;
      }
      return 0;
    });
    let k = 0;
    let arrayDeclaradas = [];

    console.log(alphaArray);
    for (let i = 0; i < alphaArray.length; i++) {
      switch (alphaArray[i].tipo) {
        case 'reservada':
          if (alphaArray[i].item === 'class') {
            if (alphaArray[i + 1].tipo === 'identificador') {
              arrayDeclaradas.push({
                item: alphaArray[i + 1].item,
                posicion: alphaArray[i + 1].n,
                linea: alphaArray[i + 1].linea,
                tipo: 'clase'
              });
              break;
            }
          }
          if (alphaArray[i].item === 'if' || alphaArray[i].item === 'while') {
            if (alphaArray[i + 1].item === '(') {
              break;
            }
          } else {
            k = 1;
            alert(
              'error sintacticoo' +
                ' ' +
                alphaArray[i].n +
                ' ' +
                alphaArray[i].linea +
                ' ' +
                alphaArray[i].item +
                'reservada'
            );
          }
          break;
        case 'modificador':
          if (alphaArray[i + 1].tipo === 'reservada') {
            if (alphaArray[i + 1].item === 'class') {
              break;
            }
          } else {
            k = 1;
            alert(
              'error sintacticoo' +
                ' ' +
                alphaArray[i].n +
                ' ' +
                alphaArray[i].linea +
                ' ' +
                alphaArray[i].item +
                'modificador'
            );
          }
          break;
        case 'identificador':
          if (alphaArray[i + 1].tipo === 'simbolos') {
            if (alphaArray[i + 2].tipo !== 'identificador') break;
          }
          if (
            alphaArray[i + 1].tipo === 'operador' ||
            alphaArray[i + 1].tipo === 'comparador'
          ) {
            if (
              alphaArray[i + 1].item !== '=' &&
              (alphaArray[i - 1].tipo === 'tipo' ||
                alphaArray[i - 1].tipo === 'identificador')
            ) {
              break;
            }
            if (
              alphaArray[i + 1].item === '=' &&
              alphaArray[i - 1].tipo === 'tipo'
            ) {
              break;
            }
          } else {
            alert(
              'error sintacticoo' +
                ' ' +
                alphaArray[i].n +
                ' ' +
                alphaArray[i].linea +
                ' ' +
                alphaArray[i].item +
                'identificador'
            );
          }
          break;

        case 'tipo':
          if (alphaArray[i + 1].tipo === 'identificador') {
            arrayDeclaradas.push({
              item: alphaArray[i + 1].item,
              posicion: alphaArray[i + 1].n,
              linea: alphaArray[i + 1].linea,
              valor: alphaArray[i + 3].item,
              linea: alphaArray[i].linea,
              tipo: alphaArray[i].item
            });
            break;
          } else {
            k = 1;
            alert(
              'error sintacticoo' +
                ' ' +
                alphaArray[i].n +
                ' ' +
                alphaArray[i].linea +
                ' ' +
                alphaArray[i].item +
                'tipo'
            );
          }
          break;
        case 'comparador':
          if (
            alphaArray[i + 1].tipo === 'identificador' ||
            alphaArray[i + 1].tipo === 'int_literales'
          ) {
            break;
          } else {
            k = 1;
            alert(
              'error sintacticoo' +
                ' ' +
                alphaArray[i].n +
                ' ' +
                alphaArray[i].linea +
                ' ' +
                alphaArray[i].item +
                ' ' +
                'comparador'
            );
          }
          break;
        case 'operador':
          if (
            alphaArray[i + 1].tipo === 'identificador' ||
            alphaArray[i + 1].tipo === 'int_literales' ||
            alphaArray[i + 1].tipo === 'booleanLiterales'
          ) {
            if (
              alphaArray[i - 1].tipo === 'identificador' ||
              alphaArray[i - 1].tipo === 'int_literales'
            ) {
              break;
            }
          } else {
            k = 1;
            alert(
              'error sintacticoo' +
                ' ' +
                alphaArray[i].n +
                ' ' +
                alphaArray[i].linea +
                ' ' +
                alphaArray[i].item +
                ' ' +
                'operador'
            );
          }
          break;

        case 'booleanLiterales':
          if (
            alphaArray[i - 1].tipo === 'comparador' ||
            alphaArray[i - 1].tipo === 'operador' ||
            alphaArray[i - 1].tipo === 'simbolos'
          ) {
            if (
              alphaArray[i - 1].item === '=!' ||
              alphaArray[i - 1].item === '=' ||
              alphaArray[i - 1].item === '=='
            ) {
              break;
            }
            if (
              alphaArray[i - 1].item === '(' &&
              alphaArray[i + 1].item === ')'
            ) {
              break;
            }
          } else {
            k = 1;
            alert(
              'error sintacticoo' +
                ' ' +
                alphaArray[i].n +
                ' ' +
                alphaArray[i].linea +
                ' ' +
                alphaArray[i].item +
                ' ' +
                'booleano'
            );
          }
          break;

        case 'int_literales':
          if (
            alphaArray[i + 1].item === ';' &&
            alphaArray[i - 1].item === '='
          ) {
            break;
          }
          if (
            alphaArray[i + 1].tipo === 'comparador' ||
            alphaArray[i - 1].tipo === 'operador'
          ) {
            break;
          }
          if (
            alphaArray[i - 1].tipo === 'comparador' ||
            alphaArray[i + 1].tipo === 'operador'
          ) {
            break;
          } else {
            k = 1;
            alert(
              'error sintacticoo' +
                ' ' +
                alphaArray[i].n +
                ' ' +
                alphaArray[i].linea +
                ' ' +
                alphaArray[i].item +
                ' ' +
                'int literales'
            );
          }
          break;
        case 'simbolos':
          if (
            alphaArray[i].item === ';' &&
            (alphaArray[i - 1].tipo === 'identificador' ||
              alphaArray[i - 1].tipo === 'int_literales' ||
              alphaArray[i - 1].tipo === 'booleanLiterales')
          ) {
            break;
          }
          if (
            alphaArray[i].item === '}' &&
            (alphaArray[i - 1].item === '}' || alphaArray[i - 1].item === ';')
          ) {
            break;
          }
          if (
            alphaArray[i].item === '{' &&
            (alphaArray[i - 1].item === ')' ||
              alphaArray[i - 1].tipo === 'identificador')
          ) {
            break;
          }
          if (
            alphaArray[i].item === '(' &&
            alphaArray[i - 1].tipo === 'reservada'
          ) {
            break;
          }

          if (
            alphaArray[i].item === ')' &&
            (alphaArray[i - 1].item === ';' ||
              alphaArray[i - 1].tipo === 'identificador' ||
              alphaArray[i - 1].tipo === 'int_literales')
          ) {
            break;
          } else {
            k = 1;
            alert(
              'error sintacticoo' +
                ' ' +
                alphaArray[i].n +
                ' ' +
                alphaArray[i].linea +
                ' ' +
                alphaArray[i].item +
                ' ' +
                'simbolo'
            );
          }
          break;
        default:
          alert('AIUAAAA :(');
      }
    }
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    ///////////////////SEMANTICO/////////////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    console.log('Declaradas ', arrayDeclaradas);

    let uniqueResultOne = nombresId.filter(function(obj) {
      return !arrayDeclaradas.some(function(obj2) {
        return obj.item == obj2.item;
      });
    });

    var compareFunction = function(a, b) {
      return a.item === b.item
        ? a.tipo === b.tipo
          ? 0
          : a.tipo < b.tipo
          ? -1
          : 1
        : a.item < b.item
        ? -1
        : 1;
    };

    var arrayOrdenado = arrayDeclaradas.sort(compareFunction);
    var repetidos = [];
    for (var i = 0; i < arrayOrdenado.length - 1; i++) {
      if (compareFunction(arrayOrdenado[i + 1], arrayOrdenado[i]) === 0) {
        repetidos.push(arrayOrdenado[i]);
        repetidos.push(arrayOrdenado[i + 1]);
      }
    }

    function eliminarObjetosDuplicados(arr, prop) {
      var nuevoArray = [];
      var lookup = {};
      for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
      }
      for (i in lookup) {
        nuevoArray.push(lookup[i]);
      }
      return nuevoArray;
    }

    duplicadosEliminados = eliminarObjetosDuplicados(arrayDeclaradas, 'item');
    console.log('tabla', duplicadosEliminados); /// tabla de simbolos
    this.setState({ tabla: duplicadosEliminados });

    console.log('variables no definidas ', uniqueResultOne);
    this.setState({ nodefinidas: uniqueResultOne });
    console.log('variables repetidas ', repetidos);
    this.setState({ repetidas: repetidos });
    let arrayMalDeclaradas = [];
    for (let i = 0; i < duplicadosEliminados.length; i++) {
      if (
        duplicadosEliminados[i].tipo === 'int' &&
        !int_literales.test(duplicadosEliminados[i].valor)
      ) {
        arrayMalDeclaradas.push(duplicadosEliminados[i]);
      }
      if (
        duplicadosEliminados[i].tipo === 'boolean' &&
        (duplicadosEliminados[i].valor !== 'true' &&
          duplicadosEliminados[i].valor !== 'false')
      ) {
        arrayMalDeclaradas.push(duplicadosEliminados[i]);
      }
      if (
        duplicadosEliminados[i].tipo === 'string' &&
        !ide_literales.test(duplicadosEliminados[i].valor)
      ) {
        arrayMalDeclaradas.push(duplicadosEliminados[i]);
      }
    }
    console.log('Variables mal declaradas', arrayMalDeclaradas);
    this.setState({ malDeclaradas: arrayMalDeclaradas });
    // let aux = '';
    // let aux2 = '';
    // let aux3 = '';
    // for (let i = 0; i < alphaArray.length; i++) {
    //   if (alphaArray[i].item === '=' && alphaArray[i].tipo === 'operador') {
    //     if (
    //       alphaArray[i - 1].tipo === 'identificador' &&
    //       alphaArray[i - 2].tipo !== 'tipo'
    //     ) {
    //       console.log(alphaArray[i - 1].tipo);
    //       if (!duplicadosEliminados.includes(alphaArray[i - 1].item)) {
    //       }
    //     }
    //   }
    // }

    //////////////////////////TRIPLOS///////////////////////////////////
    let variableDueñaLinea;
    let variableDueña;
    let temporal = [];
    let abc;
    let tes = [];
    let adelante = true;
    for (let i = 0; i < alphaArray.length; i++) {
      if (alphaArray[i].item === '=' && alphaArray[i].tipo === 'operador') {
        if (
          alphaArray[i - 1].tipo === 'identificador' &&
          alphaArray[i - 2].tipo !== 'tipo' &&
          (alphaArray[i + 1].tipo === 'identificador' ||
            alphaArray[i + 1].tipo === 'int_literales')
        ) {
          variableDueña = alphaArray[i - 1].item;
          variableDueñaLinea = alphaArray[i - 1].linea;
          for (let j = i + 1; j < alphaArray.length; j++) {
            if (alphaArray[j].item !== ';') {
              temporal.push(alphaArray[j].item);
              abc = alphaArray[j].item;
            }
            {
              break;
            }
          }

          break;
        }
      }
    }
    var ss = abc.split('');
    let sin_modificacion = ss;
    console.log(temporal, abc, ss);
    let sweet = [];
    var i = 0;
    let valorT = 1;

    for (let i = 0; i < ss.length; i++) {
      if (
        ss[i] === '-' &&
        (ss[i - 1] === '+' ||
          ss[i - 1] === '*' ||
          ss[i - 1] === '-' ||
          ss[i - 1] === '/')
      ) {
        var removed = ss.splice(i, 2, `T${valorT}`);
        console.log(removed, valorT);
        valorT = valorT + 1;
      }
    }
    for (let i = 0; i < ss.length; i++) {
      if (ss[i] === '(') {
        var removed = ss.splice(i, 5, `T${valorT}`);
        console.log(removed, valorT);
        valorT = valorT + 1;
      }
    }
    console.log(ss);
    for (let i = 0; i < ss.length; i++) {
      if (ss[i + 1] === '*') {
        var removed = ss.splice(i, 3, `T${valorT}`);
        console.log(removed, valorT);
        valorT = valorT + 1;
      }
    }
    console.log(ss);
    for (let i = 0; i < ss.length; i++) {
      if (ss[i + 1] === '/') {
        var removed = ss.splice(i, 3, `T${valorT}`);
        console.log(removed, valorT);
        valorT = valorT + 1;
      }
    }
    console.log(ss);
    for (let i = 0; i < ss.length; i++) {
      if (ss[i + 1] === '+') {
        var removed = ss.splice(i, 3, `T${valorT}`);
        console.log(removed, valorT);
        valorT = valorT + 1;
      }
    }
    console.log(ss);
    for (let i = 0; i < ss.length; i++) {
      if (ss[i + 1] === '-') {
        var removed = ss.splice(i, 3, `T${valorT}`);
        valorT = valorT + 1;
      }
    }
    console.log(ss);
  };

  cambio = () => {
    this.refs.out.style.display = 'block';
    this.refs.tabla.style.display = 'none';
  };
  tabla = () => {
    this.refs.out.style.display = 'none';
    this.refs.tabla.style.display = 'block';
  };

  render() {
    let duplicadosEliminadoss = this.state.tabla;
    let nodefinidas = this.state.nodefinidas;
    let repetidas = this.state.repetidas;
    let malDeclaradas = this.state.malDeclaradas;
    return (
      <div className="row">
        <div className="col-md-2 col-2" />
        <div className="col-md-10 col-10 header row">
          <div className="col-md-1 col-1 navbar-item">
            <Ionicon icon="logo-javascript" color="#ffff62" fontSize="14" />{' '}
            App.js
          </div>
          <div className="col-md-1 col-1 navbar-item">
            <Ionicon icon="logo-css3" color="#d4d4ef" fontSize="14" />{' '}
            estilos.css
          </div>
          <div className="col-md-2 col-2 navbar-item-selected">
            <Ionicon icon="logo-javascript" color="#ffff62" fontSize="14" />{' '}
            Compilador.js
          </div>
          <div
            className="col-md-1 col-1 navbar-execute"
            onClick={this.compilador}
          >
            <a className="">
              <Ionicon icon="ios-play" color="white" fontSize="14" /> EJECUTAR
            </a>
          </div>
        </div>

        <div className="col-md-2 col-2 left-bar row">
          <div className="col-md-2 col-2 config-bar">
            <div className="col-md-12 col-12">
              <Ionicon
                icon="md-document"
                color="white"
                fontSize="40"
                className="config-bar-icon"
              />
              <Ionicon
                icon="md-search"
                color="#e0e0e0"
                fontSize="40"
                className="config-bar-icon"
              />
              <Ionicon
                icon="ios-git-network"
                color="#e0e0e0"
                fontSize="40"
                className="config-bar-icon"
              />
              <Ionicon
                icon="ios-bug"
                color="#e0e0e0"
                fontSize="40"
                className="config-bar-icon"
              />
              <Ionicon
                icon="ios-exit"
                color="#e0e0e0"
                fontSize="40"
                className="config-bar-icon"
              />
              <Ionicon
                icon="md-cog"
                color="#e0e0e0"
                fontSize="35"
                className="config-bar-config"
              />
            </div>
          </div>
          <div className="col-md-10 col-10">
            <div className="col-md-12 col-12 element ml-4 mt-3">EXPLORER</div>
            <div className="col-md-12 col-12 menu-drops ml-2 mt-1">
              <Ionicon icon="md-arrow-dropright" color="white" /> Open Editors{' '}
              <span className="badge badge-primary"> 1 Unsaved</span>
            </div>
            <div className="col-md-12 col-12 menu-drops ml-2">
              <Ionicon
                icon="md-arrow-dropright"
                color="white"
                className="arrow-open"
              />{' '}
              Lenguajes_y_automatas
            </div>
            <div className="col-md-12 col-12 element ml-2 mt-1">
              <Ionicon icon="md-arrow-dropright" color="white" />
              <Ionicon icon="md-folder" color="#6262ff" /> .vs
            </div>
            <div className="col-md-12 col-12 element ml-2">
              <Ionicon
                icon="md-arrow-dropright"
                color="white"
                className="arrow-open"
              />
              <Ionicon icon="md-folder-open" color="#6262ff" /> icon
            </div>
            <div className="col-md-12 col-12 element ml-5">
              <Ionicon icon="md-image" color="#6262ff" /> vs-icon.png
            </div>
            <div className="col-md-12 col-12 element ml-2">
              <Ionicon icon="md-arrow-dropright" color="white" />
              <Ionicon icon="md-folder" color="#6262ff" /> js
            </div>
            <div className="col-md-12 col-12 element ml-2">
              <Ionicon
                icon="md-arrow-dropright"
                color="white"
                className="arrow-open"
              />
              <Ionicon icon="md-folder-open" color="#6262ff" />{' '}
              lenguajes_y_automatas
            </div>
            <div className="col-md-12 col-12 element ml-5">
              <Ionicon icon="md-arrow-dropright" color="white" />
              <Ionicon icon="md-folder" color="#00b100" /> node_modules
            </div>
            <div className="col-md-12 col-12 element ml-5">
              <Ionicon
                icon="md-arrow-dropright"
                color="white"
                className="arrow-open"
              />
              <Ionicon icon="md-folder" color="#6262ff" /> public
            </div>
            <div className="col-md-12 col-12 element ml-5">
              <Ionicon
                icon="md-arrow-dropright"
                color="white"
                className="arrow-open"
              />
              <Ionicon icon="md-folder-open" color="#6262ff" /> src
            </div>
            <div className="col-md-12 col-12 element-in ml-5">
              <Ionicon icon="logo-javascript" color="#ffff62" /> acciones.js
            </div>
            <div className="col-md-12 col-12 element-in ml-5">
              <Ionicon icon="logo-css3" color="#d4d4ef" /> App.css
            </div>
            <div className="col-md-12 col-12 element-in ml-5">
              <Ionicon icon="logo-javascript" color="#ffff62" /> App.js
            </div>
            <div className="col-md-12 col-12 element-in ml-5">
              <Ionicon icon="logo-javascript" color="#ffff62" /> Compilador.js
            </div>
            <div className="col-md-12 col-12 element-in ml-5">
              <Ionicon icon="logo-css3" color="#d4d4ef" /> estilos.css
            </div>
            <div className="col-md-12 col-12 element-in ml-5">
              <Ionicon icon="logo-css3" color="#d4d4ef" /> index.css
            </div>
            <div className="col-md-12 col-12 element-in ml-5">
              <Ionicon icon="logo-javascript" color="#ffff62" /> index.js
            </div>
            <div className="col-md-12 col-12 element ml-5">
              <Ionicon icon="md-git-branch" color="#d90000" /> .gitignore
            </div>
            <div className="col-md-12 col-12 element ml-5">
              <Ionicon icon="logo-html5" color="#d90000" /> index.html
            </div>
          </div>
        </div>

        <div className="col-md-2 col-2" />
        <div className="col-md-10 col-10 code">
          <textarea
            ref="codigo"
            className="textarea-codigo"
            spellCheck="false"
            rows="36"
          />
        </div>

        <div className="col-md-2 col-2" />
        <div className="col-md-10 col-10 output">
          <ul className="nav nav-pills mt-1">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.cambio}>
                Output
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.tabla}>
                Tabla de Simbolos
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-2 col-2" />
        <div className="col-md-10 col-10 output-option">
          <div ref="tabla" className="ok">
            {duplicadosEliminadoss ? (
              <table class="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Nombre identificador</th>
                    <th scope="col">tipo de dato</th>
                    <th scope="col">valor</th>
                    <th scope="col">Linea</th>
                    <th scope="col">Posicion</th>
                  </tr>
                </thead>
                <tbody>
                  {duplicadosEliminadoss.map(n => {
                    return (
                      <tr key={n}>
                        <th scope="row">{n.item}</th>
                        <td>{n.tipo}</td>
                        <td>{n.valor}</td>
                        <td>{n.linea}</td>
                        <td>{n.posicion}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div>cargando</div>
            )}
          </div>
          <div ref="out" className="ok">
            {nodefinidas ? (
              <table class="table table-dark">
                <thead>
                  No definidas
                  <tr>
                    <th scope="col">Nombre identificador</th>
                    <th scope="col">tipo de dato</th>
                    <th scope="col">Linea</th>
                    <th scope="col">Posicion</th>
                  </tr>
                </thead>
                <tbody>
                  {nodefinidas.map(n => {
                    return (
                      <tr key={n}>
                        <th scope="row">{n.item}</th>
                        <td>{n.tipo}</td>

                        <td>{n.linea}</td>
                        <td>{n.n}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div>cargando</div>
            )}
            <div>--------------------------------------------------------</div>
            {malDeclaradas ? (
              <table class="table table-dark">
                <thead>
                  MAL DECLARADAS
                  <tr>
                    <th scope="col">Nombre identificador</th>
                    <th scope="col">tipo de dato</th>
                    <th scope="col">valor</th>
                    <th scope="col">Linea</th>
                    <th scope="col">Posicion</th>
                  </tr>
                </thead>
                <tbody>
                  {malDeclaradas.map(n => {
                    return (
                      <tr key={n}>
                        <th scope="row">{n.item}</th>
                        <td>{n.tipo}</td>
                        <td>{n.valor}</td>
                        <td>{n.linea}</td>
                        <td>{n.posicion}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div>cargando</div>
            )}
            {repetidas ? (
              <table class="table table-dark">
                <thead>
                  REPETIDAS
                  <tr>
                    <th scope="col">Nombre identificador</th>
                    <th scope="col">tipo de dato</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Linea</th>
                    <th scope="col">Posicion</th>
                  </tr>
                </thead>
                <tbody>
                  {repetidas.map(n => {
                    return (
                      <tr key={n}>
                        <th scope="row">{n.item}</th>
                        <td>{n.tipo}</td>
                        <td>{n.valor}</td>
                        <td>{n.linea}</td>
                        <td>{n.n}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div>cargando</div>
            )}
            <div>--------------------------------------------------------</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Compilador;
