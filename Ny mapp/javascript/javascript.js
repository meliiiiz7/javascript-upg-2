const services = [
    {
      name: "AMERICAS SWEATHEART AND HERO",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime cumque porro impedit voluptate natus? Dolorem consequuntur at velit sunt provident, est corporis repellendus ea nostrum, earum nesciunt sit ex quasi?",
      picture: "thumbnail_IMG_4180.png",
    },
    {
      name: "RUSSIAN SPY, TRAINED SINCE A LITTLE CHILD",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime cumque porro impedit voluptate natus? Dolorem consequuntur at velit sunt provident, est corporis repellendus ea nostrum, earum nesciunt sit ex quasi?",
      picture: "black-png-new-dark-withoutbkrond.png",
    },
    {
        name: "GOD, SON OF ODEN",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime cumque porro impedit voluptate natus? Dolorem consequuntur at velit sunt provident, est corporis repellendus ea nostrum, earum nesciunt sit ex quasi?",
        picture: "thor-png-new-withoutbkrond.png",
      },
  ];

  
//function to close the modal and get styleproperties to manipulate in html div   
const closeServiceModal = () => {
    document.getElementById("service-modal-wrapper").style.display = "none";
};
 
// loop through array and connect every eventelement to a function 
//we store all the elements in the class "service-cards" in an array called card
//we use addeventlistener to listen for a click on the element in html,to tell the program when to start running the openservicemodal function 
//we use a for loop and conditions to tell whats gonna happen when conditions are met 
const openServiceModal = () => {
    const cards = document.getElementsByClassName("service-cards");
    for (let a = 0; a < cards.length; a++) { // först skapar vi a och ger den värdet 0. sen säger vi att så länge a/indexvärdet på a, är kortare än antal objekt som finns i arrayen ovan, ska loopen fortsätta. varje gång plussar vi på med hjälp av a++ 
        cards[a].addEventListener("click", () => {
            document.getElementById("service-modal-wrapper").style.display = "flex";//vi deklarerar vad som ska hända när eventlistener hör ett klick, i detta fall ska vi göra service-modal-wrapper synlig genom att ändra dess css till flex, alltså poppar längst fram i användarens skärmbild.
            for (let r = 0; r < services.length; r++) {  //vi använder en for loop för att loopa igenom objecten i arrayen ovan och få ut indexnr. 
            if (a === r) { //om värde på a är lika med värde på r så ska nedan utföras och skrivas ut på skärmen
                document.getElementById("us-modal-content").innerHTML = `<h2>${services[r].name}</h2><p>${services[r].content}</p><img src="../media/${services[r].picture}">`;//vi skapar plats i html genom js för att kunna hämta inehåll och som vi sedan kan styla i css som vanligt
            }
          }
        });
    }
};

window.addEventListener("load", openServiceModal);


//create an array of objects
const images = [
    {
      name: "thor-png-new-withoutbkrond.png",
    },
    {
      name: "captain-penguin-without-bkrond.png",
    },
    {
        name: "black-png-new-dark-withoutbkrond.png",
    },
    {
        name: "thumbnail_IMG_4180.png",
    },
  ];


//function to find source og mainimage of gallery
  const setMainImage = (src) => {
    document.getElementById("main-image").setAttribute("src", src);
    setActiveThumbNail();
  };
 /*function to see wich photo amongst the thumnails is showing right on the mainimage */ 
  const setActiveThumbNail = () => {
    const thumbs = document.getElementsByClassName("thumbnail");
    for (let a = 0; a < thumbs.length; a++) {
      if (thumbs[a].src === document.getElementById("main-image").src) {
        thumbs[a].style.border = "2px solid black";
      } else {
        thumbs[a].style.border = "0px";
      }
    }
  };
  //we use a for loop and conditions to loop through the thumbnails source and the source to the mainimage to make them end up with the same source when user activates previmage 
  // we decide that we want to set the source of the current indexnumber, to the source of one object before in the array, -1 
  const prevImage = () => {
    const thumbs = document.getElementsByClassName("thumbnail");
    for (let i = 0; i < thumbs.length; i++) {
      if (
        thumbs[i].src === document.getElementById("main-image").src &&
        i !== 0
      ) {
        document
          .getElementById("main-image")
          .setAttribute("src", thumbs[(i -= 1)].src);
        setActiveThumbNail();
      }
    }
  };

