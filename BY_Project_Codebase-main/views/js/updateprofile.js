$(document).ready(() => {
    $("#form2").submit((event) => {
      event.preventDefault();
      
      $.ajax({
        type: 'POST',
        url: '/updateprofile',
        data: $('#form2').serialize(),
        dataType: "json",
        success: (response) => {
          
          if(response.Success=="Invalid Phone No!" || response.Success=="Invalid Alternate Phone No!")
            alert(response.Success);
          else
          {
          $('#form2')[0].reset();
         
          document.getElementById("check").innerHTML = response.Success;

          setTimeout(() => {
            document.getElementById("check").innerHTML = "";
          }, 3000);
          if (response.Success == "Details Updated!") {
            document.getElementById("aa").click();
          }
          else {
              alert(response.Success);

          };
        }
        },
        error: () => {
        }
      })
    });

  });