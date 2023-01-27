const apikey="ibYKM1inI2Sk5NQV0Jfave6rtk7qbH2ZoKRpsKuPqAKFp4br7cQSIH2i"; //use the apikey you have generated
const input=document.querySelector("input");
const search_btn=document.querySelector(".search_btn");
const showmore_btn=document.querySelector(".showmore");
const inputWrap = document.querySelector(".inputWrap");
let page_num=1;
let search_text="";
let search=false;

input.addEventListener("input",(event)=>{
    event.preventDefault();
    search_text=event.target.value;
})

search_btn.addEventListener("click",()=>{
    if(input.value==="")
    {
      const errorSearch = document.createElement("span");
      errorSearch.innerText="Ooops Empty Value..";
      errorSearch.style =`
      font-famlily:inherit;
      font-size:13px;
      color:#d50000;
      `;
      
       inputWrap.appendChild(errorSearch);
       setTimeout(()=>{
         inputWrap.removeChild(errorSearch);
       },3000);
        return;
    }
    cleargallery();
    search=true;
    SearchPhotos(search_text,page_num);
})

function cleargallery(){
    document.querySelector(".display_images").innerHTML="";
    page_num=1;
}

async function CuratedPhotos(page_num){
    // fetch the data from api
    const data=await fetch(`https://api.pexels.com/v1/search?query=nature?page=${page_num}&per_page=22`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,         //use the apikey you have generated
        },
    });
    const response=await data.json();     //convert the response to json 
    console.log(response);

    display_images(response);            // call the display_images method to display the images on page
}

function display_images(response){
    //use forEach loop to iterate on each item
    response.photos.forEach((image) => {
        const photo=document.createElement("div");
        photo.className = randClass();
        const img = new Image();
        
        img.src = image.src.medium;
       img.og = image.src.original;
       img.alt=image.alt;
        img.addEventListener("click",clickMe);
       
        
        const about = document.createElement("span");
        about.className = "aboutImg";
        about.appendChild(document.createTextNode("Photo by : "));
        
        const linkAuthor = document.createElement("a");
        linkAuthor.className="photographer";
        linkAuthor.addEventListener("click",openAbout);
        linkAuthor.href=image.photographer_url;
        linkAuthor.innerText=image.photographer;
        
        about.append(linkAuthor);
        
        
        
        photo.append(img,about)
        document.querySelector(".display_images").appendChild(photo);
        
    });
    
    
}


async function SearchPhotos(query, page_num){
    const data=await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page_num}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,
        },
    });
    const response=await data.json();
    console.log(response);

    display_images(response);
}

showmore_btn.addEventListener("click", () => {
    if(!search){  
        page_num++;
        CuratedPhotos(page_num);
    }
    else{
        if(search_text.value==="")
        return;
        page_num++;
        SearchPhotos(search_text,page_num);
    }
})

function clickMe(e){
  //create image wrapper
  const imgHolder= document.createElement("div");
  imgHolder.className = "imgHolder";
  const imgBlock = document.createElement("div");
  imgBlock.className="imgBlock";
  const imgClose = document.createElement("span");
  imgClose.className = "imgClose";
  const imgCloseTxt = document.createTextNode("\u00D7");
  imgClose.appendChild(imgCloseTxt);
  
  //hide on click
  imgClose.onclick = (item) => {
    item.target.parentNode.parentNode.style.display="none"
  }
  
  //image module onclick
  const imgsrc = e.target.og;
  
  const newImage = document.createElement("img");
  newImage.src = imgsrc;
  //note 
  const note = document.createElement("i");
  note.className="note";
  note.innerText="This image is originally from pexels.com and Original source of this Image is Pexels.";
  
  //download button
  const dWrap = document.createElement("div");
  dWrap.className = "dWrap";
  //copy links input
  

  const number = Math.floor((Math.random() * 9000) + 1);
  const cs = document.createElement("span");
  cs.className = "copysrc";
  cs.appendChild(document.createTextNode("Copy Src"));
  const dImg = document.createElement("a");
  dImg.className = "dimg";
  dImg.href = imgsrc;
  dImg.download = "My Image";
  dImg.appendChild(document.createTextNode("Download"));
  cs.addEventListener("click", (e)=>{
    var areabox=document.createElement("textarea");
    areabox.value=imgsrc;
    document.body.appendChild(areabox);
    areabox.focus();
    areabox.select();
    document.execCommand("copy");
    document.body.removeChild(areabox);
    e.target.innerHTML='Src Copied';
    e.target.style.background='#d5001c';
    setTimeout(()=>{
      e.target.style.display='none'
    },3000);
  });
  dImg.addEventListener("click", (event) => {
    event.preventDefault();
    downloadImage(imgsrc);
    event.target.style.display='none'
  });function downloadImage(url) {
const options = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
  fetch(url, options)
   .then( response => {
    response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = "My-Image-"+[number]+".jpg";
        a.click();
      });
    }); 
}


  //append the button close
  
  imgBlock.append(imgClose,newImage,dImg,cs,note);
  imgHolder.appendChild(imgBlock);
  document.body.appendChild(imgHolder)
}

function openAbout(x){
  x.preventDefault();
  const op = document.createElement("div");
  op.className="op";
  op.addEventListener("click",(k)=>{
    document.querySelector(".wrapper").removeChild(d);
  });
  const d = document.createElement("div");
  d.className="d";
const h3 = document.createElement("h3");
h3.innerHTML= "Photographer";
const img = new Image();
img.src = "https://cdn-icons-png.flaticon.com/512/1177/1177568.png";

const name = document.createElement("span");
name.innerHTML= x.target.innerHTML;

const pLink = document.createElement("a");
pLink.href=x.target.href;
pLink.innerHTML="Full Profile";

d.append(h3,img,name,pLink,op);
document.querySelector(".wrapper").appendChild(d);
setTimeout(()=>{
  d.classList.add("td")
})
  
}
function randClass(){
  const randNumber = Math.floor(Math.random()*11);
  const randomclass = "imgWrap flex"+randNumber;
  return randomclass;
}

CuratedPhotos(page_num);
