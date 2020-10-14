import React from 'react'
import {useDispatch} from "react-redux"
import {deleteAnnonce} from "../../js/action/AnnonceAction"



function AnnonceItem({annonce ,getAnnoncee}) {
    const dispatch = useDispatch()
    const deleteAnnoncee=()=>{
        dispatch(deleteAnnonce(annonce._id))
    }
    
    return (
        
<div className="container-fluid">
  <div className="row content">


    <div className="col-sm-9">
      <hr/>
      <h2>{annonce && annonce.title}</h2>
      <h5><span className="glyphicon glyphicon-time"></span> {annonce && annonce.date}.</h5>
    <h5><span className="label label-success">{annonce && annonce.typetravaux}</span></h5><br/>
    <h5><span className="label label-success">{annonce && annonce.category}</span></h5><br/>
      <p className="text-pr">{annonce && annonce.description}</p>
      <hr/>
      <div role="form">
      <button type="submit" className="btn btn-success" onClick={deleteAnnoncee}>Delete</button>
        <button type="submit" className="btn btn-success" onClick={()=>getAnnoncee(annonce)}>Edit</button>
      </div>
      <br/><br/>
      <div className="row">
        <div className="col-sm-2 text-center">
        </div>
      </div>
    </div>
  </div>
</div>

 
 
    )
}

export default AnnonceItem
