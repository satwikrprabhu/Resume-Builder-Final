function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }
  function onFailure(error) {
    console.log(error);
  }
  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }

  function clearErrors(){

    errors = document.getElementsByClassName('formerror');
    for(let item of errors)
    {
        item.innerHTML = "";
    }


}
function seterror(id, error){
    //sets error inside tag of id 
    element = document.getElementById(id);
    document.getElementsByClassName('formerror')[0].innerHTML = error;

}

function validateForm(){

    var returnval = true;
    clearErrors();

    //perform validation and if validation fails, set the value of returnval to false


    var password = document.forms['signupform']["password"].value;
    var cpassword = document.forms['signupform']["confirmpassword"].value;
    if (cpassword != password){
        seterror("cpassword", "*Password doesn't match!");
        returnval = false;
    }

    return returnval;
}
