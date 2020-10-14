import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getprofilebyid} from "../../js/action/profileactions"
import {getrate,addrate} from "../../js/action/rateAction"
import StarRatingComponent from 'react-star-rating-component';
import { Container, Row, Jumbotron } from "reactstrap";
import {Spinner} from "react-bootstrap"
const Profilefiche = (props) => {
  
  const rates=useSelector(state=>state.rateReducer.rates)
  const user=useSelector(state=>state.authReducer.user)
  const rate=rates.filter(e=>e.profile==props.match.params.id)

  const dispatch=useDispatch()
  
  const [rating,setRating]=useState("")

  let counter=0;
  for (let i = 0; i < rate.length; i++) {
    if (user && user._id == rate[i].user){
    counter = counter+1
    } 
  }
  const addratee = (e) => {
    e.preventDefault();
    // dispatch actions
    if (counter == 0){
    dispatch(
      addrate(props.match.params.id, {
     
        rating: rating
       
      })
    
    );
  }else {alert("you have already do a rating")}
    setRating("")
  };
  
  useEffect(()=>{
    dispatch(getrate())
},[])


    const getprofilefiche=()=>{
        dispatch(getprofilebyid (props.match.params.id))       
    }

  useEffect(() => {
    getprofilefiche()}, []);

    const profile= useSelector(state => state.profileReducer.profile)
    const isloading= useSelector(state => state.profileReducer.isloading)

    let count =0 ;
    let sum =0;
    let moy=0;
      for (let i = 0; i < rate.length; i++) {
        count=count+1
        sum=sum+rate[i].rating
      }
    
     moy=sum/count
    
  // if the component still loading
  if (isloading) {
    return (
      <div><Spinner animation="grow" /></div>
    );
   
    //if there is no profile in the response
  } else if (!profile) {
    return <h1>Oups !!!! 404 Not Fount :( </h1>;
  }
  // if evrything is OK show the component
  else
    return (
      <Container>
        <Jumbotron>
          <Row className="d-flex justify-content-center align-items-center">
            <p
              style={{
                width: "100px",
                height: "100px",
                fontSize: "1.5em"
              }}
              className="d-flex justify-content-center align-items-center mr-auto border rounded-circle text-light bg-info text-md"
            >
              {/* check if the user and the user.name  is truthy  */}
              {profile && profile.profileName && profile.profileName[0]}
            </p>
      
        <h1 className="display-3 col">{profile&&profile.profileName}</h1>
        
         <p className="text-center text-md-right" style= {{margintop:"2em"}}> CATEGORY: {profile&&profile.category}  ,</p>
        <p className="text-center text-md-right" style= {{margintop:"2em"}}>  DESCRIPTION: {profile&& profile.description}  , </p>
        <p className="text-center text-md-right" style= {{margintop:"2em"}}> ADRESS: {profile&&profile.adress}  , </p>
        <p className="text-center text-md-right" style= {{margintop:"2em"}}> CODEPOSTAL: {profile&&profile.codePostal}  , </p>
        <p className="text-center text-md-rightl" style= {{margintop:"2em"}}> PHONE-NUMBER: {profile&&profile.phoneNumber}  , </p>
        <p className="text-center text-md-right" style= {{margintop:"2em"}}>DIPLOMA: {profile&&profile.Diploma}  , </p>
       
       <StarRatingComponent name ="t" value={moy}/>
  
          <select className ="select-css"
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">   select rating  </option>
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                     
      <button className="btn btn-dark" onClick={addratee}>add</button>
      
      
  
      
      </Row>
        </Jumbotron>
      </Container>
    );
};

export default Profilefiche;