//next image in gallery
  const nextImage = () => {
    const thumbs = document.getElementsByClassName("thumbnail");
    for (let i = 0; i < thumbs.length; i++) {
      if (
        thumbs[i].src === document.getElementById("main-image").src &&
        i !== thumbs.length - 1
      ) {
        document
          .getElementById("main-image")
          .setAttribute("src", thumbs[(i += 1)].src);
        setActiveThumbNail();
      }
    }
  };

  window.addEventListener("load", () => {
    document
      .getElementById("main-image")
      .setAttribute("src", `../media/${images[0].name}`);
    document.getElementById("thumbnails-wrapper").innerHTML = images
      .map(
        (img) =>
          `<img src="../media/${img.name}" class="thumbnail" onclick="setMainImage(this.src)">`
      )
      .join("");
  
    setActiveThumbNail();
    document.getElementById("prev-btn").addEventListener("click", prevImage);
    document.getElementById("next-btn").addEventListener("click", nextImage);
  });


// lightbox code
//we call upon the function "openlightbox" and gives it an argument to seek for
//we use map to create a new array with the content from images-array. we can now make changes in the new array that wont affect the objects in the old array 
//this.src helps the program find exactly what source we are after
//the function opens and changes its css property to flex instead of none

//we close the lightbox by changing the property to none again
//we create the tomcontainer where to store our current imagesource
  const openLightBox = (src) => {  
    document.getElementById("lb-thumbnails-wrapper").innerHTML = images.map(
        (img) => 
        `<img src="../media/${img.name}" class="lb-thumbnail" onclick="setMainLbImage(this.src)">`
        )
        .join();  //decides what to exist inbetween every thumbnail in the lighbox
    document.getElementById("image-lightbox").style.display = "flex";
    setMainLbImage(src);  
  }; 

  const closeLightBox = () => { //gör om till en sträng innan den skrivs ut
    document.getElementById("image-lightbox").style.display = "none";
  };

  const setMainLbImage = (tomcontainer) => { 
    document.getElementById("lb-main-image").setAttribute("src", tomcontainer);
    setActiveLbThumbnail();
};


// we use a foreach loop to compare the thumbnail source attribute with the main image source attribute to see if it matches and if so, a blue border sets around the active thumbnail
const setActiveLbThumbnail = () => {
    const lbThumbs = document.querySelectorAll(".lb-thumbnail");
    console.log("thumbnail elements: ", lbThumbs);
    lbThumbs.forEach((thumbnail) => {
      console.log("thumbnail: ", thumbnail);
      if (thumbnail.src === document.getElementById("lb-main-image").src) {
        thumbnail.style.border = "1px solid blue";
      } else {
        thumbnail.style.border = "0px";
      }
    });
  };

   
  const prevLbImage = () => {
    const thumbsList = document.querySelectorAll(".lb-thumbnail"); 
    for (let i = 0; i < thumbsList.length; i++) {
      if (
        thumbsList[i].src === document.querySelector("#lb-main-image").src &&
        i !== 0  //we check so that index isnt 0
      ) {
        document
          .querySelector("#lb-main-image")
          .setAttribute("src", thumbsList[(i -= 1)].src);// want this to happen.. but now minus one instead of plus one
        setActiveLbThumbnail();
      } else if (
        thumbsList[i].src === document.querySelector("#lb-main-image").src &&
        i === 0
      ) {
        document
          .querySelector("#lb-main-image")
          .setAttribute("src", thumbsList[ i += thumbsList.length - 1].src);//we set the source to the source before in the array list
        setActiveLbThumbnail();
      }
    }
  };
//nextLbImage is an arrowfunction 
//we first create thumbsList that is an array and put in .lb-thumbnail from html. thumbsList contains and represents all the photos
//every photo has an indexnumber
//we usa a for loop to acces every index number in the array
//we put "-1" on length to be able to match index number and on the number of how many objects exists
//to then say: if the src of the object currently being accesed has the same source as lb-main-image AND "i" (which represents the value of the index number) isnt the same as the length, do this....
////we put the source attribute from lb-main-image to the source from the indexvalue to what it already is but one further in the list of objects
//setactivethumbnails makes the border around the thumbnails move togheter with when the user clicks next, function
//
//we create else if to set that when all the conditions are met, we want to do something...
//we want to start over the loop on indexnumber 0 

const nextLbImage = () => {
    const thumbsList = document.querySelectorAll(".lb-thumbnail"); 
    for (let i = 0; i < thumbsList.length; i++) {
      if (
        thumbsList[i].src === document.querySelector("#lb-main-image").src && 
        i !== thumbsList.length - 1
      ) {
        document
          .querySelector("#lb-main-image")
          .setAttribute("src", thumbsList[(i += 1)].src);
        setActiveLbThumbnail();
      } else if (
        thumbsList[i].src === document.querySelector("#lb-main-image").src && //vi kollar så detta stämmer men vi vill göra skillnad, vi vill inte kolla numret på sista indexen köra någonting om något är lika
        i === thumbsList.length - 1 //om den är lika med 5 vill vi sätta de
      ) {
        document
          .querySelector("#lb-main-image")
          .setAttribute("src", thumbsList[0].src);
        setActiveLbThumbnail();
      }
    }
  };