import "./Cards.css"


function Cards(props){
    const getElements = props.mutedList.map((car)=>{
      return(
        <div  key={car.id} className='car-item'>
           <div>Brand: {car.name}</div>
           <div>Color: {car.color}</div>
           <div>Year of production: {car.manufactured}</div>
        </div>
      )
    })
    return  <div className="car-box">{getElements}</div>
  }

  export default Cards;