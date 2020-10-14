import React,{useEffect} from 'react'
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from 'react-redux'
import StarRatingComponent from 'react-star-rating-component';
import {getrate,addrate} from "../../js/action/rateAction"

function ListCard({profile: { category,codePostal,_id }}) {

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getrate())
},[])

  const rates=useSelector(state=>state.rateReducer.rates)
  const rate=rates.filter(e=>e.profile== _id)

  let count =0 ;
    let sum =0;
    let moy=0;

      for (let i = 0; i < rate.length; i++) {
        count=count+1
        sum=sum+rate[i].rating
      }
    
     moy=sum/count

    return (
 <div className= "cardP">      
 <div className="card" >
 <StarRatingComponent name ="t" value={moy}/>
 <img className="img" alt="Profile Picture" src="https://previews.123rf.com/images/jemastock/jemastock1709/jemastock170909982/85612118-travailleur-de-r%C3%A9paration-ou-avatar-bricoleur-avec-bras-crois%C3%A9s-ic%C3%B4ne-image-vector-illustration-design.jpg" />
 <p   style={{color: "black"}}>{category}</p>
  <p  style={{color: "black"}}>{codePostal}</p>
 <button className=" button-1"><Link to={`/profilefiche/${_id}`}>view profil</Link></button>
</div> 
</div>
      
    )
}
export default ListCard


                    
