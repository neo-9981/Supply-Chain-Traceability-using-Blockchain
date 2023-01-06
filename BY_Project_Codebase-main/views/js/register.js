$(document).ready( () => {
  
    $( "#form1" ).submit( (event) => {
      event.preventDefault();

      $.ajax({
        type: 'POST',
        url: '/reg',
        data: $('#form1').serialize(),
        dataType: "json",
        success: (response) => {
          //alert("a");
          //console.log(response.Success);

          if(response.Success=="Invalid Phone No!")
            alert("Invalid Phone No!");
          else
          {
          document.getElementById("check").innerHTML=response.Success;
                 //ADD THIS CODE
                 setTimeout( () => {
                   document.getElementById("check").innerHTML="";
                 },3000);
                 if (response.Success=="You are registered,You can login now.") {
                   document.getElementById("aa").click();
                 }
                 else {
                   alert(response.Success);
                 };
                }
               },
               error: () => {
                 console.log("Error occured");
                 alert("Error Occured");
               }
             })
    });
  });