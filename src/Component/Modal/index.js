import React from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from 'react-bootstrap/CloseButton'
import RenderSmoothImage from "../SmoothImgRender"
function VillagerModal(props){
	if(props.showModal){
		return (
    <>
      <Modal show={props.showModal} onHide={props.handleClose} size="lg" centered>
			<Modal.Header closeButton>
				<div className="bubble-title" style={{backgroundColor: props.modalInfo["bubble-color"]}}>
					<Modal.Title as="h2" style={{color: props.modalInfo["text-color"]}}>{props.modalInfo.name["name-" + props.language]}</Modal.Title>
				</div>
			</Modal.Header>
			<Modal.Body>
				<div className="row justify-content-between">
					<div className="col-md-4 d-md-block d-none">
						<RenderSmoothImage src={props.modalInfo.image_uri} alt={props.modalInfo.name["name-" + props.language]} className="img-thumbnail mb-3 villager-thumbnail" width="256" height="256"/>
						<q className="d-block text-center mb-4 fst-italic">{props.modalInfo.saying}</q>
					</div>
					<div className="col-md-7 col-12">
						<dl>
							<dt>Species</dt>
							<dd>{props.modalInfo.species}</dd>
							<dt>Personality</dt>
							<dd>{props.modalInfo.personality}</dd>
							<dt>Birthday</dt>
							<dd>{props.modalInfo["birthday-string"]}</dd>
							<dt>Catchphrase</dt>
							<dd>{props.modalInfo["catch-translations"]["catch-" + props.language]}</dd>
							<dt>Hobby</dt>
							<dd>{props.modalInfo.hobby}</dd>
						</dl>	
					</div>
				</div>
			</Modal.Body>
      </Modal>
    </>
  );
	}
	else{
		return null;
	}
	
}

export default VillagerModal