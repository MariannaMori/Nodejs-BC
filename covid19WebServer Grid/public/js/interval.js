'use strict';

(function (){
   let startfield;
   let endfield;

   document.addEventListener('DOMContentLoaded', init);

   function init(){
      startfield = document.getElementById('startdate');
      endfield = document.getElementById('enddate');
      document.getElementById('send').addEventListener('click', update);

   }

   async function update(){
       const startdate = startfield.value;
       const enddate = endfield.value;

       try{
           const result = await fetch(
               `http://localhost:4000/api/v1/cases/daily/interval/${startdate}/${enddate}`,
               {mode:'cors'}
           );
           const data = await result.json();
           //[
              // { date: "2021-01-01", confirmed: 36403 },
              // { date: "2021-01-02", confirmed: 36603 }
       // ]

      //  const cumulativeCases=[];
       // for(let dailyData of data){
      //     cumulativeCases.push(dailyData.confirmed);
       // }
       const cumulativeCases=data.map(dailyData=>dailyData.confirmed);
       drawChart(cumulativeCases);


       }
       catch(err){
           console.log(err);
       }

       function drawChart(data){
           const canvasArea = document.getElementById('canvasarea');
           const ctx=canvasArea.getContext('2d');
           ctx.clearRect(0.0.canvasArea.width, canvasArea.height);
           const barWidth=(canvasArea.width/data.length)-1;
           drawAllBars(ctx, data, barWidth, canvasArea.height);

       }

   }


})();