import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import {Link,Route} from "react-router-dom"
import { Container, Row, Jumbotron } from "reactstrap";
import {Spinner} from "react-bootstrap"
import {getcurrentprofile,clearCurrentProfile} from "../../js/action/profileactions"





const Dashboard = ({profile,getprofilee}) => {
 
  const user =useSelector((state)=>state.authReducer.user)
  const isloading =useSelector((state)=>state.profileReducer.isloading)
  const dispatch = useDispatch();
  const history=useHistory()
  const getProfile = () => dispatch(getcurrentprofile());
    
  useEffect(() =>{
        
    (getProfile())
     
  },[]);
 
  const deleteprofilee=()=>{
    dispatch(clearCurrentProfile(profile._id))
  }
     
    
     
  if (isloading) {
    return <div><Spinner animation="grow" /></div>
    }
 
  return (
    ( profile ===null )?(  
      <div>
           
           <div className="titleNAME">
      {user.firstName} {user.lastName} : {user.email}
      </div>
      <Link to="/profileform"><button className="btnp">create profile</button></Link>
               
                  </div>
      ):(
        
       
        <Container>
        <Jumbotron>
          <Row className="d-flex justify-content-center align-items-center">
            <p
              style={{
                width: "80px",
                height: "80px",
                fontSize: "1.5em"
              }}
              className="d-flex justify-content-center align-items-center mr-auto border rounded-circle text-light bg-info text-md"
            >
              
              {profile && profile.profileName && profile.profileName[0]}
            </p>
       <h1 className="display-3 col">{profile&&profile.profileName}</h1>

        <p className="text-center text-md-right" style= {{margintop:"2em"}}> CATEGORY: {profile&&profile.category}  ,</p>
       <p className="text-center text-md-right" style= {{margintop:"2em"}}>  DESCRIPTION: {profile&& profile.description}  ,</p>
       <p className="text-center text-md-right" style= {{margintop:"2em"}}> ADRESS: {profile&&profile.adress}  , </p>
       <p className="text-center text-md-right" style= {{margintop:"2em"}}> CODEPOSTAL: {profile&&profile.codePostal}  ,</p>
       <p className="text-center text-md-rightl" style= {{margintop:"2em"}}> PHONE-NUMBER: {profile&&profile.phoneNumber}  ,</p>
       <p className="text-center text-md-right" style= {{margintop:"2em"}}>DIPLOMA: {profile&&profile.Diploma}  , </p>
        <Link to="/dashboard"><button type="submit" className="btn btn-success" onClick={()=>deleteprofilee()}>Delete</button></Link >
        <Link to="/profileform"><button  className="btn btn-success" onClick={()=> getprofilee(profile)}>Edit</button></Link>
           
        </Row>
        </Jumbotron>
      </Container>
           
 
       
      )
 
  )
};
export default Dashboard;