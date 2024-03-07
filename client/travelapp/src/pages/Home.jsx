import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import LoginButton from "./../components/LoginButton";
import Destinasjonsboks from "../components/Destinasjonsboks";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFilter } from '../components/FilterProvider'; 

// const Home = (props) => {
//   const [traveldestinations, setTraveldestinations] = useState(null);
  
//   //const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTraveldestinations = async () => {
//       //feches data from server:
//       const response = await fetch(
//         "http://localhost:4000/api/travelDestinations"
//       );
//       //makes an array of userobjects:
//       const json = await response.json();

//       if (response.ok) {
//         setTraveldestinations(json);
//       }
//     };
//     fetchTraveldestinations();
    
//   }, []);

//   function setVisit() {

//   }


const Home = (props) => {
const [traveldestinations, setTraveldestinations] = useState(null);
  
  const [user, setUser] = useState(null);
  
  const {filter, setFilter} = useFilter()

 
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchTravelDestinations = async () => {
      const response = await fetch("http://localhost:4000/api/travelDestinations");
      const json = await response.json();

      if (response.ok) {
        // finner gjennomsnitt for hver destinasjon ved å mappe over alle destinasjonene. 
          const destinationsWithAverage = await Promise.all(json.map(async traveldestination => {
          const averageResponse = await fetch(`http://localhost:4000/api/travelDestinations/average/${traveldestination._id}`);
          const averageJson = await averageResponse.json();
          return { ...traveldestination, averageRating: Math.round(averageJson.averageRating*100)/100 };
        }));

        setTraveldestinations(destinationsWithAverage);
      }
    };

    fetchTravelDestinations();
  }, []);

  function setVisit() {

  }
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:4000/api/users/find/" + localStorage.getItem("loggedIn"));

      const json = await response.json();
      if (response.ok) {
        setUser(json);
      }
    };

    fetchUser();
  });

  return (
    <div>
      <div className="mainContainer">
        <div className={"titleContainer"}>
          {/*<div>Welcome! HOME</div>
        </div>
  <div>This is the home page.</div>*/}
  </div>
        <div className={"buttonContainer"}>
          {/* {loggedIn ? <div>Your email address is {email}</div> : <div />} */}
        </div>
        {/* <div id="destinasjonsBokserDiv">
                <Destinasjonsboks rating ={4} land={"Canada"} tittel={"Paris"} beskrivelse={"Kjærlighetens by. Kjent for god mat og romantisk stemning."}/>
                <Destinasjonsboks rating ={4} land={"norge"} tittel={"Alicante"} beskrivelse={"Varm ferieby. Kjent for gode strender, med mange norske tursiter"}/>
                <Destinasjonsboks land={"Toronto"} tittel={"Toronto"} beskrivelse={"Beverenes hjemby. Og mest folkerike byen i canada. Kjent for deres hyggelige tilnærming"} />
                <Destinasjonsboks rating ={4} land={"Canada"} tittel={"Paris"} beskrivelse={"Kjærlighetens by. Kjent for god mat og romantisk stemning."}/>
                <Destinasjonsboks rating ={4} land={"norge"} tittel={"Alicante"} beskrivelse={"Varm ferieby. Kjent for gode strender, med mange norske tursiter"}/>
                <Destinasjonsboks land={"Toronto"} tittel={"Toronto"} beskrivelse={"Beverenes hjemby. Og mest folkerike byen i canada. Kjent for deres hyggelige tilnærming"} />
                <Destinasjonsboks rating ={4} land={"Canada"} tittel={"Paris"} beskrivelse={"Kjærlighetens by. Kjent for god mat og romantisk stemning."}/>
                <Destinasjonsboks rating ={4} land={"norge"} tittel={"Alicante"} beskrivelse={"Varm ferieby. Kjent for gode strender, med mange norske tursiter"}/>
                <Destinasjonsboks land={"Toronto"} tittel={"Toronto"} beskrivelse={"Beverenes hjemby. Og mest folkerike byen i canada. Kjent for deres hyggelige tilnærming"} />
                <Destinasjonsboks rating ={4} land={"Canada"} tittel={"Paris"} beskrivelse={"Kjærlighetens by. Kjent for god mat og romantisk stemning."}/>
                <Destinasjonsboks rating ={4} land={"norge"} tittel={"Alicante"} beskrivelse={"Varm ferieby. Kjent for gode strender, med mange norske tursiter"}/>
                <Destinasjonsboks land={"Toronto"} tittel={"Toronto"} beskrivelse={"Beverenes hjemby. Og mest folkerike byen i canada. Kjent for deres hyggelige tilnærming"} />    
                </div> */}
        {/* {loggedIn ? <div>Your email address is {email}</div> : <div />} */}

        
        setFilterCriterion([])




      </div>
      <div className="Traveldestinations">

        {/*Formatet for filtering per nå:
          Filter ser slik ut [[ratingMin, RatingMax], [tags], [kontinenter], klima, showVisisted]
          dersom kontinenter er full skal den sortes som full
        */}

        {traveldestinations &&
          traveldestinations.filter(ele =>{ //filtrering av Rating
            return  filter[0][0] <= ele.rating && ele.rating <= filter[0][1]
          }).
          filter(ele =>{ //filtrering av Besøkt/ikke Besøkt
            
            if (filter[4] == "Vis Begge"){
              return true
            }
            else if (user == null){
              return true
            }
            else if (filter[4] == "Kun Besøkte"){
              const visitedArray = user.destinations
              for (let index = 0; index < visitedArray.length; index++) {
                const element = visitedArray[index];
                 if(element.destinationId == ele._id){
                  console.log(element.hasVisited)

                  return element.hasVisited
                }
              }
              return  false
            }
            else if (filter[4] == "Kun Ubesøkte"){
              const visitedArray = user.destinations

              for (let index = 0; index < visitedArray.length; index++) {
                const element = visitedArray[index];
                 if(element.destinationId == ele._id){
                  console.log(element.hasVisited)

                  return !element.hasVisited
                }
              }
              return  true
            }
          }).
          
          filter(ele =>{            //filtrering av kontinent
            if(filter[2].length == 0){
              return true
            }
            else{
              return filter[2].indexOf(ele.destination_continent) != -1
            }
          }).

          /* filter(ele =>{            //filtrering av tags
            if(filter[1].length == 0){
              return true
            }
            else{
              return filter[1].indexOf(ele.destination_continent) != -1
            }
          }). */

          map((traveldestination) => (
            <Destinasjonsboks
              key={traveldestination._id}
              id={traveldestination._id}
              rating={traveldestination.averageRating}
              land={traveldestination.destination_country}
              tittel={traveldestination.destination_name}
              beskrivelse={traveldestination.ShortDescription}
              imgPath={traveldestination.imgPath}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
