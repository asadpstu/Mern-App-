import React, { Component } from 'react';


class Banner extends Component {

    deletePerson()
    {
        alert("Delete");
    }

    render() {
    //console.log(this.props);
    const divStyle = 
    {
        'border': '1px solid RED',
        'margin': '5px'
    }

    const { personlist,delPerson } = this.props;
    const alperson = personlist.map(single =>{
        return single.roll > 10 ? (
            <div className="Banner" key={single.id} style={divStyle}>
              <div> <button onClick={ () => {delPerson(single.id) }} >Delete</button> </div>
              <div>Your Name : { single.name } </div>
              <div>Roll is: { single.roll } </div>
              <div>Registration sl: { single.reg } </div>
            </div>
          ) : null

    })


    return (
      <div className="Banner">

        <div> { alperson }</div>
      </div>
    );
  }
}

export default Banner;
