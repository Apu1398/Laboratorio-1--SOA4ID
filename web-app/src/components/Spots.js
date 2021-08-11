import React from 'react';

class Spots extends React.Component {
    state = {
        data:[]
    }

    async componentDidMount() {
        await this.fetchSpots();
    }

    fetchSpots = async () => {
        let res = await fetch('http://localhost:8080/spaces');
        let data = await res.json()
        console.log(data)
        this.setState({
            data
        })
    }

    render() {
        return (

            <div className="container mt-3">
                <div className="row justify-content-center">
                    {this.state.data.map(space => (
                    <div className="col-sm-auto">
                        <div className="card mt-3 mb-2" style={this.getColor(space.state)} >
                            <div className="card-body">
                                {space.id}
                            </div>
                        </div>
                    </div>))}                    
                </div>
            </div>

        )
    }

    getColor(state){
        if(state === 'in-use'){
            return {backgroundColor:'red'}
        }
        else{
            return {backgroundColor:'green'}
        }
        
    }


}

export default Spots;