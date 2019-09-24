import React from "react";

const News = props => (
	<div className="news__info">
	 {	
	 	props.city && props.country && <p className="news__key"> Location: 
	 		<span className="news__value"> { props.city }, { props.country }</span>
	 	</p> 
	 }
	 { 	
	 	props.temperature && <p className="news__key"> Temperature: 
	 		<span className="news__value"> { props.temperature }	</span>
	 	</p> 
	 }
	 { 	
	 	props.humidity && <p className="news__key"> Humidity: 
	 		<span className="news__value"> { props.humidity } </span>
	 	</p> 
	 }
	 { 	
	 	props.description && <p className="news__key"> Conditions: 
	 		<span className="news__value"> { props.description } </span>
	 </p> 
	 }
	 { 
	 	props.error && <p className="news__error">{ props.error }</p>  
	 }
	</div>
);

export default News;