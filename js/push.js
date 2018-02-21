console.log("[App] Started Push Listening");

const messaging = firebase.messaging();

messaging.requestPermission().then(function(){
  console.log('Permisão Concedida');

  return messaging.getToken().then(function (currentToken){
    if (currentToken){
      console.log(currentToken);
      sendTokenToServer(currentToken);
      return currentToken;
    }else{
      console.warn("Nenhum ID disponivel. Solicite Permissão ao ADM");
    }
  })
});

messaging.getToken().then(function (currentToken){
    if(currentToken){
      console.log(currentToken);
      return currentToken;
    }else{
      console.warn("Nenhum ID disponivel. Solicite Permissão ao Usuario");
    }  
  }).catch(function (err){
    console.warn('Erro ao gerar Novo Token', err);
  }
);
