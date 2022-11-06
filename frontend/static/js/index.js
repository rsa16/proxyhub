var bare;
const barec = createBareClient("https://catsarecool.tk/bare/").then(function (
  client
) {
  bare = client;
});

window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}

let newTabHtml = `
<div class="newTab" id="{num}newtab">
    <div class="settings"></div>
    <div title="Ultraviolet Logo" class="logo-wrapper">
    <img
        class="logo"
        src="data:image/png;base64,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"
        alt=""
    />
    <h1>Unblocker</h1>
    </div>
    <div class="desc">
    <p>
        Unblocker is definitely highly sophisticated piece of technology that
        will bypass anything.
    </p>
    </div>
    <form class="proxyForm">
    <input placeholder="Search the web freely" />
    <div class="buttons">
        <button type="button" onclick="loadSettingsPage()">Settings</button>
        <button type="submit">Search</button>
    </div>
    </form>
    <footer>
    <p style="margin: auto">
        This proxy was made by an anonymous individual who would not like to be
        revealed at this time. Please understand.
    </p>
    </footer>
</div>`;

$(".pageContent").after(newTabHtml);
$(".addressbar-urlbar").keypress(function (event) {
  if (event.keyCode == 13) {
    console.log("hey");
  }
});

function openFullscreen() {
  if (!window.screenTop && !window.screenY) {
    if (document.body.requestFullscreen) {
      document.body.requestFullscreen();
    } else if (
      document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    ) {
      /* Safari */
      document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (document.body.msRequestFullscreen()) {
      /* IE11 */
      document.body.msRequestFullscreen();
    }
  } else {
    document.exitFullscreen();
  }
}

const mod = (n, m) => ((n % m) + m) % m;
const baseDictionary =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~-";
const shuffledIndicator = "_rhs";
const generateDictionary = function () {
  let str = "";
  const split = baseDictionary.split("");
  while (split.length > 0) {
    str += split.splice(Math.floor(Math.random() * split.length), 1)[0];
  }
  return str;
};
class StrShuffler {
  constructor(dictionary = generateDictionary()) {
    this.dictionary = dictionary;
  }
  shuffle(str) {
    if (str.startsWith(shuffledIndicator)) {
      return str;
    }
    let shuffledStr = "";
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      const idx = baseDictionary.indexOf(char);
      if (char === "%" && str.length - i >= 3) {
        shuffledStr += char;
        shuffledStr += str.charAt(++i);
        shuffledStr += str.charAt(++i);
      } else if (idx === -1) {
        shuffledStr += char;
      } else {
        shuffledStr += this.dictionary.charAt(
          mod(idx + i, baseDictionary.length)
        );
      }
    }
    return shuffledIndicator + shuffledStr;
  }
  unshuffle(str) {
    if (!str.startsWith(shuffledIndicator)) {
      return str;
    }

    str = str.slice(shuffledIndicator.length);

    let unshuffledStr = "";
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      const idx = this.dictionary.indexOf(char);
      if (char === "%" && str.length - i >= 3) {
        unshuffledStr += char;
        unshuffledStr += str.charAt(++i);
        unshuffledStr += str.charAt(++i);
      } else if (idx === -1) {
        unshuffledStr += char;
      } else {
        unshuffledStr += baseDictionary.charAt(
          mod(idx - i, baseDictionary.length)
        );
      }
    }
    return unshuffledStr;
  }
}

function get(url, callback, shush = false) {
  var request = new XMLHttpRequest();
  request.open("GET", "https://rh.catsarecool.tk" + url, true);
  request.send();

  request.onerror = function () {
    if (!shush) console.log("Cannot communicate with the server");
  };
  request.onload = function () {
    if (request.status === 200) {
      if (callback) {
        callback(request.responseText);
      }
    } else {
      if (!shush) {
        console.log("error");
      }
    }
  };
}

