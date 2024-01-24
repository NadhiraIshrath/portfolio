function init() {
  console.log(document.location.href);
  window.onpopstate = function (event) {
    console.log(
      "location: " +
      document.location +
      ", state: " +
      JSON.stringify(event.state)
    );
    // get_query(document.location.href);
    // check_hash();
  };
}

window.onload = async function loadDoc() {
  //   init();

  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      responseObject = JSON.parse(xhttp.responseText);
      primaryData = responseObject;
      //   $.each(responseObject, function (key, value) {
      //     console.log(key + ": " + value);
      //     value.map((data) => {
      //       var html =
      //         `
      //   <div class="col-md-6 ` +
      //         (key == "visual_design_" || key == "blogs" ? ` active ` : ``) +
      //         key +
      //         `" >
      //     <div class="card" style="background:` +
      //         data.bg +
      //         `"><img src="./assets/liquid_coner.svg" class="liquid-corner" style=" ` +
      //         (key != "blogs" ? `display:block` : `display:none`) +
      //         `">
      //         <div class="card-body">
      //             <h5 class="card-title" style="color:` +
      //         data.color +
      //         `">` +
      //         data.title +
      //         `</h5>
      //             <p class="card-text" style="color:` +
      //         data["color-sec"] +
      //         `">` +
      //         data.desc +
      //         ` </p>
      //            <img src="./assets/` +
      //         data.img +
      //         `"/>
      //          <a href="   ` +
      //         (key == "visual_design" ||
      //         key == "case_study" ||
      //         key == "motion_design"
      //           ? `#projects$` + key + `?id=` + data.title + `,` + key
      //           : `#blogs$blogs?id=` + data.title + `,` + key) +
      //         `" ` +
      //         // ` onclick="explore_click('` +
      //         // data.title +
      //         // `,` +
      //         // key +
      //         // `');" ` +
      //         `class="nav-link active py-3 d-flex explore-btn" id="explore-` +
      //         data.title +
      //         `">
      //             <img class="explore-arrow"
      //                 style="filter: invert(0);width: 20px;height: 20px;"></img>
      //         </a>
      //         </div>
      //     </div>
      //   </div>`;
      //       // console.log(html);
      //       if (key != "blogs") $("#projects .container .row").append(html);
      //       else $("#blogs .container .row").append(html);
      //     });
      //   });

      check_hash(primaryData);
    }
  };

  xhttp.open("GET", "data.json");
  xhttp.send();
};

function check_hash(data) {
  var search = document.location.search ? document.location.search : null;
  console.log("search", search);
  let params = new URL(document.location).searchParams;
  let id = params.get("id");
  let name = params.get("name");

  console.log(id, name);

  $(".nav-link.active").removeClass("active");

  switch (id) {
    case "case_study":
    case "visual_design":
    case "motion_design":
      $("#projects-btn").addClass("active");
      break;
    default:
      $("#" + id + "-btn").addClass("active");
  }

  if (id != undefined) {
    explore_click([name, id]);
  }
}

function back() {
  console.log(document.location.href);
  var s = document.location.search ? document.location.search : null;
  let params = new URL(document.location).searchParams;
  let id = params.get("id");
  console.log(id);
  switch (id) {
    case "visual_design":
      location.href = "./#projects$visual_design";
      break;
    case "case_study":
      location.href = "./#projects$case_study";
      break;
    case "motion_design":
      location.href = "./#projects$motion_design";
      break;
    case "blogs":
      location.href = "./#blogs";
      break;
  }
}

