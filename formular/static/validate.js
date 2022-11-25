$(document).ready(function() {
    $("#regform").submit(function(e){

      var vyplnenyNick = $("#nick").val();
      var vyplnenyKamos = $("#kanoe_kamarad").val();
      var jePlavec = $("input[name='je_plavec']:checked").val()

      console.log(jePlavec == 0);
      if(vyplnenyNick.length <2){
        alert("Přezdívka musí být delší než 2 znaky");
        $("#nick").css("background-color", "red");
        return false;
      }else if(vyplnenyNick.length >20){
        alert("Přezdívka nesmí být delší než 20 znaků");
        $("#nick").css("background-color", "red");
        return false;
      }else if(jePlavec == 0){
        alert("Je nám líto, ale z bezpečnostních důvodů je kurz pouze pro plavce. O této informaci doporučujeme nelhat");
        return false;
      }else if(vyplnenyKamos != ""){
        if(vyplnenyKamos.length <2){
            alert("Přezdívka kamaráda musí být delší než 2 znaky");
            $("#kanoe_kamarad").css("background-color", "red");
            return false;
        }else if(vyplnenyKamos.length >20){
            alert("Přezdívka kamaráda nesmí být delší než 20 znaků");
            $("#kanoe_kamarad").css("background-color", "red");
            return false;
        }
      }
      $.ajax({
        url: "/api/register/" + vyplnenyNick + "/" + vyplnenyKamos + "/" +jePlavec ,
        success: function(result) {
        alert(result)
      }
      })
      return true;
});});