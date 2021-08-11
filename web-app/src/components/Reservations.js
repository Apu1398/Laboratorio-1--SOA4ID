import React from 'react';

class Reservations extends React.Component {
    state = {
        data: ""
    }

    async componentDidMount() {
    
    }

    

    render() {
        return (

            <div className="container mt-5">
            <div className="form-row align-items-center">
                <div className="col-sm-5 my-1">                    
                    <input type="text" class="form-control" id="espacio" placeholder="Digite el numero de placa"/>
                    <button  className="btn btn-primary mt-3 padding-left-2" onClick={this.reservar}>Reservar</button>
                    <p></p>
                    <input type="text" class="form-control" id="espacio" placeholder="Digite el espacio a liberar"/>
                    <button  className="btn btn-primary mt-3 " onClick={()=>this.liberar}>Liberar</button>
                </div>
            </div>
            </div>


        )
    }

    reservar(){

        alert("Reservar el");
        this.fetchReservation();
    }

    fetchReservation = async () => {
        
        let res = await fetch('http://localhost:8080/spaces/6');
        let data = await res.json();
        console.log(data);   
    }

    liberar(){
        alert("Liberar el " + document.getElementById("espacio").value);
    }



}

export default Reservations;