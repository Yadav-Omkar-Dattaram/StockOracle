Obj = sessionStorage.getItem("Object");
Imgsrc = sessionStorage.getItem("ImageSrc");
Titlesrc = sessionStorage.getItem("TitleSrc");
Obj = JSON.parse(Obj);
var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
console.log(Obj);

function post() {
  declaration = document.getElementById('main');
  console.log(declaration.style);
  Obj.forEach((element) => {
    if (element.urlToImage == Imgsrc || element.title == Titlesrc) {
      i = document.getElementById("iframe");
      console.log("hello");
      console.log(i);
      i.src = element.url;
     


    }
  });
}

// alert(DummyImgsrc)