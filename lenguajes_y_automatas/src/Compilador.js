import React, { Component } from "react";
import "./estilos.css";
let modificadoresId = [{}];
let reservadaId = [];
let tipoId = [];
let nombresId = [];
let comparadoresId = [];
let operadoresId = [];
let booleanLiteralesId = [];
let simbolosEspecialesId = [];
let int_literalesId = [];

class Compilador extends Component {
  state = {
    modificadores: ["private", "public"],
    reservadas: ["class", "if", "while"],
    tipo: ["string", "int", "boolean"],
    comparadores: ["!=", "==", "<=", ">=", "<", ">"],
    operadores: ["*", "+", "-", "/", "="],
    booleanLiterales: ["true", "false"],
    simbolosEspeciales: [")", "(", "{", "}", ";"],
    int_literales: new RegExp("^[0-9]+$")

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
    let gg = this.refs.codigo.rows;
    console.log(gg);
    let valor = this.refs.codigo.value;
    let modificadores = this.state.modificadores;
    let tipo = this.state.tipo;
    let comparadores = this.state.comparadores;
    let reservadas = this.state.reservadas;
    let operadores = this.state.operadores;
    let simbolosEspeciales = this.state.simbolosEspeciales;
    let booleanLiterales = this.state.booleanLiterales;
    let int_literales = this.state.int_literales;


    var str = valor.trim().split("\n").join(" ");
    str = str.split("\t").join(" ")
    var res = str.split(" ");
    let puntoComa = "";
    console.log(res);
    let n = 0;
    res.map(item => {
      if (item !== "") {
        if ((item.indexOf(";") !== -1) && (item.length > 1)) { puntoComa = ";"; item = item.slice(0, -1); }
        if (modificadores.indexOf(item) !== -1) modificadoresId.push({ linea: linea, item: item, tipo: "modificador", n: n });
        if (tipo.indexOf(item) !== -1) tipoId.push({ linea: linea, item: item, tipo: "tipo", n: n });
        if (reservadas.indexOf(item) !== -1) reservadaId.push({ linea: linea, item: item, tipo: "reservada", n: n });
        if (comparadores.indexOf(item) !== -1) comparadoresId.push({ linea: linea, item: item, tipo: "comparador", n: n });
        if (operadores.indexOf(item) !== -1) operadoresId.push({ linea: linea, item: item, tipo: "operador", n: n });
        if (booleanLiterales.indexOf(item) !== -1) booleanLiteralesId.push({ linea: linea, item: item, tipo: "booleanLiterales", n: n });
        if (simbolosEspeciales.indexOf(item) !== -1) simbolosEspecialesId.push({ linea: linea, item: item, tipo: "simbolos", n: n });
        if (puntoComa) simbolosEspecialesId.push({ linea: linea, item: puntoComa, tipo: "simbolos", n: n });
        if (int_literales.test(item)) int_literalesId.push({ linea: linea, item: item, tipo: "int_literales", n: n });
        if (!(reservadas.indexOf(item) !== -1) && !(tipo.indexOf(item) !== -1) && !(modificadores.indexOf(item) !== -1) && !(comparadores.indexOf(item) !== -1) && !(simbolosEspeciales.indexOf(item) !== -1) && !(booleanLiterales.indexOf(item) !== -1) && !(operadores.indexOf(item) !== -1) && !(int_literales.test(item))) nombresId.push({ linea: linea, item: item, tipo: "identificador", n: n })
        puntoComa = "";
        n = n + 1;
      } else linea = linea + 1;
    });

    console.log("comparadores= ", comparadoresId);
    console.log("reservadas= ", reservadaId);
    console.log("tipos de datos= ", tipoId);
    console.log("identificadores= ", nombresId);
    console.log("modificadores= ", modificadoresId);
    console.log("simbolos especiales= ", simbolosEspecialesId);
    console.log("boolean literales= ", booleanLiteralesId);
    console.log("int literales= ", int_literalesId);
    console.log("operadores= ", operadoresId);
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////SINTACTICO//////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////

    let alphaArray = comparadoresId.concat(reservadaId, tipoId, nombresId, modificadoresId, simbolosEspecialesId, booleanLiteralesId, int_literalesId, operadoresId);

    alphaArray.sort((a, b) => {
      if (a.n > b.n) {
        return 1;
      }
      if (a.n < b.n) {
        return -1;
      }
      return 0;
    })

    for (let i = 0; i < alphaArray.length; i++) {

      switch (alphaArray[i].tipo) {
        case "reservada":
          if (alphaArray[i].item === "class") {
            if (alphaArray[i + 1].tipo === "identificador") { break }
          }
          if (alphaArray[i].item === "if" || alphaArray[i].item === "while") {
            if (alphaArray[i + 1].item === "(") { break }
          }
          else { alert("error sintacticoo" + " " + alphaArray[i].n + " " + alphaArray[i].linea + " " + alphaArray[i].item) }
          break;
        case "modificador":
          if (alphaArray[i + 1].tipo === "reservada") {
            if (alphaArray[i + 1].item === "class") { break }
          } else { alert("error sintacticoo" + " " + alphaArray[i].n + " " + alphaArray[i].linea + " " + alphaArray[i].item) }
          break;
        case "identificador":
          if (alphaArray[i + 1].tipo === "simbolos") {
            break;
          }

          if (alphaArray[i + 1].tipo === "operador" || (alphaArray[i + 1].tipo === "comparador")) {
            if (alphaArray[i + 1].item !== "=" && (alphaArray[i - 1].tipo !== "tipo")) { break }
            if (alphaArray[i + 1].item == "=" && (alphaArray[i - 1].tipo == "tipo")) { break }
          } else { alert("error sintacticoo" + " " + alphaArray[i].n + " " + alphaArray[i].linea + " " + alphaArray[i].item) }



          break;
        case "tipo":
          console.log("Cherries are $3.00 a pound.");
          break;
        case "comparador":
          console.log("Cherries are $3.00 a pound.");
          break;
        case "operador":
          console.log("Mangoes and papayas are $2.79 a pound.");
          break;
        case "booleanLiterales":
          console.log("Mangoes and papayas are $2.79 a pound.");
          break;
        case "int_literales":
          console.log("Mangoes and papayas are $2.79 a pound.");
          break;
        case "simbolos":
          console.log("Mangoes and papayas are $2.79 a pound.");
          break;
        default:
          console.log("Sorry, we are out of " + + ".");
      }
    }





  };


  //////////////////////////////////////////////////////////

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
