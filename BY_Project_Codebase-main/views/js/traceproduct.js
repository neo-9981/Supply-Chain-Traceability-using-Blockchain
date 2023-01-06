$(document).ready( () => {

    $( "#trace-form" ).submit( (event) => {
      event.preventDefault();

      $.ajax({
        type: 'POST',
        url: '/traceproduct',
        contentType: 'application/json',
        data: JSON.stringify({
          "stream": "product",
          "key": $("#product_ID").val(),
          "data":{
            "json": {
              "ID" : $("#product_ID").val(),
              "stream" : "product"
            }
          }
        }),
        success: (response) => {
          /*
          document.getElementById("check").innerHTML=response.Success;
          setTimeout( () => {
          document.getElementById("check").innerHTML="";
          },3000);
          if (response.Success=="Product Registered !!") {
            document.getElementById("aa").click();
          }
          */
         if(response.ID === undefined){
            // document.getElementById("details").innerText = "";
            document.getElementById("ID").innerText = "";
            document.getElementById("Name").innerText = "";
            document.getElementById("Quantity").innerText = "";
            document.getElementById("Price").innerHTML = "";
            document.getElementById("check").innerHTML = "Incorrect Product Code";
            document.getElementById("Description").innerHTML = "";
            document.getElementById("Manufacturer_Name").innerHTML = "";
            document.getElementById("Location").innerHTML = "";
            document.getElementById("hide").style.visibility="hidden";
            document.getElementById("man").style.visibility="hidden";
            document.getElementById("dis").style.visibility="hidden";
            document.getElementById("tra").style.visibility="hidden";
            document.getElementById("dist").style.visibility="hidden";
            document.getElementById("who").style.visibility="hidden";
            document.getElementById("ret").style.visibility="hidden";
            document.getElementById("Expdate").innerHTML = "";
         
         }
         else{
           console.log(response);
          // document.getElementById("hide").style.visibility="visible";
         $('#hide').addClass("d-block");
          document.getElementById("check").innerHTML = "";
         document.getElementById("ID").innerText = "Product ID: " + response.ID;
         document.getElementById("Name").innerText = "Product Name: " + response.Name;
         document.getElementById("Quantity").innerText = "Product Quantity: " + response.Quantity + " Kg";
         document.getElementById("Price").innerHTML = "Product Price: " + response.Price;
         document.getElementById("Expdate").innerHTML = "Expiry Date: " + response.Expiry_Date;
         document.getElementById("Description").innerHTML = "Description: " + response.Description;
         document.getElementById("Location").innerHTML = "Current Location: " + response.Location;
         document.getElementById("manname").innerHTML = "Manufacturer Name: " + response.Manufacturer_Name;


         

         if(response.Manufacturer){
          $('#man').addClass("d-block");
          document.getElementById("man").style.visibility="visible";
          // document.getElementById("Man-id").innerText = "1";
          document.getElementById("Manufacturer").innerText = response.Manufacturer;
          // document.getElementById("Man-stat").innerText = ;
         }
         if(response.Dispatcher){
          $('#dis').addClass("d-block");
          document.getElementById("dis").style.visibility="visible";
          // document.getElementById("Disp-id").innerText = "2";
          document.getElementById("Dispatcher").innerText = response.Dispatcher +" With Vehicle No "+response.VehicleNo + " Of Agency "+ response.Agency ;
          // document.getElementById("Disp-stat").innerText = response.Dispatcher;
         }
         if(response.Transporter){
          $('#tra').addClass("d-block");
          document.getElementById("tra").style.visibility="visible";
          // document.getElementById("Trans-id").innerText = "3";
          document.getElementById("Transporter").innerText = response.Transporter ;
          // document.getElementById("Trans-stat").innerText = response.Transporter;
         }
         if(response.Distributor){
          $('#dist').addClass("d-block");
          document.getElementById("dist").style.visibility="visible";
          // document.getElementById("Distri-id").innerText = "4";
          document.getElementById("Distributor").innerText = response.Distributor;
          // document.getElementById("Distri-stat").innerText = response.Distributor;
         }
         if(response.Wholesaler){
          $('#who').addClass("d-block");
          document.getElementById("who").style.visibility="visible";
          // document.getElementById("Whole-id").innerText = "5";
          document.getElementById("Wholesaler").innerText = response.Wholesaler;
          // document.getElementById("Whole-stat").innerText = response.Wholesaler;
         }
         if(response.Retailer){
          $('#ret').addClass("d-block");
          document.getElementById("ret").style.visibility="visible";
          // document.getElementById("Retail-id").innerText = "6";
          document.getElementById("Retailer").innerText = response.Retailer;
          // document.getElementById("Retail-stat").innerText = response.Retailer;
         }
        //  document.getElementById("details").innerHTML="Timeline:" +response.<%=name%>
         }
         
        },
        error: () => {
          console.log("Error occurred");
          alert("Error occured while processing your request.");
        }
      })
    });
  });

  