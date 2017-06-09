
function submit() {
   var mytitle;
   var mycontent;
   var mydate=getTodayDate();
   var mywriter="";
   var myhashtag="";
   var myboardnum;
   var submitbutton = document.getElementById("submit");

	var myAddress = unescape(location.href);
	var parameters = (myAddress.slice(myAddress.indexOf("?")+1,myAddress.length));
	var parameter = (myAddress.slice(myAddress.indexOf("=")+1,myAddress.length));
	var email=document.getElementById("emailinfo").innerHTML;
    var i=0;
    var chance=0;

    var imageurl="";
    var vodurl="";
    var fileurl="";


    while(chance==0){
    	if(email[i] == "@") {
    		chance=1;
    	} else {
    	mywriter=mywriter+email[i];
    	i++;
    	}
    }

	
   //화면 값 불러오기 
   mytitle=document.getElementById("boardtitle").value;
   mycontent=CKEDITOR.instances.userwrite.getData();
   myhashtag=document.getElementById("hashtag").value;



   $(document).ready(function() {
   		$.ajax({
   			url: "https://evernote-9f6ec.firebaseio.com/boards/"+mywriter+"/boardnum.json",
   			method :"GET",
   			success : function(data) {

   				if(submitbutton.innerHTML=="확인") {
   					if(data==null) {
   						myboardnum=1;
   					} else {
   					myboardnum=data.length;
   					}
   				} else {
   					myboardnum=parameter;
   					imageurl = data[myboardnum].image;
	   				vodurl=data[myboardnum].vod;
 					fileurl=data[myboardnum].file;
   				}



				   var boardimage = document.getElementById("boardimage");
			     	var image = boardimage.files[0];
			  		if(image != undefined) {
				     	var userRef=firebase.storage().ref(mywriter+'/'+myboardnum+'/'+'image'+image);
							  
					   userRef.put(image).then(function(snapshot) {
								  imageurl=snapshot.downloadURL;

						


								   var userRef=firebase.database().ref('boards/'+ mywriter+'/boardnum/'+myboardnum);
								    var data={
								 	   	title : mytitle, content : mycontent, date : mydate, hashtag : myhashtag , image : imageurl, vod : vodurl, file : fileurl
									}

								   userRef.set(data);
								   alert("이미지 등록이 완료되었습니다");

								});

				 
					}
					
					var boardvod = document.getElementById("boardvod");
			     	var vod = boardvod.files[0];
			     	if(vod != undefined) {
						var userRef=firebase.storage().ref(mywriter+'/'+myboardnum+'/'+'vod');
						  
					   userRef.put(vod).then(function(snapshot) {
								  vodurl=snapshot.downloadURL;

								


								   var userRef=firebase.database().ref('boards/'+ mywriter+'/boardnum/'+myboardnum);
								    var data={
								 	   	title : mytitle, content : mycontent, date : mydate, hashtag : myhashtag , image : imageurl, vod : vodurl, file : fileurl
									}

								   userRef.set(data);
								    alert("동영상 등록이 완료되었습니다");
								  
								});


					}


					var boardfile = document.getElementById("boardfile");
			     	var file = boardfile.files[0];
			     	if(file != undefined) {
							var userRef=firebase.storage().ref(mywriter+'/'+myboardnum+'/'+'file');
						  
						   userRef.put(file).then(function(snapshot) {
								fileurl=snapshot.downloadURL;
								

								   var userRef=firebase.database().ref('boards/'+ mywriter+'/boardnum/'+myboardnum);
								    var data={
								 	   	title : mytitle, content : mycontent, date : mydate, hashtag : myhashtag , image : imageurl, vod : vodurl, file : fileurl
									}

								   userRef.set(data);
								    alert("파일 등록이 완료되었습니다");
							});

					}


			
			
				 

				    var userRef=firebase.database().ref('boards/'+ mywriter+'/boardnum/'+myboardnum);
					    var data={
					 	   	title : mytitle, content : mycontent, date : mydate, hashtag : myhashtag , image : imageurl, vod : vodurl, file : fileurl
						}

					userRef.set(data);

					var temp=myhashtag.split("#");
					for(var i=1;i<temp.length;i++) {
					reghashtag(mywriter,myboardnum,temp[i]);
					}



				   alert("정상적으로 등록되었습니다.이미지,파일,동영상을 등록했을 시 조금만 기다려주세요!");
   			}
   		});
   });








	
}