function explore_click(ID) {
  var id_key = ID;
  console.log('key_id', ID);
  console.log(ID[0]);
  console.log(ID[1]);

  // if (id_key[1] != "case_study" && id_key[1] != "motion_design" && id_key[1] != "visual_design") {
  if (id_key[1] != "case_study_") {
    console.log(primaryData[id_key[1]]);

    // $("#projects-detail .container .row .col-lg-6").addClass("active"); //hidden now
    // // $("#projects-detail .container .row .col-lg-7").addClass("active");

    primaryData[id_key[1]].map((data) => {



      if (data.title == id_key[0]) {
        if (!data.hasOwnProperty('e_data')) {
          $("#projects-detail .container .row .col-lg-6").addClass("active"); //added now

          $("#projects-detail #title").text(data.title);
          $("#projects-detail #context-desc").text(data.context);

          $("#projects-detail .bar").css("background", data.color);

          if (data["context_img"]) {
            if (Array.isArray(data["context_img"])) {
              var html_slide = `<div class="slide-container">`;
              data["context_img"].forEach((_img, index) => {
                console.log(_img);
                html_slide +=
                  `<div class="slide fader" style="` +
                  (index == 0 ? `display:block` : `display:none`) +
                  `"><img class="context-img" src="./assets/` +
                  _img +
                  `" /></div>`;
              });
              html_slide += `</div>`;

              $(
                "#projects-detail .container .row > div:last-child .card .card-body"
              ).html(html_slide);

              var html_dot = `<div class="dots-container">`;
              for (let index = 0; index < data["context_img"].length; index++) {
                html_dot +=
                  `<span class="dot ` +
                  (index == 0 ? `active` : ``) +
                  `"style="--collr:` +
                  data["color-sec"] +
                  `"></span>`;
              }
              html_dot += ` </div>`;
              $(
                "#projects-detail .container .row > div:last-child .card .card-body"
              ).append(html_dot);
            } else {
              $(
                "#projects-detail .container .row > div:last-child .card .card-body"
              ).html(
                `<img class="context-img" src="./assets/` +
                data.context_img +
                `" />`
              );
            }
          }

          if (data["video_url"]) {
            $(
              "#projects-detail .container .row > div:last-child .card .card-body"
            ).html(
              `<video loop src="./assets/` +
              data["video_url"] +
              `" muted playsinline autoplay >
          </video>`
            );
          }

          if (data["url_text"]) {
            $(
              "#projects-detail .container .row > div:first-child .card div:last-child"
            ).html(
              `<a href="` +
              data["url"] +
              `" class="nav-link active py-3 d-flex view-btn align-items-center">
             ` +
              data["url_text"] +
              `
              </a>`
            );
          } else {
            $(
              "#projects-detail .container .row > div:first-child .card  div:last-child"
            ).html(``);
          }

          return;
        } else {

          $("#projects-detail .container .row .col-lg-12").addClass("active");
          $("#projects-detail #title").text(data.title);
          $("#projects-detail #context-desc").text(data.context);

          data.e_data.map((d) => {
            console.log(d);

            var header = d.head
              ? `<h5 class="card-title">` + d.head + `</h5>`
              : ``;
            var msg = d.msg
              ? ` <p class="card-text" id="context-desc">` + d.msg + `</p>`
              : ``;
            var img = d.img
              ? ` <img class="context-img" src="./assets/` + data.img + `" />`
              : ``;

            if (d["col"]) {
              var col = split_col(d["col"]); //getColunm
            }

            var html =
              `<div class="container"><div class="card" style="background: rgb(206, 206, 255);">

                         ` +
              (d["head"] != "no_head"
                ? `<div class="d-flex align-items-center ` +
                d["head"] +
                `">
                                <div class="bar">
                                </div>` +
                header +
                `</div>`
                : ``) +
              msg +
              `` +
              (col != null ? col : ``) +
              `` +
              `</div></div>`;

            // $("#projects-detail .container .row .col-lg-12").append(html);
            $("#projects-detail").append(html);
          });

          $("#projects-detail .bar").css("background", data.color);
          if (data["context_img"]) {
            $(
              "#projects-detail .container .row > div:last-child .card .card-body"
            ).html(`<img class="" src="./assets/` + data.context_img + `" />`);
          }

          if (data["url_text"]) {
            $(
              "#projects-detail .container .row > div:first-child .card div:last-child"
            ).html(
              `<a href="` +
              data["url"] +
              `" class="nav-link active py-3 d-flex view-btn align-items-center">
             ` +
              data["url_text"] +
              `
              </a>`
            );
          } else {
            $(
              "#projects-detail .container .row > div:first-child .card  div:last-child"
            ).html(``);
          }

          return;

        }
      }
    });

    init_slides();
  } else {
    //case_study
    primaryData[id_key[1]].map((data) => {
      if (data.title == id_key[0]) {
        $("#projects-detail .container .row .col-lg-12").addClass("active");
        $("#projects-detail #title").text(data.title);
        $("#projects-detail #context-desc").text(data.context);

        data.e_data.map((d) => {
          console.log(d);

          var header = d.head
            ? `<h5 class="card-title">` + d.head + `</h5>`
            : ``;
          var msg = d.msg
            ? ` <p class="card-text" id="context-desc">` + d.msg + `</p>`
            : ``;
          var img = d.img
            ? ` <img class="context-img" src="./assets/` + data.img + `" />`
            : ``;

          if (d["col"]) {
            var col = split_col(d["col"]); //getColunm
          }

          var html =
            `<div class="container"><div class="card" style="background: rgb(206, 206, 255);">

                         ` +
            (d["head"] != "no_head"
              ? `<div class="d-flex align-items-center ` +
              d["head"] +
              `">
                                <div class="bar">
                                </div>` +
              header +
              `</div>`
              : ``) +
            msg +
            `` +
            (col != null ? col : ``) +
            `` +
            `</div></div>`;

          // $("#projects-detail .container .row .col-lg-12").append(html);
          $("#projects-detail").append(html);
        });

        $("#projects-detail .bar").css("background", data.color);
        if (data["context_img"]) {
          $(
            "#projects-detail .container .row > div:last-child .card .card-body"
          ).html(`<img class="" src="./assets/` + data.context_img + `" />`);
        }

        if (data["url_text"]) {
          $(
            "#projects-detail .container .row > div:first-child .card div:last-child"
          ).html(
            `<a href="` +
            data["url"] +
            `" class="nav-link active py-3 d-flex view-btn align-items-center">
             ` +
            data["url_text"] +
            `
              </a>`
          );
        } else {
          $(
            "#projects-detail .container .row > div:first-child .card  div:last-child"
          ).html(``);
        }

        return;
      }
    });
  }
}