var api = {
  needpassword(callback) {
    get("/needpassword", (value) => callback(value === "true"));
  },
  newsession(callback) {
    get("/newsession", callback);
  },
  editsession(id, enableShuffling, callback) {
    get(
      "/editsession?id=" +
        encodeURIComponent(id) +
        "&enableShuffling=" +
        (enableShuffling ? "1" : "0"),
      function (res) {
        if (res !== "Success")
          return setError("unexpected response from server. received " + res);
        if (callback) {
          callback();
        }
      }
    );
  },
  sessionexists(id, callback) {
    get("/sessionexists?id=" + encodeURIComponent(id), function (res) {
      if (res === "exists") return callback(true);
      if (res === "not found") return callback(false);
      console.log("unexpected response from server. received" + res);
    });
  },
  deletesession(id, callback) {
    api.sessionexists(id, function (exists) {
      if (exists) {
        get("/deletesession?id=" + id, function (res) {
          if (res !== "Success" && res !== "not found")
            return setError("unexpected response from server. received " + res);

          if (callback) {
            callback();
          }
        });
      } else {
        if (callback) {
          callback();
        }
      }
    });
  },
  shuffleDict(id, callback) {
    get("/api/shuffleDict?id=" + encodeURIComponent(id), function (res) {
      if (callback) {
        callback(JSON.parse(res));
      }
    });
  },
};

let current_setting = "proxy";
const settings = {
  proxy: [
    {
      top_desc: null,
      type: "list",
      current: "rammerhead",
      setting_name: { proxy: "Proxy:" },
      options: [
        { ultraviolet: "Ultraviolet Proxy" },
        { rammerhead: "Rammerhead Proxy" },
        { womginx: "Womginx Proxy"}
      ],
    },
  ],
  appearance: [
    {
      top_desc: null,
      type: "list",
      current: "dark",
      setting_name: { theme: "Theme:" },
      options: [{ dark: "Dark Mode" }, { light: "Light Mode" }],
    },
  ],
  tab_cloak: [
    {
      top_desc:
        "Tab cloak is a way to mask the unblocker as a different website.",
      type: "input_w_btn",
      current: "",
      placeholder: "URL:",
      setting_name: { tab_cloak: "Tab Cloak:" },
      button_text: { reset: "Reset:" },
    },
  ],
};

$("input", `#tab_cloak`).keypress(async function (e) {
  var key = e.keyCode;
  if (key == 13)
  {
    $("button", `#tab_cloak`).click();
  }
})

var iTab = {};

let sessionId = localStorage.getItem("sessionID");

// Create a new session for rammerhead if there is no session in local storage.
if (sessionId === null) {
  api.newsession(function (id) {
    localStorage.setItem("sessionID", id);
  });
}

var n = 0;
var el = document.querySelector(".chrome-tabs");
var chromeTabs = new ChromeTabs();
chromeTabs.init(el);

window.chromeTabs = chromeTabs

var f = document.querySelector("form");
var input = document.querySelector("input");

