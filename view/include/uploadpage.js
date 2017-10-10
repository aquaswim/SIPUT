$(document).ready(function(){
    $("#form-submit-assignment").submit(function(e){
      e.preventDefault();
      if(!ValidateForm()){
        Materialize.toast("Data belum lengkap.",1000);
        return false;
      }
      $("#loading").show();
      Materialize.toast("Mengumpulkan pekerjaan anda.",1000);
      $(this).ajaxSubmit({
        success:function(data){
          console.log(data);
          $("#loading").hide();
          Materialize.toast("Tugas telah terkumpul");
          location.reload();
        },
        error:function(){
          $("#loading").hide();
          Materialize.toast("Error",1000);
        } 
      });
      return false;
    });
  });
  function ValidateForm(){
    for (var i = 0; i < $(".validate").length; i++) {
      if($(".validate")[i].value===""){
        return false;
      }
    }
    return true;
  }