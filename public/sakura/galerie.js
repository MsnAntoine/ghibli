 // const promess01 = fetch('https://ghibliapi.vercel.app/films')
// promess01.then((response) =>{
//     console.log(response);
//     const data =  response.json();
//     console.log(data);
//
// data.then((dataApi) => {
//         console.log(dataApi);
//         console.log(dataApi[0].image);
//
//         let image=(dataApi[0].image);
//
//         let newimage = document.createElement('img');
//         newimage.setAttribute("src", image);
//         console.log(newimage)
//         container.appendChild(newimage);
//
//     })
// })
// const promess02 = fetch('https://ghibliapi.vercel.app/films')
// promess02.then((response) =>{
//     console.log(response);
//     const data =  response.json();
//     console.log(data);
//
//     data.then((dataApi) => {
//         console.log(dataApi);
//         console.log(dataApi[1].image);
//
//         let image2=(dataApi[1].image);
//
//         let newimage2 = document.createElement('img');
//         newimage2.setAttribute("src", image2);
//         console.log(newimage2)
//         container.appendChild(newimage2);
//
//     })

 // })

 const url = 'https://ghibliapi.vercel.app/films';

 fetch(url)
     .then(response => response.json())
     .then(dataApi => {
         const container = document.getElementById('container');

         for (let i = 0; i < 21; i++) {
             const image = dataApi[i].image;

             let newImage = document.createElement('img');
             newImage.setAttribute('src', image);
             newImage.classList.add('custom-image'); // Add the CSS class "custom-image"
             container.appendChild(newImage);
         }
     })
     .catch(error => {
         console.log('An error occurred:', error);
     });









