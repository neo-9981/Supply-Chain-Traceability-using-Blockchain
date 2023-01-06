var currentdate = new Date();
            
           
$(document).ready( () => {

  var datetime = currentdate.getDate() + "/"
  + (currentdate.getMonth()+1)  + "/"
  + currentdate.getFullYear() + " @ "
  + currentdate.getHours() + ":"
  + currentdate.getMinutes() + ":"
  + currentdate.getSeconds();

  // $('#role-select').blur((event) => {
  //   var e = document.getElementById("role-select");
  //   var strUser = e.value;
  //   if(strUser == "2"){
  //     $('#carno').addClass('d-block');
  //     $('#aname').addClass('d-block');
  //   }
  // });
  $( "#update-form" ).submit( (event) => {
    event.preventDefault();
    var send= datetime + " : " + "Product transferred to " + $("#Name").val() + " with Mobile Number: " + $("#Mobile-Number").val();
    var objj={};
    var aa='Dispatcher';
    
    var Manufacturer=0,Dispatcher=0,Distributor=0,Wholesaler=0,Transporter=0,Retailer=0;
    <%=  role %>=<%=  role %>+1;
    if(Dispatcher!=1)
    {
      objj = {
            "ID" : $("#product_id").val(),
            <%=  role %> : send,
            "Owner": $("#Email-ID").val(),
            "NextAddress":$("#nextaddress").val()          
    };
  }
  else{
    objj ={
            "ID" : $("#product_id").val(),
            <%=  role %> : send,
            "Owner": $("#Email-ID").val(),
            "VehicleNo":$("#carno").val(),
            "Agency":$("#aname").val(),
            "Location":$("#nextaddress").val()
    };
  }

    // var param= ;
    $.ajax({
      type: 'POST',
      url: '/updatestatus',
      contentType: 'application/json',
      data: JSON.stringify({
        "stream": "product",
        "key": $("#product_id").val(),
        "data":{
          "json": objj
        }
      }),
      success: (response) => {
        console.log(response);
        if(response.Success=="Not Allowed !!")
          alert("Not Allowed !!");
          else{
        document.getElementById("check").innerHTML=response.Success;

        setTimeout( () => {
        document.getElementById("check").innerHTML="";
        },3000);
        if (response.Success=="Product Registered !!") {
          document.getElementById("aa").click();
        }
      }
      },
      error: () => {
        console.log("Error occured while processing your request.");
        alert("Error occured while processing your request.Error occured while processing your request.");
      }
    })
  });
});

$(document).ready( () => {
        
    $( "#Email-ID" ).blur( (event) => {
      event.preventDefault();
      $.ajax({
        type: 'POST',
        url: '/fetchdata',
        contentType: 'application/json',
        data: JSON.stringify({ 
          "email":$("#Email-ID").val()
        }),           
        success: (response) => {
          console.log(response.Success);
          if(response.Success=="This Email Is not registered!")
            alert("This Email Is not registered!");
            else{
              
          document.getElementById("Name").value=response.Success.Name;
          document.getElementById("Mobile-Number").value=response.Success.phoneno;
          document.getElementById("role-select").value=response.Success.role;
          if(response.Success.role=="Transporter");
          {
            $('#carno').addClass('d-block');
            $('#aname').addClass('d-block');
          }
          
        }
        },
        error: () => {
          console.log("Error occured while processing your request.");
          alert("Error occured while processing your request.");
        }
      })
    });
  });