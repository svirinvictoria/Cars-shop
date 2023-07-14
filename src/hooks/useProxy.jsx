export const useProxy = ()=>{
    //importing array of cars 
    function importCarsPr(){
        const getList = carsArray()
        return getList
   
    }

    return{
        importCarsPr: importCarsPr
    }
}


function carsArray(){
    return (
        [
        {   name: "VW", 
            id:"1",
            color: "blue",
            manufactured: "2020"
        },
        {   name: "Opel", 
            id:"21",
            color: "white",
            manufactured: "2021"
        },
        {   name: "AUDI", 
            id:"3",
            color: "gray",
            manufactured: "2022"
        },
        {  name: "MINI", 
            id:"4",
            color: "red",
            manufactured: "2019"
        },
        {  name: "Volvo", 
            id:"5",
            color: "black",
            manufactured: "2018"
        },
        {   name: "Renault", 
            id:"6",
            color: "green",
            manufactured: "2017"
        },
        {  name: "Seat", 
            id:"7",
            color: "yellow",
            manufactured: "2020"
        },
        {  name: "Jaguar", 
            id:"8",
            color: "red",
            manufactured: "2022"
        },
        { name: "Porshe", 
            id:"9",
            color: "silver",
            manufactured: "2019"
        },
        { name: "Mazda", 
            id:"10",
            color: "blue",
            manufactured: "2020"
        }
        ]
    )
}
