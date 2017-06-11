
function show(value) {

	//document.getElementsByClass("container");



	var email=value;
    var i=0;
    var chance=0;
    var mywriter="";
   
    
    while(chance==0){
    	if(email[i] == "@") {
    		chance=1;
    	} else {
    	mywriter=mywriter+email[i];
    	i++;
    	console.log(email[i]);
    	}
    }


    $(document).ready(function() {
         $(window).on("scroll", function() {
            var scrollHeight=$(window).scrollTop() +$(window).height();
            var documentHeight=$(document).height();

            if(scrollHeight == documentHeight) {
               //appendP(16,mywriter);
            }
         });

         appendP(1,mywriter);
      });

}

function appendP(num,mywriter) {
	
	$(document).ready(function() {
	   		$.ajax({

				url: "https://evernote-9f6ec.firebaseio.com/boards/"+mywriter+"/boardnum.json",
				   			method :"GET",
				   			success : function(data) {
				   				

				   				for(var i=data.length-1;i>0;i--) {
				   					if(data[i]==null) {

				   					} else {
				   					

				   					 var board = document.createElement("div");
								            board.setAttribute("class","board");
								            
								            var p = document.createElement("p");
								            var buttonmodify = document.createElement("button");
								            var buttonmodifytext = document.createTextNode("수정");
											buttonmodify.appendChild(buttonmodifytext);
								            buttonmodify.setAttribute("class","col-xs-1 col-xs-offset-10 col-md-1 col-md-offset-10 detail");
								            buttonmodify.setAttribute("id",i);
								            buttonmodify.onclick=function(i) {
								            	modify(i);
								            }


											var buttondelete = document.createElement("button");
								            var buttondeletetext = document.createTextNode("삭제");
														buttondelete.appendChild(buttondeletetext);
								            buttondelete.setAttribute("class","col-xs-1 col-md-1 detail");
								            buttondelete.setAttribute("id",i);
								            buttondelete.onclick = function(i) {
								            	remove(i);
								            }
								            
								            p.appendChild(buttonmodify);
								            p.appendChild(buttondelete);
								            board.appendChild(p);


								            var ptitle = document.createElement("p");
								            var ptitletext = document.createTextNode("제목 : "+data[i].title);
								            ptitle.appendChild(ptitletext);
								            ptitle.setAttribute("class","title");

								            board.appendChild(ptitle);



								            var phashtag = document.createElement("p");
								            var phashtagtext = document.createTextNode("해시태그 : "+data[i].hashtag);
								            phashtag.appendChild(phashtagtext);
								            phashtag.setAttribute("class","hashtag");
								            phashtag.setAttribute("id","hashtag"+i);

								            board.appendChild(phashtag);

									          var pcontent = document.createElement("p");
                             pcontent.innerHTML = "본문 : "+data[i].content;
                             pcontent.setAttribute("class","content");
                             board.appendChild(pcontent);


                          

                             if(data[i].image != "") {
                              var pimageupper = document.createElement("p");
                              var pimage= document.createElement("img");
                              //pimage.style("width","400px");
                              pimage.setAttribute("src",data[i].image);
                              pimage.setAttribute("width","200px");
                              pimageupper.appendChild(pimage);
                              board.appendChild(pimageupper);
                             }


                             if(data[i].vod != "") {
                              var pvodupper = document.createElement("p");
                              var pvod= document.createElement("video");
                              var psource = document.createElement("source");
                               pvod.setAttribute("controls","");
                               pvod.setAttribute("width","200px");
                              psource.setAttribute("src",data[i].vod);
                                  psource.setAttribute("type","video/mp4");
                              pvod.appendChild(psource);
                              pvodupper.appendChild(pvod);
                                board.appendChild(pvodupper);
                      		   }




                      		 if(data[i].file != "") {
                             var pfileupper = document.createElement("p");
                             var pfile= document.createElement("a");
                              pfile.setAttribute("href",data[i].file);
                          	  pfile.innerHTML="파일";
                             pfileupper.appendChild(pfile);
                             //pvod.setAttribute("width","500px");
                             board.appendChild(pfileupper);
                         	}

											  $(".container").append(board);

										


								       
								           

				   				}


			   			}
			   			}
			   		});
		   });

}





function modify(event) {
	
		var boardnum=event.toElement.id;
		

		 var mywriter="";
		 var email=document.getElementById("emailinfo").innerHTML;
    var i=0;
    var chance=0;


    console.log()

    //var hashtag = document.getElementById("hashtag"+boardnum).innerHTML;
    //var hashtagtemp = hashtag.split("#");
  

    while(chance==0){
    	if(email[i] == "@") {
    		chance=1;
    	} else {
    	mywriter=mywriter+email[i];
    	i++;
    	}
    }
  
				   			window.location.href="write.html?boardnum="+boardnum;

		


}



