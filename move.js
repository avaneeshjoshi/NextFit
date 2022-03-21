"use strict";
(function () {
  window.addEventListener("load", init);

  let myChart;
  /**
   * this function will call a function to load the list of books
   * when the page loads
   */
  function init() {
    toggleHomeView();
    loadPages();
    enableOnScreenButtons();
    // handleGraph();
    getStartedButton();
  }

  function getStartedButton() {
      let startbtn = id('start');
      let navbarLinks = qsa("#menu-items li");
      startbtn.addEventListener('click', (e) => toggleViewOn(e, navbar))
  }

  function handleGraph() {
    console.log("test")
    fetch("/profile")
      .then(res => res.json())
      .then(res => {
        if (myChart) {
          res = res.data;
          let graphData = []
          console.log(res)
          let labels = [];
          for(let i = 0; i < res.length; i++) {
            labels.push("");
            graphData.push(res[i][0])
          }
          console.log("chart exists")
          myChart.data.labels = labels;
          // console.log(myChart.data.datasets[0].data)
          myChart.data.datasets[0].data = graphData
          myChart.update()
        } else {
          res = res.data;
          let graphData = []
          console.log(res)
          let labels = [];
          for(let i = 0; i < res.length; i++) {
            labels.push("");
            graphData.push(res[i][0])
          }

          const data = {
            labels: labels,
            datasets: [
              {
                label: "Pushups in 20 minutes",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: graphData,
              },
            ],
          };

          const config = {
            type: "line",
            data: data,
            options: {
              tooltips: {
                mode: 'index',
                callbacks: {
                  title: tooltipItem => 'asdfasdfasdf'
                }
              }
            }
          };
          var options = {
            tooltips: {
              callbacks: {
                label: function (tooltipItem) {
                  return "asdfasdfasfas";
                },
              },
            },
          };
          myChart = new Chart(document.getElementById("myChart"), config);
        }

      })
  }

  function enableOnScreenButtons() {
    let navbarLinks = qsa("#menu-items li");
    console.log(navbarLinks);
    for (let i = 0; i < navbarLinks.length; i++) {
      navbarLinks[i].addEventListener("click", (e) =>
        toggleViewOn(e, navbarLinks)
      );
    }
    id('moveio').addEventListener('click', toggleHomeView);
    id('challenge_btn').addEventListener('click', loadChallenge);
    id('leaderboard_btn').addEventListener('click', leaderboardBuild);
    id('account_btn').addEventListener('click', handleGraph);
  }

  function loadPages() {
    loadClasses();
    loadChallenge();
    leaderboardBuild();
  }

  function toggleViewOn(e, navbarLinks) {
      console.log(navbarLinks);
    let thisid = e.currentTarget.textContent.toLowerCase();
    let pages = qsa(".pages");
    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.add("hidden");
    }
    var element = id(thisid);
    element.classList.remove("hidden");
  }

  function toggleHomeView() {
    let pages = qsa(".pages");
    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.add("hidden");
    }
    var home = id("hero");
    home.classList.remove("hidden");
  }

  function loadClasses() {
    for (let i = 0; i < exercises.length; i++) {
      let exs = exercises[i];
      let name = exs.name;
      let desc = exs.desc;
      let pic = exs.picture;
      let vid = exs.video;

      let card = gen("div");
      let cardImg = gen("div");

      let cardDesc = gen("div");
      card.classList.add("class-card");
      cardImg.classList.add("class-img");
      cardDesc.classList.add("class-desc");
      let cardId = name;
      toImage(cardImg, pic);
      let title = gen("h1");
      let duration = gen("h4");
      let description = gen("h4");
      title.textContent = name;
      card.id = cardId;
      //adding squat exec code
      if(name=="squat") {
        card.addEventListener('click', loadSquats);
      }
      //  duration.textContent =
      description.textContent = desc;
      card.appendChild(cardImg);
      cardDesc.appendChild(title);
      // cardDesc.appendChild(duration);
      cardDesc.appendChild(description);
      card.appendChild(cardDesc);
      card.addEventListener("mouseover", (e) =>
        addGIFClass(e, cardId, cardImg)
      );
      card.addEventListener("mouseout", (e) => toImage(cardImg, pic));
      id("classes").appendChild(card, cardId);
    }
  }

  function loadChallenge() {
    id('inst').innerHTML="";
    id('inst').classList.remove('hidden');
    id('challenge_box').classList.add("hidden");
    let instructions = gen('div');
    let header = gen('h1');
    let inst_pic = gen('div');
    let description = gen('h4');
    let ready_btn = gen('p');

    instructions.classList.add("instruction");
    inst_pic.classList.add("inst-image");
    description.classList.add("challenge-desc");
    description.textContent = "Please place you laptop down on the ground, having the web cam around eye level. When ready and in a tall plank, go ahead and click ready and the timer will start!"
    ready_btn.id = "ready-btn";
    ready_btn.textContent = "Ready!";
    header.textContent = "Welcome to the Challenge!";

    instructions.appendChild(header);
    instructions.appendChild(inst_pic);
    instructions.appendChild(description);
    instructions.appendChild(ready_btn);
    id("inst").appendChild(instructions);

    ready_btn.addEventListener('click', playChallenge);
  }

  function playChallenge() {
    id('inst').classList.add('hidden');
    id('challenge_box').classList.remove("hidden");
    id('inst').innerHTML="";
    let img = id("challenge_window");
    img.src = "https://acegif.com/wp-content/uploads/loading-37.gif";
    setTimeout(() => {img.src="/video_feed"}, 1000);
  }

  function loadSquats() {
    id('inst2').innerHTML="";
    id('classes').classList.add("hidden");
    id("squats").classList.remove("hidden");
    let instructions = gen('div');
    let header = gen('h1');
    let inst_pic = gen('div');
    let description = gen('h4');
    let ready_btn = gen('p');

    instructions.classList.add("instruction");
    inst_pic.classList.add("inst2-image");
    description.classList.add("challenge-desc")
    description.textContent = "Please place you laptop down on the ground, having the web cam around eye level. When ready and in a tall plank, go ahead and click ready and the timer will start!"
    ready_btn.id = "ready-btn";
    ready_btn.textContent = "Ready!";
    header.textContent = "Welcome to your squats lesson!";

    instructions.appendChild(header);
    instructions.appendChild(inst_pic);
    instructions.appendChild(description);
    instructions.appendChild(ready_btn);
    id("inst2").appendChild(instructions);

    ready_btn.addEventListener('click', playSquat);
  }

  function playSquat() {
    id('squats_box').classList.remove("hidden");
    id('inst2').innerHTML="";
    let img = id("squats_window");
    img.src = "https://acegif.com/wp-content/uploads/loading-37.gif";
    setTimeout(() => {img.src="/video_feed3"}, 1000);
  }

  function addGIFClass(e, cardId, cardImg) {
    console.log("change to gif");
    let urlPath = "../static/images/" + cardId + ".gif";
    console.log(urlPath);
    cardImg.style.backgroundImage = "url(" + urlPath + ")";
  }

  function toImage(cardImg, pic) {
    cardImg.style.backgroundImage = "url(" + pic + ")";
  }

  function leaderboardBuild() {
    id('chart_ranking').innerHTML="";
    fetch("/leaderboard")
      .then((res) => res.json())
      .then((res) => {
        res = res.data;
        for (let i = 0; i < res.length; i++) {
          let ident = res[i][0];
          let count = res[i][1][0];
          let angle = res[i][1][1];
          let place = i + 1;
          if (i === 0) {
              qs("#gold > h4").textContent = ident;
              qs("#gold > p").textContent = count + " Points"
          } else if (i == 1) {
            qs("#silver > h4").textContent = ident;
            qs("#silver > p").textContent = count + " Points"
          } else if (i == 2) {
            qs("#bronze > h4").textContent = ident;
            qs("#bronze > p").textContent = count + " Points"
          } else {


            let podium = gen("div");
            podium.classList.add("ranking");
            let rank = gen("h4");
            rank.textContent = place + ".";
            let name_card = gen("h4");
            name_card.textContent = ident;
            let score = gen("h4");
            score.textContent = count + " points";

            podium.appendChild(rank);
            podium.appendChild(name_card);
            podium.appendChild(score);
            id("chart_ranking").appendChild(podium);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * shortcut function to select object using ID and make object
   * @param {String} idName - id of wlement we want to select
   * @returns {Object} Returns object that was identified by ID
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * shortcut function to select object using selector and make object
   * @param {String} selector - identifier of element we want to select
   * @returns {Object} Returns object that was identified by selctor
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * shortcut function to create node list of objects using identifiers
   * @param {String} selector - identifier of element we want to create list of
   * @returns {Object} Returns node list that was identified by selector
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * shortcut function to create object using element type
   * @param {String} elType - element of what we want to create
   * @returns {Object} Returns object that was created by element specified
   */
  function gen(elType) {
    return document.createElement(elType);
  }

  const pushupJs = {
    name: "pushup",
    desc: "A conditioning exercise performed in a prone position by raising and lowering the body with the straightening and bending of the arms while keeping the back straight and supporting the body on the hands and toes",
    picture:
      "https://media.istockphoto.com/photos/beautiful-young-sports-lady-doing-push-ups-while-workout-at-home-picture-id1254996126?k=20&m=1254996126&s=612x612&w=0&h=rsKgWYDbSHmyNJ5h40FNtsMVOV-J9AWp8YzuTt-Y2X8=",
    video: "pushup.gif",
    ins: [
      "1. Contract your abs and tighten your core by pulling your belly button toward your spine.",
      "2. Inhale as you slowly bend your elbows and lower yourself to the floor, until your elbows are at a 90-degree angle.",
      "3. Exhale while contracting your chest muscles and pushing back up through your hands, returning to the start position.",
    ],
  };

  const squatJs = {
    name: "squat",
    desc: "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up.",
    picture:
      "https://experiencelife.lifetime.life/wp-content/uploads/2021/03/Pull-Ups-1280x720.jpg",
    video: "squat.gif",
    ins: [
      "1. Stand up with your feet shoulder-width apart.",
      "2. Bend your knees, press your hips back and stop the movement once the hip joint is slightly lower than the knees.",
      "3. Press your heels into the floor to return to the initial position.",
    ],
  };

  const yogaJs = {
    name: "yoga",
    desc: "Various styles of yoga combine physical postures, breathing techniques, and meditation or relaxation",
    picture: "https://www.goodnet.org/photos/281x197/34271_hd.jpg",
    video: "yoga.gif",
    ins: [
      "1. Stand up with your feet, a little wider than shoulder width.",
      "2. Lift arms from your shoulder until they are parallel to the ground",
      "3. Hold for 10 seconds.",
    ],
  };

  const curlJs = {
    name: "curl",
    desc: "Bicep curls help develop beautiful arms, which can translate into a great physique.",
    picture: "https://438p81ekhtervo423d6400fn-wpengine.netdna-ssl.com/wp-content/uploads/2021/02/Bicep-Curls.jpg",
    video: "curl.gif",
    ins: [
      "1. Stand up with your feet, a little wider than shoulder width.",
      "2. Lift arms from your shoulder until they are parallel to the ground",
      "3. Hold for 10 seconds.",
    ],
  };

  const exercises = [pushupJs, squatJs, yogaJs, curlJs, pushupJs, squatJs, yogaJs, curlJs];
})();
