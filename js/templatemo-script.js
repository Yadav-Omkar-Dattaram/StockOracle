$(function () {
  $(".navbar-toggler").on("click", function (e) {
    $(".tm-header").toggleClass("show");
    e.stopPropagation();
  });

  $("html").click(function (e) {
    var header = document.getElementById("tm-header");

    if (!header.contains(e.target)) {
      $(".tm-header").removeClass("show");
    }
  });

  $("#tm-nav .nav-link").click(function (e) {
    $(".tm-header").removeClass("show");
  });
});
var DummyImgsrc;
var DummyTitlesrc;

$(document).ready(function () {
  $(".tm-paging-item", ".tm-paging-nav").each(function () {
    $(this).on("click", function () {
      $(".tm-paging-item.active", ".tm-paging-nav").removeClass("active");
      $(this).addClass("active");

      showonlyone($(this).data("postId"));

      return false;
    });
  });
});
var pgNumber = 1;
var topu = 0;
var bottom = 6;

function changeFeed(val) {
  pgNumber = val;
  topu = (val - 1) * 6;
  bottom = pgNumber * 6;

  feed();
}

$("body").click(function (e) {
  console.log("ggg");
  var target = $(e.target);
  DummyImgsrc = target[0].currentSrc;
  DummyTitlesrc = target[0].innerHTML;

  if (
    target.is("img.img-fluid") ||
    target.is("h2.tm-pt-30.tm-color-primary.tm-post-title")
  ) {
    sessionStorage.setItem("TitleSrc", DummyTitlesrc);
    sessionStorage.setItem("ImageSrc", DummyImgsrc);
  }
});

var ObjArr;
const userAction = async () => {

  json = [];
  $.ajax({
    async: false,
    global: false,
    url: "https://newsapi.org/v2/everything?q=' BSE AND stocks'&apiKey=d8c867468f3a49ec820e43e6ed0f10e6&pageSize=60",
    dataType: "json",
    success: function (data) {
      data = data.articles.sort(function(a, b) {
         return b.publishedAt.localeCompare(a.publishedAt);
      } )
      console.log(data);
      for (let index = 0; index <= 19; index++) {
        if (
          data[index].urlToImage != null &&
          data[index].author != null &&
          data[index].description != null &&
          data[index].title != null &&
          data[index].publishedAt != null
        ) {
          json.push(data[index]);
          // console.log(json);
        }
      }
    },
  });

  console.log(pgNumber);
  console.log(json);


  ObjArr = json;
  sessionStorage.setItem("Object", JSON.stringify(ObjArr));
  feed();
  console.log(ObjArr);
};

function feed() {
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
  SliceArr = ObjArr.slice(topu, bottom);
  let imgURLArr = [];
  let titleArr = [];
  let descriptionArr = [];
  let pubDateArr = [];
  let authorArr = [];

  SliceArr.forEach((element) => {
    imgURLArr.push(element.urlToImage);

    titleArr.push(element.title);
    descriptionArr.push(element.description);
    authorArr.push(element.author);
    date = new Date(element.publishedAt);
    pDate =
      monthNames[date.getMonth()] +
      " " +
      date.getDate() +
      " , " +
      date.getFullYear();
    pubDateArr.push(pDate);
  });

  //fetching the UI components
  Img = document.getElementsByName("image");
  Title = document.getElementsByName("title");
  Des = document.getElementsByName("description");
  pubDate = document.getElementsByName("date");
  author = document.getElementsByName("author");
  console.log(imgURLArr);
  console.log(Img);

  for (i = 0; i < Img.length; i++) {
    Img[i].src = imgURLArr[i];
    Title[i].innerHTML = titleArr[i];
    Des[i].innerHTML = descriptionArr[i];
    pubDate[i].innerHTML = pubDateArr[i];
    author[i].innerHTML = authorArr[i];
  }
}