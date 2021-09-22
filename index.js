const express = require('express');
const {check , validationResult} = require("express-validator");
const app = express();
const port = 3001;
const path = require('path');
const bodyParser = require("body-parser");
let urlencoded = bodyParser.urlencoded({extended:false});


app.use(bodyParser.json());
app.use(urlencoded);
app.use(express.static(__dirname +'/public'));

app.get("/",(req,res)=>{
	res.sendFile(path.join((__dirname+'/index.html')));
});

app.post('/formData', [
	check("name")
	.not().isEmpty().withMessage("Name should not be empty.")
	.isLength({ min: 5 }).withMessage("Name should be at least 5 character."),
	check("email")
	.not().isEmpty().withMessage("Email should not be empty.")
	.isEmail().withMessage("Not a valid email."),
	check("number")
	.not().isEmpty().withMessage("Number should not be empty.")
	.isNumeric().withMessage("Number should be numeric."),
	check("gender")
	.custom((value)=>{
		if (value =="Male" || value =="Female" || value =="Others"){
			return true
		}
		else{
			throw new Error('Gender must be male, female or others.');
		}
		
		
	}),
	check("hobby")
	.not().isEmpty().withMessage("Select at least one hobby.")

	],(req,res)=>{
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(422).json({
				errors:errors.array()
			});
		}
		
		res.status(202).json({
			sucess:"Form is okay"
		})

});

app.listen(port,()=>{
	console.log(`Server is running on:http://localhost:${port}`);
});



