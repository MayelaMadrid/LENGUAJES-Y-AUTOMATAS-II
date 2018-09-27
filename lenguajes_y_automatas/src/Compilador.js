import React, { Component } from "react";
import "./estilos.css";
let modificadoresId = [{}];
let reservadaId = [];
let tipoId = [];
let nombresId = [];
let simbolosId = [];
class Compilador extends Component {
  state = {
    modificadores: ["private", "public"],
    reservadas: ["class", "if"],
    tipo: ["string", "int", "boolean"],
    simbolos: [")", "(", "{", "}", "!=", "==", "<=", ">=", "<", ">", ";", "*", "+", "-", "/", "="]
  };
  validaCaracter = event => {
    let regex = new RegExp("");
    let key = String.fromCharCode(
      !event.charCode ? event.which : event.charCode
    );
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  };

  compilador = () => {
    modificadoresId = [];
    reservadaId = [];
    tipoId = [];
    nombresId = [];
    simbolosId = [];
    let valor = this.refs.codigo.value;
    let modificadores = this.state.modificadores;
    let tipo = this.state.tipo;
    let simbolos = this.state.simbolos;
    let reservadas = this.state.reservadas;


    var str = valor.trim().split("\n").join(" ");
    str = str.split("\t").join(" ")
    var res = str.split(" ");

    console.log(res);
    res.map(item => {
      if (item !== "") {
        if (modificadores.indexOf(item) !== -1) modificadoresId.push({ item });
        if (tipo.indexOf(item) !== -1) tipoId.push({ item });
        if (reservadas.indexOf(item) !== -1) reservadaId.push({ item });
        if (simbolos.indexOf(item) !== -1) simbolosId.push({ item });
        if (!(reservadas.indexOf(item) !== -1) && !(tipo.indexOf(item) !== -1) && !(modificadores.indexOf(item) !== -1) && !(simbolos.indexOf(item) !== -1)) nombresId.push({ item })
      }
    });


    //console.log(`texto area: ${str}`);
    console.log(simbolosId);
    console.log(reservadaId);
    console.log(tipoId);
    console.log(nombresId);
    console.log(modificadoresId);
  };

  render() {
    return (
      <div className="col-8 shadow">
        <div className="content">
          <div className="left-area">
            <textarea
              ref="codigo"
              spellCheck="false"
              className="data-input"
              rows="37"
              cols="79"
            />
          </div>
          <div className="mid">
            <button className="boton_run" onClick={this.compilador}>
              RUN
            </button>
          </div>
          <div className="right-area">
            <textarea
              spellCheck="false"
              className="data-input"
              rows="37"
              cols="79"
              readOnly
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Compilador;
