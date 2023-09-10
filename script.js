/* global bootstrap: false */
(function () {
  "use strict";
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
})();

// $("#navbar").on("click", "a", function () {
//   $(".nav-link.active").removeClass("active");
//   $(this).addClass("active");
// });

$("#navbar").on("click", "a", function () {
  $(".nav-link.active").removeClass("active");
  $(this).addClass("active");

  // $(".active-section")
  //   .removeClass("active-section")
  //   .addClass("inactive-section");

  var id = $(this).attr("id").split("-");
  console.log(id[0]);

  // id[0] !== "home"
  //   ? $(".bg").css("display", "none")
  //   : $(".bg").css("display", "block");

  // setTimeout(() => {
  //   if (id[0] == "projects") $("#projects").css("animation-duration", "0s");
  //   else if (id[0] == "blogs") $("#blogs").css("animation-duration", "0s");
  //   else if (id[0] == "contact") $("#contact").css("animation-duration", "0s");
  // }, 1500);

  // $("#" + id[0])
  //   .removeClass("inactive-section")
  //   .addClass("active-section");

  localStorage.setItem("last_visited", id[0]);
  // get_query();
});

$("#navbar").on("mouseover", "a", function () {
  console.log($(this).hasClass("active"));
  if ($(this).hasClass("active")) {
    $(".pop").css("background", "#ffffff");
    $(".pop").css("color", "var(--color-primary)");
  }
  var id = $(this).attr("id").split("-");
  $("#pop-" + id[0]).css("display", "block");
});

$("#navbar").on("mouseout", "a", function () {
  $(".pop").css("background", "var(--color-primary)");
  $(".pop").css("color", "#ffffff");
  $(".pop").css("display", "none");
});

$("#navbar").on("click", "a", function () {
  $(".pop").css("background", "var(--color-primary)");
  $(".pop").css("color", "#ffffff");
  $(".pop").css("display", "none");
});

$(".next").on("click", function () {
  // $(".nav-link.active").removeClass("active");
  // $("#projects-btn").addClass("active");
  // $(".active-section")
  //   .removeClass("active-section")
  //   .addClass("inactive-section");
  // $(".bg").css("display", "none");
  // localStorage.setItem("last_visited", "projects");
  // $("#projects").removeClass("inactive-section").addClass("active-section");
  // $("body").css("overflow", "unset");
  // $(".intro-desc").css("display", "block");
  // $(".intro-desc div").css("display", "block");
  // $("#intro-desc").scrollTo().offset().top;
  // $("body").scrollTo("#intro-desc");
  // $("#intro-desc")[0].scrollTo(0, Number.MAX_SAFE_INTEGER);
  console.log($(this));
  $("html, body").scrollTop($("#intro-desc").offset().top);
});

$(".back-btn").click(function () {
  $(".section").removeClass("active-section");
  if (localStorage.getItem("last_visited") == "projects") {
    $("#projects").addClass("active-section");
    location.href = "#projects$visual_design";
  } else if (localStorage.getItem("last_visited") == "blogs") {
    $("#blogs").addClass("active-section");
    location.href = "#blogs";
  } else if (localStorage.getItem("last_visited") == "contact") {
    $("#contact").addClass("active-section");
    location.href = "#contact";
  }
});

$("#projects .section-menu").on("click", "a", function () {
  $(" #projects .section-menu .menu.active").removeClass("active");
  $(" #projects .container .row .active").removeClass("active");

  var id = $(this).attr("id").split("-");
  console.log(id[0]);
  $("." + id[0]).addClass("active");
  $(this).addClass("active");
});

var primaryData = null;
//load projects

