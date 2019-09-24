import React from "react";

const Form = props => (
	<form onSubmit={props.getNews}>
		<input type="text" name="country" placeholder="Your query..."/>
		{props.querySubmitted ? <button className="btnDelete">Delete</button> : <button className="btnGetNews">Get News</button>}
	</form>
);

export default Form;