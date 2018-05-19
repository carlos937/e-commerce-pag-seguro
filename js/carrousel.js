$(function(){
   var visivel = 3; 
   var quantidade = 0;
   $(".meuCarrousel li").each(function(){
       if(quantidade > visivel){
        $(this).hide();
       }
       quantidade++;
   });      
   
   var indiceExterno = 0;
   setInterval(function(){
   var indice =0;
   if(visivel <= quantidade){
   visivel++;
   }else{
   visivel=3;    
   }
   $(".meuCarrousel li").each(function(){
        $(this).show();
//       if(indice <= indiceExterno){
//           $(this).hide();
//       }
       if(indice > visivel){
        $(this).hide();
       }
       
       indice++;
   });
   
   indiceExterno++;
//   alert(visivel);
//   if(visivel == quantidade ){
//       visivel = 3;
//        indiceExterno = 0;
//   }
 
   },3000);
   
});