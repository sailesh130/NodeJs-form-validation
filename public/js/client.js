let form = document.querySelector('form');

form.onsubmit = sendData;

function sendData(e){
	e.preventDefault();
	document.querySelector(".errors").innerHTML="";
	let formData = new FormData(form);
	
	let Params = {
		headers:{
			'Content-Type':"application/json"
		},
		body:JSON.stringify({
			name : formData.get("name"),
			email : formData.get("email"),
			number : formData.get("number"),
			gender:formData.get("gridRadios"),
			hobby:formData.getAll("gridCheck"),

		}),
		method : "POST"
	}

	fetch("http://localhost:3001/formData",Params)
	.then(response => response.json())
	.then(data =>{
		
		let error = document.querySelector(".errors");
		if(data.errors){
			data.errors.forEach(function(err){
			error.innerHTML += `<li class="alert alert-warning" role="alert">${err.msg}</li>`
		});
		}
		else if(data.sucess){
			error.innerHTML += `<li class="alert alert-success" role="alert">${data.sucess}</li>`
			
		}
		
	})
	.catch(err=> console.log(err))
}