f.addEventListener("submit", async (event) => {
  event.preventDefault();
  $(".pageContent").css("display", "block");
  if (settings.proxy[0].current === "ultraviolet") {
    //window.navigator.serviceWorker.register('./sw.js', {
    //    scope: __uv$config.prefix
    //}).then(() => {
    //    let url = input.value.trim();
    //    if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
    //    else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;
    //
    //    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    //}, (err) => {
    //    console.log('ServiceWorker registration failed: ', err);
    //});

    $(".pageContent").css({
      bottom: "0",
      "z-index": "200",
      position: "absolute",
      top: "91px",
      width: "100%",
    });

    let url = input.value.trim();

    if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
    else if (!(url.startsWith("https://") || url.startsWith("http://")))
      url = "https://" + url;

    $(".addressbar-urlbar").html(url);

    const response = await bare.fetch(url);
    var responseText = await response.text();
    var parsedResponse = new window.DOMParser().parseFromString(
      responseText,
      "text/html"
    );

    chromeTabs.updateTab(chromeTabs.activeTabEl, {
      title: parsedResponse.title,
      favicon: `https://icon.horse/icon/${url.replace("https://", "")}`
    })

    let src = "https://uv.catsarecool.tk/service/" + __uv$config.encodeUrl(url);
    $(".extOpen").click(() => {
      window.open(src, '_blank').focus();
    })
    
    var frame = $("<iframe>", {
      src: "https://uv.catsarecool.tk/",
      frameborder: 0,
      scrolling: "yes",
      position: "absolute",  
      width: "100%",
      height: "100%",
    })

    frame.appendTo(".pageContent")
    frame.on("load", function () {
      frame.attr("src", src)
      console.log("hi")
    })
    
  } else if (settings.proxy[0].current === "rammerhead") {
    let url = input.value.trim();
    if (!isUrl(url)) {
      url = "https://www.google.com/search?q=" + url;
    } else {
      if (!(url.startsWith("https://") || url.startsWith("https://"))) {
        url = "https://" + url;
      }
    }
    $(".addressbar-urlbar").html(url);
    const response = await bare.fetch(url);
    var responseText = await response.text();
    var parsedResponse = new window.DOMParser().parseFromString(
      responseText,
      "text/html"
    );
    
    chromeTabs.updateTab(chromeTabs.activeTabEl, {
      title: parsedResponse.title,
      favicon: `https://icon.horse/icon/${url.replace("https://", "")}`
    })

    var enableShuffling = true;
    let sessizonId = localStorage.getItem("sessionID");

    api.sessionexists(sessizonId, function (value) {
      if (!(value == true))
        return console.log(
          "session does not exist. try deleting or generating a new session"
        );
      api.editsession(sessizonId, enableShuffling, function () {
        api.shuffleDict(sessizonId, function (shuffleDict) {
          $(".pageContent").css({
            bottom: "0",
            "z-index": "200",
            position: "absolute",
            top: "91px",
            width: "100%",
          });

          let src;
          if (!shuffleDict) {
            src = `https://rh.catsarecool.tk/${sessizonId + "/" + url}`;
          } else {
            var shuffler = new StrShuffler(shuffleDict);
            src = `https://rh.catsarecool.tk/${
              sessizonId + "/" + shuffler.shuffle(url)
            }`;
          }

          $(".extOpen").click(() => {
            window.open(src, '_blank').focus();
          })
          let id = chromeTabs.tabEls.length - 1;
          $("<iframe>", {
            src: src,
            frameborder: 0,
            scrolling: "yes",
            position: "absolute",
            width: "100%",
            height: "100%",
            id: id,
          }).appendTo(".pageContent");
        });
      });
    });
  } else if (settings.proxy[0].current === "womginx") {
    $(".pageContent").css({
      bottom: "0",
      "z-index": "200",
      position: "absolute",
      top: "91px",
      width: "100%",
    });

    let url = input.value.trim();

    if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
    else if (!(url.startsWith("https://") || url.startsWith("http://")))
      url = "https://" + url;

    $(".addressbar-urlbar").html(url);

    const response = await bare.fetch(url);
    var responseText = await response.text();
    var parsedResponse = new window.DOMParser().parseFromString(
      responseText,
      "text/html"
    );

    chromeTabs.updateTab(chromeTabs.activeTabEl, {
      title: parsedResponse.title,
      favicon: `https://icon.horse/icon/${url.replace("https://", "")}`
    })

    let src = "https://womginx.catsarecool.tk/main/" + url;
    $(".extOpen").click(() => {
      window.open(src, '_blank').focus();
    })
    
    var frame = $("<iframe>", {
      src: src,
      frameborder: 0,
      scrolling: "yes",
      position: "absolute",  
      width: "100%",
      height: "100%",
    }).appendTo(".pageContent")
  }
});

console.log(chromeTabs.tabContentWidths);
tabPos =
  chromeTabs.tabContentPositions[chromeTabs.tabContentPositions.length - 1];
$(".chrome-tabs-newtab-btn").css({ left: 239 + tabPos });