window.onload = async function loadDoc() {
  init();
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      responseObject = JSON.parse(xhttp.responseText);
      primaryData = responseObject;
      $.each(responseObject, function (key, value) {
        console.log(key + ": " + value);
        value.map((data) => {
          var html =
            `
      <div  class="zoomable col-md-6 ` +
            (key == "visual_design_" || key == "blogs" ? ` active ` : ``) +
            key +
            `" >  
             <a class="no-t-d" href="   ` +
            (key == "visual_design" ||
            key == "case_study" ||
            key == "motion_design"
              ? `#projects$` + key + `?id=` + data.title + `,` + key
              : `#blogs$blogs?id=` + data.title + `,` + key) +
            `">` +
            `
        <div class="card" style="background:` +
            data.bg +
            `"><img src="./assets/liquid_coner.svg" class="liquid-corner" style= " ` +
            (key != "dummy" ? `display:block` : `display:none`) +
            `">
            <div class="card-body">
                <h5 class="card-title" style="color:` +
            data.color +
            `">` +
            data.title +
            `</h5>
                <p class="card-text" style="color:` +
            data["color-sec"] +
            `">` +
            data.desc +
            ` </p>
               <img class="c-img" src="./assets/` +
            data.img +
            `" style="`+ (data.portrait? `width:90%`:``) + `"/>
             <a href="   ` +
            (key == "visual_design" ||
            key == "case_study" ||
            key == "motion_design"
              ? `#projects$` + key + `?id=` + data.title + `,` + key
              : `#blogs$blogs?id=` + data.title + `,` + key) +
            `" ` +
            // ` onclick="explore_click('` +
            // data.title +
            // `,` +
            // key +
            // `');" ` +
            `class="nav-link active py-3 d-flex explore-btn" id="explore-` +
            data.title +
            `">
                <img class="explore-arrow"
                    style="filter: invert(0);width: 20px;height: 20px;"></img>
            </a>
            </div>
        </div>
    </a> </div>`;
          // console.log(html);
          if (key != "blogs") $("#projects .container .row").append(html);
          else $("#blogs .container .row").append(html);
        });
      });

      setTimeout(() => {
        check_hash();
      }, 100);
    }
  };

  xhttp.open("GET", "data.json");
  xhttp.send();
};
function init() {
  // var last_visited = localStorage.getItem("last_visited");
  // console.log("dd", last_visited);
  // if (last_visited != null) {
  //   switch (last_visited) {
  //     case "home":
  //       $(".section").removeClass("active-section");
  //       $("#home").addClass("active-section");
  //       $(".nav-link.active").removeClass("active");
  //       $("#home-btn").addClass("active");
  //       $(".bg").css("display", "block");

  //       break;

  //     case "projects":
  //       $(".section").removeClass("active-section");
  //       $("#projects").addClass("active-section");
  //       $(".nav-link.active").removeClass("active");
  //       $("#projects-btn").addClass("active");
  //       $(".bg").css("display", "none");
  //       break;

  //     case "projects-details":
  //       $(".section").removeClass("active-section");
  //       $("#projects-details").addClass("active-section");
  //       $(".nav-link.active").removeClass("active");
  //       $("#projects-btn").addClass("active");
  //       $(".bg").css("display", "none");
  //       break;

  //     case "blogs":
  //       $(".section").removeClass("active-section");
  //       $("#blogs").addClass("active-section");
  //       $(".nav-link.active").removeClass("active");
  //       $("#blogs-btn").addClass("active");
  //       $(".bg").css("display", "none");
  //       break;

  //     case "contact":
  //       $(".section").removeClass("active-section");
  //       $("#contact").addClass("active-section");
  //       $(".nav-link.active").removeClass("active");
  //       $("#contact-btn").addClass("active");
  //       $(".bg").css("display", "none");
  //       break;

  //     default:
  //       $(".section").removeClass("active-section");
  //       $("#projects").addClass("active-section");
  //       $(".nav-link.active").removeClass("active");
  //       $("#projects-btn").addClass("active");
  //       $(".bg").css("display", "none");
  //       break;
  //   }
  // }

  window.onpopstate = function (event) {
    console.log(
      "location: " +
        document.location +
        ", state: " +
        JSON.stringify(event.state)
    );
    // get_query(document.location.href);
    check_hash();
  };
}