function getTodayDate(){
	  var date=new Date();
	  var year=date.getFullYear();
	  var month=""+(date.getMonth()+1);
	  var day=""+date.getDate();
	  if(month.length==1){
	    month="0"+month;

	  }
	  if(day.length==1){
	    day="0"+day;
	  }
	  var tmp=""+year+month+day;


	  //시간
	  myDate=new Date();
	  myH=myDate.getHours();
	  myMinute=myDate.getMinutes();
	  mySeconds=myDate.getSeconds();

	  tmp=tmp+myH+myMinute+mySeconds;
	  return tmp;
}


function reghashtag(mywriter,myboardnum,myhashtag) {
	var submitbutton = document.getElementById("submit");
	var result="#"+myboardnum;

		$.ajax({
   			url: "https://evernote-9f6ec.firebaseio.com/boards/"+mywriter+"/hashtag/"+myhashtag+".json",
   			method :"GET",
   			success : function(data) {
   				if(data != null) {
   				result=data.tagboardnum+"#"+myboardnum;
 				}

			    var data = {tagboardnum : result}

				$.ajax({
		   			url: "https://evernote-9f6ec.firebaseio.com/boards/"+mywriter+"/hashtag/"+myhashtag+".json",
		   			method :"PUT",
		   			data : JSON.stringify(data),
		   			success : function(data) {
					}
		   		});
			}
   		});


    
	
}


function init(writer) {
	var myAddress = unescape(location.href);
	var parameters = (myAddress.slice(myAddress.indexOf("?")+1,myAddress.length));
	var parameter = (myAddress.slice(myAddress.indexOf("=")+1,myAddress.length));
	var mywriter="";
	var submitbutton = document.getElementById("submit");
	myboardnum=parameter;
	

	var i=0;
    var chance=0;
    var myboardnum=0;

    while(chance==0){
    	if(writer[i] == "@") {
    		chance=1;
    	} else {
    	mywriter=mywriter+writer[i];
    	i++;
    	}
    }

	

	if(parameters=="") {

	} else {	
		$(document).ready(function() {
   		$.ajax({
   			url: "https://evernote-9f6ec.firebaseio.com/boards/"+mywriter+"/boardnum/"+parameter+".json",
   			method :"GET",
   			success : function(data) {
   			
   				$("#boardtitle").val(data.title);
   				$("#hashtag").val(data.hashtag);
   				$("#hashtag").val(data.hashtag);
   				submitbutton.innerHTML = "수정";
				CKEDITOR.instances.userwrite.setData(data.content);
				var myhashtag = data.hashtag.split("#");

				 for(var j=1;j<myhashtag.length;j++) {
		 
		    		delhashtag(myhashtag[j],mywriter,parameter);
		    	}

		    	

		
			}
   		});
	   });

	}
	
}	




function delhashtag(hashtag, mywriter, myboardnum) {
	var result="";
 $(document).ready(function() {
	   		$.ajax({

				url: "https://evernote-9f6ec.firebaseio.com/boards/"+mywriter+"/hashtag/"+hashtag+".json",
				   			method :"GET",
				   			success : function(data) {
				   				var temp = data.tagboardnum.split("#");
				   				for(var i=1;i<temp.length;i++) {
				   					if(temp[i]==myboardnum) {

							   					} else {
							   					result=result+"#"+temp[i];
							   				}
				   				}




				    	var userRef=firebase.database().ref('boards/'+ mywriter+'/hashtag/'+hashtag);
								    var data={
								 	   tagboardnum : result
									}

								userRef.set(data);



				 


			   			
			   			}
			   		});
		   });
}

