import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import {getAnnoces ,addAnnoces,editAnnonce} from "../../js/action/AnnonceAction"
import AddAnnonces from "./AddAnnonces";
import AnnonceItem from "./AnnonceItem";

import {Spinner} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

 
function AnnoncesListe () {

   const [title, setTitle] = useState("");
   const [ typeTravaux, setTypeTravaux] = useState("");
   const [category, setCategory] = useState("");
   const [description, setDescription] = useState("");
   const [date, setDate] = useState("");
   const [id, setId] = useState(0)
   const [edit, setEdit] = useState(false)

   const dispatch = useDispatch();
   const annonces = useSelector((state) => state.annReducer.annonces);
   const { isLoading } = useSelector((state) => state.annReducer);
   const { user } = useSelector((state) => state.authReducer);
 


  useEffect(() => {
    dispatch(getAnnoces());
  }, []);

  const addannoncee = () => {

    if( (title.trim() !== "") &&(typeTravaux.trim() !== "") && (category.trim() !== "") && (description.trim() !== "") && (description.trim() !== "")){
    
    dispatch(addAnnoces({ title, typeTravaux, category,description,date }));
  
    setTitle('');
    setTypeTravaux('');
    setCategory('');
    setDescription('');
    setDate('');
    
  } else (alert("please fill in the fields!!"))
}
  const editAnnoncee=()=>{
    dispatch(editAnnonce(id,{id,title, typeTravaux, category,description,date}))
    setEdit(false)
    setTitle("")
    setTypeTravaux("")
    setCategory("")
    setDescription("")
    setDate("")
    setId(0)
  }
  const getAnnoncee=(annonce)=>{
    setTitle(annonce.title)
    setTypeTravaux(annonce.typeTravaux)
    setCategory(annonce.category)
    setDescription(annonce.description)
    setDate(annonce.date)
    setId(annonce._id)
    setEdit(true)

  }
  //spinner
  if (isLoading) {
    return <div><Spinner animation="grow" /></div>
    }
    return (
      (user.role=="artisan")?(
      <div>
       
        <div>
          <AddAnnonces title={title} typeTravaux={typeTravaux}category={category}description={description}date={date} 
          setTitle={setTitle} setTypeTravaux={setTypeTravaux} 
          setCategory={setCategory} setDescription={setDescription}setDate={setDate} 
          //addannoncee={addannoncee}
           action={edit? editAnnoncee : addannoncee }
         
          edit={edit} />

          </div>
   
  < div>
{ annonces.map((annonce,i)=>
    <AnnonceItem key ={i} annonce={annonce} getAnnoncee={getAnnoncee} />
)} 
    </div>
 
    </div>
    ):(  < div>
      { annonces.map((annonce,i)=>
          <AnnonceItem key ={i} annonce={annonce} getAnnoncee={getAnnoncee} />
      )} 
          </div>)
  
    )
}
export default AnnoncesListe
