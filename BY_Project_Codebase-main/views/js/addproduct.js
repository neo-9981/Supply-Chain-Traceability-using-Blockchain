$(document).ready( () => {

    $( "#add-form" ).submit( (event) => {

      event.preventDefault();
      // var namee= <%=name%>;
      $.ajax({
        type: 'POST',
        url: '/addproduct',
        contentType: 'application/json',
        data: JSON.stringify({
          "stream": "product",
          "key": $("#product_id").val(),
          "data": {
            "json": {
              "ID" : $("#product_id").val(),
              "Name" : $("#product_Name").val(),
              "Quantity" : $("#product_quantity").val(),
              "Price":$("#product_price").val(),
              "Owner": $("#owner-name").html(),
              "Expiry_Date":$("#exp_date").val(),
              "Description":$("#desc").val(),
              "Manufacturer_Name":$("#my_Name").val()
            }
          }
        }),
        success: (response) => {
          //console.log(response);
          document.getElementById("check").innerHTML=response.Success;
          alert(response.Success);
          setTimeout( () => {
          document.getElementById("check").innerHTML="";
          },3000);
          if (response.Success=="Product Added !!") {
            document.getElementById("aa").click();
          }
        },
        error: () => {
         // console.log("Error occured while processing your request.");
          alert("Error occured while processing your request");
        }
      })
    });
  });