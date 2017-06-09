

function sign() {
	//console.log("sign btn");
	var email=document.getElementById("userid").value;
	var password=document.getElementById("userpassword").value;

	//console.log(email);
	//console.log(password);

	firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
		alert("가입되었습니다");
	 }, function(error) {
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  
		  if (errorCode == 'auth/weak-password') {
		    alert('비밀번호는 최소 6글자 입니다.');
		  } 
		  else if (errorCode == 'auth/invalid-email') {
		  	alert('email 형식을 확인해 주세요');
		  }

		   else {
		    alert(errorMessage);
		  }
	});
}

function confirm() {

	var email=document.getElementById("userid").value;
	var password=document.getElementById("userpassword").value;


	 firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
	 	window.location.href = "main.html";
	 }, 
	 	function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...

	  alert(errorMessage);
	});

}