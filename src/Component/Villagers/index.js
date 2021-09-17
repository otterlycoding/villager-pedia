import React from 'react';
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import RenderSmoothImage from "../SmoothImgRender"
class Villagers extends React.Component{
	constructor(props){
		super(props);
		this.state={
			error: null,
			isLoaded: false,
			items: [],
			sort: "0",
			filters: {
				personality: null,
				gender: null,
				species: null,
				hobby: null
			},
			search: null
		};
	}
	
	componentDidMount(){
		fetch("https://acnhapi.com/v1/villagers/")
		.then(res => res.json())
		.then(
			(result) => {
				let villagerItems = [];
				var keys = Object.keys(result);
				for(let i of keys){
					var object = result[i];
					villagerItems.push(object);
				}
				this.setState({
					isLoaded: true,
					items: villagerItems
				});
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
	}
	
	sendData = (modalItem) =>{
		this.props.parentCallback(modalItem);
	}
	
	callbackFunction = (childData) => {
		this.sendData(childData);
	}
	
	selectSort = value =>{
		
		if(value === "0"){
			this.sortFileName();
		} else if(value === "1"){
			this.sortAlph();
		} else if(value === "2"){
			this.sortAlph(true);
		} else if(value === "3"){
			this.sortBirthday();
		} else if(value === "4"){
			this.sortBirthday(true);
		}
		this.setState({
			sort: value
		});
	}
	
	sortAlph = (rev) =>{
		let itemsCopy = [...this.state.items];
		itemsCopy.sort((a, b) => a.name["name-" + this.props.language].localeCompare(b.name["name-" + this.props.language]));
		if(rev != null){
			itemsCopy.reverse();
		}
		this.setState({items: itemsCopy});
	}
	
	sortFileName = () => {
		let itemsCopy = [...this.state.items];
		itemsCopy.sort((a, b) => a["file-name"].localeCompare(b["file-name"]));
		this.setState({items: itemsCopy});
	}
	
	sortBirthday = (rev) => {
		let itemsCopy = [...this.state.items];
		
		itemsCopy.sort((a, b) => {
			let aNums = Array.from(a.birthday.split('/').reverse(),Number);
			let bNums = Array.from(b.birthday.split('/').reverse(),Number);
			
			if(aNums[0] > bNums[0] || (aNums[0] === bNums[0] && aNums[1] > bNums[1])){
				return 1;
			} else if(aNums[0] < bNums[0] || (aNums[0] === bNums[0] && aNums[1] < bNums[1])){
				return -1;
			}
			return 0;
		});
		if(rev != null){
			itemsCopy.reverse();
		}
		this.setState({items: itemsCopy});
	}
	
	filterBy = (filterType,value) => {
		let newFilters = JSON.parse(JSON.stringify(this.state.filters));
		newFilters[filterType] = value === "" ? null : value;
		this.setState({
			filters: newFilters
		});
	}
	
	setLanguage = (value) => {
		this.props.callbackLanguage(value);
	}
	
	handleSearch = ({ target }) =>{
		this.setState({
			search: target.value
		});
	}
	
	render(){
		const { error, isLoaded, items, filters, search } = this.state;
		let filterValues = Object.values(filters);
		let filterKeys = Object.keys(filters);
		let villagerItems = [...items];

		const speciesList = [...new Set(items.map(item => item.species))].sort((a, b) => a.localeCompare(b));
		let speciesOptions = [];
		for(let i of speciesList){
			speciesOptions.push(<option key={i} value={i}>{i}</option>)
		}
								
		const personalityList = [...new Set(items.map(item => item.personality))].sort((a, b) => a.localeCompare(b));
		let personalityOptions = [];
		for(let i of personalityList){
			personalityOptions.push(<option key={i} value={i}>{i}</option>)
		}	
									
		const hobbyList = [...new Set(items.map(item => item.hobby))].sort((a, b) => a.localeCompare(b));
		let hobbyOptions = [];
		for(let i of hobbyList){
			hobbyOptions.push(<option key={i} value={i}>{i}</option>)
		}	
											
		if(!filterValues.every(o => o === null)){
			for(let i = 0; i < filterValues.length; i++){
				if(filterValues[i] !== null)
				{
					villagerItems = villagerItems.filter(v => v[filterKeys[i]] === filterValues[i]);
				}
			}
		}
		
		if(search){
			villagerItems = villagerItems.filter(v => v.name["name-" + this.props.language].toLowerCase().includes(search.toLowerCase()));
		}
		
			
		if (error) {
		  return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
		  return <div>Loading...</div>;
		} else {
		  return (
			  <div className="container">
				  <FloatingLabel controlId="floatingInput" label="Search" className="mb-3">
					<Form.Control type="text" value={this.state.search ?? ""} onChange={this.handleSearch}/>
				  </FloatingLabel>
			  	<div className="row">
			  		<div className="col-md mb-2">
			  			<FloatingLabel controlId="sortBySelect" label="Sort By">
						  <Form.Select aria-label="Sort by" onChange={(e) => this.selectSort(e.target.value)} value={this.state.sort}>
							<option value="0">Filename (A-Z)</option>
							<option value="1">A-Z</option>
							<option value="2">Z-A</option>
							<option value="3">Birthday Ascending</option>
							<option value="4">Birthday Descending</option>
						  </Form.Select>
						</FloatingLabel>
			  		</div>
			  		<div className="col-md mb-2">
						<FloatingLabel controlId="speciesFilter" label="Species">
						  <Form.Select aria-label="Filter by Species" onChange={(e) => this.filterBy("species",e.target.value)} value={this.state.filters.species ?? ""}>
							<option value="">All Species</option>
							{speciesOptions}
						  </Form.Select>
						</FloatingLabel>
					</div>
			  		<div className="col-md mb-2">
						<FloatingLabel controlId="personalityFilter" label="Personality">
						  <Form.Select aria-label="Filter by Personality" onChange={(e) => this.filterBy("personality",e.target.value)} value={this.state.filters.personality ?? ""}>
							<option value="">All Personalities</option>
							{personalityOptions}
						  </Form.Select>
						</FloatingLabel>
					</div>
					<div className="col-md mb-2">
						<FloatingLabel controlId="hobbyFilter" label="Hobby">
						  <Form.Select aria-label="Filter by Hobby" onChange={(e) => this.filterBy("hobby",e.target.value)} value={this.state.filters.hobby ?? ""}>
							<option value="">All Hobbies</option>
							{hobbyOptions}
						  </Form.Select>
						</FloatingLabel>
					</div>
					<div className="col-md-auto mb-2">
						<FloatingLabel controlId="langSetting" label="Language">
						  <Form.Select aria-label="Set Language" onChange={(e) => this.setLanguage(e.target.value)} value={this.props.language}>
							<option value="USen">English (US)</option>
							<option value="EUde">German</option>
							<option value="EUes">Spanish (Spain)</option>
							<option value="USes">Spanish (Mexico)</option>
							<option value="EUfr">French</option>
							<option value="EUit">Italian</option>
							<option value="EUnl">Dutch</option>
							<option value="CNzh">Simplified Chinese</option>
							<option value="TWzh">Traditional Chinese</option>
							<option value="JPja">Japanese</option>
							<option value="KRko">Korean</option>
							<option value="EUru">Russian</option>
						  </Form.Select>
						</FloatingLabel>
					</div>
			  	</div>
				<div className="villager-index pt-5 mt-5 border-top">
				{villagerItems.map((item,i) =>
		  			<Villager key={i} {...item} parentCallback = {this.callbackFunction} language = {this.props.language}/>
		  		)}
				</div>
			  </div>
		  );
		}
	}
}
	
class Villager extends React.Component{
	sendData = () =>{
		this.props.parentCallback(this.props);
	}
	
	render(){
		return(
		<div id={this.props.id} className={`villager-item ${this.props.species} ${this.props.personality}`} onClick={this.sendData}>
			<div>
				<RenderSmoothImage src={this.props.icon_uri} alt={this.props.name["name-" + this.props.language]} width="128" height="128"/>
			</div>
			<h3>{this.props.name["name-" + this.props.language]}</h3>
		</div>
		)
	}
}
export default Villagers;