function explore_click(ID) {
  // var id_key = ID.split(",");
  var id_key = ID;
  console.log(ID);
  console.log(ID[0]);
  console.log(ID[1]);

  // let check = function () {
  //   setTimeout(function () {
  //     if (primaryData === null) check();
  //     else {
  //       $(".section").removeClass("active-section");
  //       $("#projects-detail").addClass("active-section");

  //       console.log(primaryData[id_key[1]]);
  //       primaryData[id_key[1]].map((data) => {
  //         id_key[0] = id_key[0].replace("%20", " ");

  //         if (data.title == id_key[0]) {
  //           $("#projects-detail #title").text(data.title);
  //           $("#projects-detail #context-desc").text(data.context);

  //           if (id_key[0] == "case_study") {
  //             data.e_data.map((d) => {
  //               var html =
  //                 `<div class="card" style="background: rgb(206, 206, 255);">

  //                           <div class="d-flex align-items-center">
  //                               <div class="bar">
  //                               </div>
  //                               <h5 class="card-title">` +
  //                 d.head +
  //                 `</h5>

  //                           </div>
  //                           <p class="card-text" id="context-desc">
  //                           ` +
  //                 d.msg +
  //                 `
  //                           </p>

  //                           <div>

  //                           </div>
  //                       </div>`;
  //               $("#projects-detail .container .row div").append(html);
  //             });
  //           }

  //           $("#projects-detail .bar").css("background", data.color);
  //           if (data["context_img"]) {
  //             $(
  //               "#projects-detail .container .row > div:last-child .card .card-body"
  //             ).html(
  //               `<img class="aaa" src="./assets/` + data.context_img + `" />`
  //             );
  //           }

  //           if (data["url_text"]) {
  //             $(
  //               "#projects-detail .container .row > div:first-child .card div:last-child"
  //             ).html(
  //               `<a href="` +
  //                 data["url"] +
  //                 `" class="nav-link active py-3 d-flex view-btn align-items-center">
  //            ` +
  //                 data["url_text"] +
  //                 `
  //             </a>`
  //             );
  //           } else {
  //             $(
  //               "#projects-detail .container .row > div:first-child .card  div:last-child"
  //             ).html(``);
  //           }

  //           return;
  //         }
  //       });
  //     }
  //   }, 100);
  // };
  // check();

  location.href = "projects-detail.html?id=" + ID[1] + "&&name=" + ID[0];
}

function check_hash() {
  var hash = document.location.hash ? document.location.hash : null;
  console.log("hash", hash);
  if (hash != null) {
    if (hash.indexOf("$") + 1 > 0) {
      var hash_1 = hash.split("$")[0];
      console.log("hash1", hash_1);

      var hash_2 = hash.substring(hash.indexOf("$") + 1);
      console.log("hash2", hash_2.split("?")[0]);

      if (hash.indexOf("=") + 1 > 0) {
        var hash_3 = hash.substring(hash.indexOf("=") + 1).split(",")[0];
        var key = hash.substring(hash.indexOf(",") + 1);
        console.log("hash3", hash_3);
        console.log("key", key);
        var temp = [hash_3, key];
        explore_click(temp);
      }

      setTimeout(() => {
        switch (hash_2) {
          case "visual_design":
          case "case_study":
          case "motion_design":
            $(" #projects .section-menu .menu.active").removeClass("active");
            $(" #projects .container .row .active").removeClass("active");
            $("." + hash_2).addClass("active");
            $("#" + hash_2 + "-btn").addClass("active");
        }
      }, 100);

      $(".section").removeClass("active-section");
      $(hash_1).addClass("active-section");
      $(".nav-link.active").removeClass("active");
      $(hash_1 + "-btn").addClass("active");
      if (hash_1 == "#home") $(".bg").css("display", "block");
      else $(".bg").css("display", "none");
    } else {
      $(".section").removeClass("active-section");
      $(hash).addClass("active-section");
      $(".nav-link.active").removeClass("active");
      $(hash + "-btn").addClass("active");
      if (hash == "#home") $(".bg").css("display", "block");
      else $(".bg").css("display", "none");

      if (hash == "#projects") {
        $(" #projects .section-menu .menu.active").removeClass("active");
        $(" #projects .container .row .active").removeClass("active");
        $(".visual_design").addClass("active");
        $("#visual_design-btn").addClass("active");
      }
    }
  }
}

