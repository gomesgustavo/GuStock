import React from 'react';
import YahooAPI from '../service/YahooAPI.jsx';
import axios from 'axios';

class Formulario extends React.Component{

handleSubmit(e){
      e.preventDefault();
      var acao = this.refs.acao.value;
      var valor = this.refs.valor.value;
      var precoAcao = 0;
      var resultado = this.refs.result;
      HoldOn.open({
           theme:"sk-cube-grid"
      });
      axios.get('https://query.yahooapis.com/v1/public/yql?q=select%20LastTradePriceOnly%20from%20yahoo.finance.quote%20where%20symbol%20%3D%20\"' + acao + '\"&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
      .then(function (resp) {
          HoldOn.close();
          precoAcao = resp.data.query.results.quote.LastTradePriceOnly;
          resultado.value= Math.floor(valor/precoAcao);
      })
}

  render(){
    return(
          <div className="row">
            <div className="col-md-12">
                <form onSubmit={this.handleSubmit.bind(this)}>

                  <div className="row">
                    <div className="col-md-3">
                      <label>Ação desejada:</label>
                    </div>
                    <div className="col-md-4">
                      <input className="form-control" type="text" name="acao" ref="acao"/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3">
                      <label>Valor disponível:</label>
                    </div>
                    <div className="col-md-4">

                    <div className="input-group">
                      <span className="input-group-addon">$</span>
                      <input className="form-control" type="text" name="valor" ref="valor"/>
                    </div>

                    </div>
                  </div>

                  <hr></hr>

                  <div className="row">
                    <div className="col-md-3">
                      <label>Resultado:</label>
                    </div>
                    <div className="col-md-4">
                      <input className="form-control" type="text" name="resultado" ref="result"/>
                    </div>
                    <div className="col-offset-md-5 col-md-3">
                      <button type="submit"
                       className="btn btn-primary">Calcular</button>
                    </div>
                  </div>

                </form>
            </div>
          </div>
    );
  }
}

export default Formulario;
