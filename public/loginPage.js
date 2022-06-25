'use strict'


const user = new UserForm();

user.loginFormCallback = (data) => {
	const callback = (response) => {
    if (response.success) {
      location.reload();
    } else user.setLoginErrorMessage(response.error); 
};
 ApiConnector.login(data, callback);
}


user.registerFormCallback = (data) => {
  const callback = (response) => {
  	  if (response.success) {
      location.reload()
    } else user.setLoginErrorMessage(response.error);         
  }
  ApiConnector.register(data, callback); 
}	
  