function get_query(location) {
  console.log(location);
  // var url = document.location.href;
  var url = location;
  var href_query = url.split("/#");
  // console.log(url.substring(url.indexOf("?") + 1));
  const str = href_query[1];

  $(".active-section")
    .removeClass("active-section")
    .addClass("inactive-section");

  let result =
    str.match("projects") ||
    str.match("blogs") ||
    str.match("contact") ||
    str.match("home");

  console.log(result);
  if (result != null) {
    var id = [result[0]];
    console.log(id[0]);
    id[0] !== "home"
      ? $(".bg").css("display", "none")
      : $(".bg").css("display", "block");
    setTimeout(() => {
      if (id[0] == "projects") {
        $("#projects").css("animation-duration", "0s");
        // $(" #projects .section-menu .menu.active").removeClass("active");
        // $(" #projects .container .row .active").removeClass("active");
        // $(".visual_design").addClass("active");
        // $("#visual_design-btn").addClass("active");
      } else if (id[0] == "blogs") $("#blogs").css("animation-duration", "0s");
      else if (id[0] == "contact")
        $("#contact").css("animation-duration", "0s");
    }, 1500);
    $("#" + id[0])
      .removeClass("inactive-section")
      .addClass("active-section");
  } else var input = "";
  // console.log(input);

  // switch (input) {
  //   case "projects":
  //     var id = [input];
  //     console.log(id[0]);
  //     id[0] !== "home"
  //       ? $(".bg").css("display", "none")
  //       : $(".bg").css("display", "block");

  //     setTimeout(() => {
  //       if (id[0] == "projects") $("#projects").css("animation-duration", "0s");
  //       else if (id[0] == "blogs") $("#blogs").css("animation-duration", "0s");
  //       else if (id[0] == "contact")
  //         $("#contact").css("animation-duration", "0s");
  //     }, 1500);

  //     $("#" + id[0])
  //       .removeClass("inactive-section")
  //       .addClass("active-section");
  //     break;

  //   default:
  //     break;
  // }

  // var qs = url.substring(url.indexOf("?") + 1).split("#");
  // for (var i = 0, result = {}; i < qs.length; i++) {
  //   qs[i] = qs[i].split("=");
  //   result[qs[i][0]] = decodeURIComponent(qs[i][1]);
  // }
  // href_query = href_query[1];
  // switch (href_query) {
  //   case href_query.test(/^projects/):
  //     var id = ["projects"];
  //     console.log(id[0]);
  //     id[0] !== "home"
  //       ? $(".bg").css("display", "none")
  //       : $(".bg").css("display", "block");

  //     setTimeout(() => {
  //       if (id[0] == "projects") $("#projects").css("animation-duration", "0s");
  //       else if (id[0] == "blogs") $("#blogs").css("animation-duration", "0s");
  //       else if (id[0] == "contact")
  //         $("#contact").css("animation-duration", "0s");
  //     }, 1500);

  //     $("#" + id[0])
  //       .removeClass("inactive-section")
  //       .addClass("active-section");
  //     break;

  //   case href_query.match(/^contact/)?.input:
  //     break;
  // }
  // return href_query;
}

// $(".explore-btn").click(function () {
//   var id = $(this).attr("id");
//   console.log("heyy", id);
// });
