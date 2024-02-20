import React from "react"
import { NavLink, useNavigate } from "react-router-dom";
import ParisImage from '../bilder/ParisBilde.jpg';
import Paris2 from '../bilder/Paris2.jpg';
import PhotoCarousel from '../components/PhotoCarousel.jsx'
import '../styles/Destinasjonsside.css';
import { useEffect, useState } from "react";
import axios from 'axios'
import { useHistory ,useLocation } from 'react-router-dom';


const Destinasjonsside = () => {
    /*
    const images = [
        {ParisImage},
        {Paris2},
      ];
    */
      //const navigate = useNavigate();
  
    const id = useLocation().pathname.split("/")[2]
    const [traveldestination, setDestination] = useState({});
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        axios
        .get(`http://localhost:4000/api/travelDestinations/${id}`)
        .then((response) => {
            setDestination(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
        });
    }, [])

    const categoryList = traveldestination.category
    

    return (
        <div>
            {/*<PhotoCarousel images={images}/>*/}
            <img class='BildePaDestinasjonsside' src={ParisImage} alt='Her er ett bilde av pariestårnet'/>
            <img class='BildePaDestinasjonsside' src={Paris2} alt='Her er ett bilde av pariestårnet'/>


            <div id="tekstligBeskrivelse">
                <div id='rating'>
                    <p>Rating: {traveldestination.rating}/10</p>
                </div>

                <p id="tittel">{traveldestination.destination_name}</p>
                <p id="Kategorier"> Kategorier:{categoryList?.map(s => <li>{s}</li>)}</p>
                
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis massa nec libero porttitor elementum. Donec id ipsum orci. Pellentesque ultricies auctor justo, a mollis turpis placerat id. Vestibulum ultrices nisl orci. Proin ipsum sem, tempor vel blandit in, vestibulum vitae dui. Proin mattis pulvinar pellentesque. Suspendisse blandit bibendum diam in posuere. Quisque egestas convallis eros. Suspendisse a dolor vel purus ornare mollis. Ut nec nisl condimentum, cursus massa quis, ullamcorper arcu. Proin accumsan at libero ac auctor. Donec sit amet eros diam. Curabitur lacinia tortor non metus varius, vitae dictum neque tincidunt. Vestibulum nec enim ut nibh malesuada porta euismod eget odio. Nam placerat egestas erat, nec tincidunt leo iaculis et.

                    Donec non porttitor libero. Aenean varius libero at fermentum accumsan. Vivamus condimentum, sem ac maximus varius, ante neque dignissim erat, nec interdum risus tortor et purus. Fusce scelerisque nibh nunc, a rutrum leo pulvinar vitae. Fusce in accumsan tortor, id rhoncus augue. Nam laoreet lectus at semper luctus. Quisque convallis bibendum consequat. Vivamus euismod sit amet nibh a molestie. Phasellus eget justo felis. Mauris sem nunc, porta quis finibus eu, finibus nec ipsum. Duis vitae tempus urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>

        </div> 
    )
}
export default Destinasjonsside;