$(".fullscreen-btn").click(openFullscreen);
$(".chrome-tabs-newtab-btn").click(() => {
  chromeTabs.addTab({
    title: "New Tab",
    favicon: false,
  });

  let tabPos =
    chromeTabs.tabContentPositions[chromeTabs.tabContentPositions.length - 1];
  let tabWidth =
    chromeTabs.tabContentWidths[chromeTabs.tabContentWidths.length - 1];
  if (tabWidth + tabPos <= $(".chrome-tabs").width()) {
    $(".chrome-tabs-newtab-btn").css({ left: tabWidth + tabPos });
  }
  if (!$(".newTab").length) {
    var num = chromeTabs.tabEls.length - 1;
    var h = newTabHtml.replace("{num}", `${num}newtab`);

    $(".pageContent").after(h);
    var f = $(".newTab form");
    var input = $(".newTab input");

    f.on("submit", async (event) => {
      event.preventDefault();
      $(".pageContent").css("display", "block");
      if (settings.proxy[0].current === "ultraviolet") {
        //window.navigator.serviceWorker.register('./sw.js', {
        //    scope: __uv$config.prefix
        //}).then(() => {
        //    let url = input.value.trim();
        //    if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        //    else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;
        //
        //    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
        //}, (err) => {
        //    console.log('ServiceWorker registration failed: ', err);
        //});

        $(".pageContent").css({
          bottom: "0",
          "z-index": "200",
          position: "absolute",
          top: "91px",
          width: "100%",
        });

        // register service worker
        var request = new XMLHttpRequest();
        request.open("GET", "https://uv.catsarecool.tk/", true);
        request.send();

        let url = input.val().trim();
        if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
        else if (!(url.startsWith("https://") || url.startsWith("http://")))
          url = "https://" + url;

        $(".addressbar-urlbar").html(url);

        const response = await bare.fetch(url);
        var responseText = await response.text();
        var parsedResponse = new window.DOMParser().parseFromString(
          responseText,
          "text/html"
        );
        
        chromeTabs.updateTab(chromeTabs.activeTabEl, {
          title: parsedResponse.title,
          favicon: `https://icon.horse/icon/${url.replace("https://", "")}`
        })

        let src =
          "https://uv.catsarecool.tk/service/" + __uv$config.encodeUrl(url);

          $(".extOpen").click(() => {
            window.open(src, '_blank').focus();
          })
        $("<iframe>", {
          src: src,
          frameborder: 0,
          scrolling: "yes",
          position: "absolute",
          width: "100%",
          height: "100%",
        }).appendTo(".pageContent");
      } else if (settings.proxy[0].current === "rammerhead") {
        let url = input.val().trim();
        if (!isUrl(url)) {
          url = "https://www.google.com/search?q=" + url;
        } else {
          if (!(url.startsWith("https://") || url.startsWith("https://"))) {
            url = "https://" + url;
          }
        }

        $(".addressbar-urlbar").html(url);

        const response = await bare.fetch(url);
        var responseText = await response.text();
        var parsedResponse = new window.DOMParser().parseFromString(
          responseText,
          "text/html"
        );
        
        chromeTabs.updateTab(chromeTabs.activeTabEl, {
          title: parsedResponse.title,
          favicon: `https://icon.horse/icon/${url.replace("https://", "")}`
        })

        var enableShuffling = true;
        let sessizonId = localStorage.getItem("sessionID");

        api.sessionexists(sessizonId, function (value) {
          if (!(value == true))
            return console.log(
              "session does not exist. try deleting or generating a new session"
            );
          api.editsession(sessizonId, enableShuffling, function () {
            api.shuffleDict(sessizonId, function (shuffleDict) {
              $(".pageContent").css({
                bottom: "0",
                "z-index": "200",
                position: "absolute",
                top: "91px",
                width: "100%",
              });

              let src;
              if (!shuffleDict) {
                src = `https://rh.catsarecool.tk/${sessizonId + "/" + url}`;
              } else {
                var shuffler = new StrShuffler(shuffleDict);
                src = `https://rh.catsarecool.tk/${
                  sessizonId + "/" + shuffler.shuffle(url)
                }`;
              }

              $(".extOpen").click(() => {
                window.open(src, '_blank').focus();
              })
              
              let id = chromeTabs.tabEls.length - 1;
              $("<iframe>", {
                src: src,
                frameborder: 0,
                scrolling: "yes",
                position: "absolute",
                width: "100%",
                height: "100%",
                id: id,
              }).appendTo(".pageContent");
            });
          });
        });
      }
    });

    $(".pageContent").css("display", "none");
  }
});

el.addEventListener("preCloseTab", (detail) => {
  console.log("dos", detail.tabEl);
});
el.addEventListener("tabRemove", (detail) => {
  let tabPos =
    chromeTabs.tabContentPositions[chromeTabs.tabContentPositions.length - 1];
  let tabWidth =
    chromeTabs.tabContentWidths[chromeTabs.tabContentWidths.length - 1];
  if (tabWidth + tabPos <= $(".chrome-tabs").width()) {
    $(".chrome-tabs-newtab-btn").css({ left: tabWidth + tabPos });
  }

  console.log(detail.tabEl);
});

window.addEventListener("load", (event) => {
  openFullscreen();
});

function loadSettingsPage() {
  var $page = $(".settings");
  $page.css("height", "100%");
  $page.fadeOut(function () {
    $page.load("settings.html", function () {
      $page.fadeIn();
    });
  });
}

function isUrl(val = "") {
  if (
    /^http(s?):\/\//.test(val) ||
    (val.includes(".") && val.substr(0, 1) !== " ")
  )
    return true;
  return false;
}
