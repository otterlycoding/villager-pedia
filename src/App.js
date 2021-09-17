import React, {useState} from "react";
import VillagerModal from "./Component/Modal";
import Villagers from "./Component/Villagers";
import './App.css';


function App() {
	const [modalInfo,setModalInfo] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [language, setLanguage] = useState("USen");
	
	const handleClose = () =>{
		setShowModal(false);
	}
	const handleShow = () => {
		setShowModal(true)					 
 	};
	
	const callbackFunction = (childData) => {
		setModalInfo(childData);
		handleShow();
	}
	
	const callbackLanguage = (lang) => {
		setLanguage(lang);
	}
	
  	return (
    	<div className="App pt-5">
			<h1 className="text-center display-3 mb-5">ACNH Villagerpedia</h1>
			<VillagerModal showModal={showModal} handleClose={handleClose} modalInfo={modalInfo} language={language}/>
	  		<Villagers parentCallback = {callbackFunction} language={language} callbackLanguage={callbackLanguage}/>
    	</div>
  	);
}

export default App;