function remove(event){
  
		var boardnum=event.toElement.id;
	


   var mywriter="";
		 var email=document.getElementById("emailinfo").innerHTML;
    var i=0;
    var chance=0;

    var hashtag = document.getElementById("hashtag"+boardnum).innerHTML;
    var hashtagtemp = hashtag.split("#");
  

    while(chance==0){
    	if(email[i] == "@") {
    		chance=1;
    	} else {
    	mywriter=mywriter+email[i];
    	i++;
    	}
    }

    for(var j=1;j<hashtagtemp.length;j++) {
    	
    		delhashtag(hashtagtemp[j],mywriter,boardnum);
    }



	


		$(document).ready(function() {
	   		$.ajax({

				url: "https://evernote-9f6ec.firebaseio.com/boards/"+mywriter+"/boardnum/"+boardnum+".json",
				   			method :"DELETE",
				   			success : function(data) {
				   				alert('삭제되었습니다');
				   				window.location.href = "main.html";

				 


			   			
			   			}
			   		});
		   });



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


function search() {
	var search = document.getElementById("usersearch").value;


	var mywriter="";
  var i=0;
  var chance=0;   
	var email=document.getElementById("emailinfo").innerHTML;

  var i=0;
  var chance=0;

  while(chance==0){
  	if(email[i] == "@") {
  		chance=1;
  	} else {
  	mywriter=mywriter+email[i];
  	i++;
  	}
  }



	$(document).ready(function() {
	   		$.ajax({

				url: "https://evernote-9f6ec.firebaseio.com/boards/"+mywriter+"/hashtag/"+search+".json",
				   			method :"GET",
				   			success : function(data) {
				   				     if(data==null){

                                        alert("존재하지 않습니다.");
                                      } else {
											   				var tagboardnum=data.tagboardnum;
											   				var tagboardtemp=tagboardnum.split("#");

                 


                     $(document).ready(function() {
                     $.ajax({

                     url: "https://evernote-9f6ec.firebaseio.com/boards/"+mywriter+"/boardnum.json",
                                 method :"GET",
                                 success : function(data) {

                                    for(var i=1;i<tagboardtemp.length;i++){
                                      
                                         var tempnum=tagboardtemp[i];

                                      if(data==null){

                                      }
                                      else{

              
                                           var board = document.createElement("div");
															            board.setAttribute("class","board");
															            
															            var p = document.createElement("p");
															            var buttonmodify = document.createElement("button");
															            var buttonmodifytext = document.createTextNode("수정");
																					buttonmodify.appendChild(buttonmodifytext);
															            buttonmodify.setAttribute("class","col-xs-1 col-xs-offset-10 col-md-1 col-md-offset-10 detail");
															            buttonmodify.setAttribute("id",tempnum);
															            buttonmodify.onclick=function(tempnum) {
															            	modify(tempnum);
															            }


																				  var buttondelete = document.createElement("button");
															            var buttondeletetext = document.createTextNode("삭제");
																					buttondelete.appendChild(buttondeletetext);
															            buttondelete.setAttribute("class","col-xs-1 col-md-1 detail");
															            buttondelete.setAttribute("id",tempnum);
															            buttondelete.onclick = function(tempnum) {
															            	remove(tempnum);
															            }
															            
															            p.appendChild(buttonmodify);
															            p.appendChild(buttondelete);
															            board.appendChild(p);


															            var ptitle = document.createElement("p");
															            var ptitletext = document.createTextNode("제목 : "+data[tempnum].title);
															            ptitle.appendChild(ptitletext);
															            ptitle.setAttribute("class","title");

															            board.appendChild(ptitle);

															             var phashtag = document.createElement("p");
																            var phashtagtext = document.createTextNode("해시태그 : "+data[tempnum].hashtag);
																            phashtag.appendChild(phashtagtext);
																            phashtag.setAttribute("class","hashtag");
																            phashtag.setAttribute("id","hashtag"+tempnum);

																            board.appendChild(phashtag);



															            var pcontent = document.createElement("p");
															           	pcontent.innerHTML=data[tempnum].content;
															            pcontent.setAttribute("class","content");

															            board.appendChild(pcontent);



                           if(data[tempnum].image != "") {
                            var pimageupper = document.createElement("p");
                            var pimage= document.createElement("img");
                            pimage.setAttribute("src",data[tempnum].image);
                            pimage.setAttribute("width","200px");
                            pimageupper.appendChild(pimage);
                            board.appendChild(pimageupper);
                           }


                           if(data[tempnum].vod != "") {
                            var pvodupper = document.createElement("p");
                            var pvod= document.createElement("video");
                            var psource = document.createElement("source");
                             pvod.setAttribute("controls","");
                             pvod.setAttribute("width","200px");
                            psource.setAttribute("src",data[tempnum].vod);
                                psource.setAttribute("type","video/mp4");
                            pvod.appendChild(psource);
                            pvodupper.appendChild(pvod);
                            board.appendChild(pvodupper);
                    		   }



                    		 if(data[tempnum].file != "") {
                           var pfileupper = document.createElement("p");
                           var pfile= document.createElement("a");
                            pfile.setAttribute("href",data[tempnum].file);
                        	  pfile.innerHTML="파일";
                           pfileupper.appendChild(pfile);
                           board.appendChild(pfileupper);
                       	}






															            $(".container").append(board);

                                      }

                                       

                                 }
                                 }
                              });
                     });

}


}
          });
                     });
}