function split_col(data) {
  var html_col = `<div class="card-body-"><div class="row">`;
  // var html_col = ``;
  data.forEach((el) => {

    if (el["img"])
      html_col +=
        `<div class="active col-lg-` +
        el.size +
        `">` +
        `<img class="" src="./assets/` +
        el.img +
        `" /> ` +
        `</div>`;
    if (el["msg"]) {
      temp_msg = document.createElement('div');
      temp_msg.innerHTML = el.msg;
      temp_msg.querySelectorAll('span').forEach(function (span) {
        if (el.color) span.style.color = el.color;
      });
      var htmlObject_msg = temp_msg;
      console.log(htmlObject_msg.innerHTML)
      html_col +=
        `<div class="active col-lg-` +
        el.size +
        `"><p id="context-desc" class="card-text ` +
        (el.type === "quote" ? `quote context-desc-padd-quote` : ``) +
        `">` +
        (el.type === "quote" || el.type === "point"
          ? `<span class="point" ` + (el.color != null ? `style="color:` + el.color + `"` : ``) + `></span>`
          : ``) +

        (el.type === "quote" || el.type === "point" ? htmlObject_msg.innerHTML : el.msg) +
        `</p>` +
        `</div>`;
    }
  });
  html_col += ` </div></div>`;
  return html_col;
}

function init_slides() {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  console.log("slid", slides);
  if (slides.length != 0) {
    const init_slide = (n) => {
      slides.forEach((slide, index) => {
        slide.style.display = "none";
        dots.forEach((dot, index) => {
          dot.classList.remove("active");
        });
      });
      slides[n].style.display = "block";
      dots[n].classList.add("active");
    };
    // document.addEventListener("DOMContentLoaded", init_slide(currentSlide));
    const next = () => {
      currentSlide >= slides.length - 1 ? (currentSlide = 0) : currentSlide++;
      init_slide(currentSlide);
    };

    const prev = () => {
      currentSlide <= 0 ? (currentSlide = slides.length - 1) : currentSlide--;
      init_slide(currentSlide);
    };

    // document.querySelector(".next").addEventListener("click", next);

    // document.querySelector(".prev").addEventListener("click", prev);

    setInterval(() => {
      next();
    }, 5000);

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        console.log(currentSlide);
        init_slide(i);
        currentSlide = i;
      });
    });
  }
}
