"use strict"
let button = new LogoutButton();

button.action = () => {
  let callback = (response) => {
   if (response.success) {
      location.reload()
    }        
  }
  ApiConnector.logout(callback);
}

ApiConnector.current((response) => {
   if (response.success) {
      ProfileWidget.showProfile(response.data);
    }  
});

const currentCourse = new RatesBoard();
  function courseRequest() {

   const callback = (response) => {
       if (response.success) {
     currentCourse.clearTable();
     currentCourse.fillTable(response.data);
    }        
   }
   ApiConnector.getStocks(callback)
}
   courseRequest();
   setInterval(courseRequest, 60000);

function funcRatesBoard() { 
   const tableBody = new RatesBoard();
   ApiConnector.getStocks((response) => {
      if (response.success) {
         tableBody.clearTable();
         tableBody.fillTable(response.data);
      }
   }); 
}
funcRatesBoard();
setInterval(funcRatesBoard, 60000);

const operationMoney = new MoneyManager();
operationMoney.addMoneyCallback = (data) => {
   let callback = (response) => {
      if (response.success) {
         ProfileWidget.showProfile(response.data);
          operationMoney.setMessage(response.data, 'Баланс пополнен');
      } else {
          operationMoney.setMessage(response.success, response.error);
      }
   }
   ApiConnector.addMoney(data, callback);
}

operationMoney.conversionMoneyCallback = (data) => {
   let callback = (response) => {
      if (response.success) {
          operationMoney.setMessage(response.data, 'Валюта конвертирована');
      } else {
          operationMoney.setMessage(response.success, response.error);
      }
   }
   ApiConnector.convertMoney(data, callback);
}


operationMoney.sendMoneyCallback = (data) => {
   let callback = (response) => {
      if (response.success) {
         ProfileWidget.showProfile(response.data);
          operationMoney.setMessage(response.success, 'Валюта переведена');
      } else {
          operationMoney.setMessage(response.success, response.error);
      }
   }
   ApiConnector.transferMoney(data, callback);
}

const favorites = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
       if (response.success) {
         favorites.clearTable();
         favorites.fillTable(response.data);
         operationMoney.updateUsersList(response.data); 
      }     
   })


favorites.addUserCallback = (data) => { 
    let callback = (response) => {
       if (response.success) {
         favorites.clearTable();
         favorites.fillTable(response.data);
         operationMoney.updateUsersList(response.data);
         favorites.setMessage(response.success, 'Добавление успешно');
      } else {
         favorites.setMessage(response.success, response.error);
      };
   }
   ApiConnector.addUserToFavorites(data, callback)
}

favorites.removeUserCallback = (data) => {
    let callback = (response) => {
       if (response.success) {
         favorites.clearTable();
         favorites.fillTable(response.data);
         operationMoney.updateUsersList(response.data);
         favorites.setMessage(response.success, 'Удалено успешно');
      } else {
         favorites.setMessage(response.success, response.error);
      };
   }
   ApiConnector.removeUserFromFavorites(data, callback);
}



