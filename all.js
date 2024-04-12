// 搜尋函式的製造函式
const searchFuncFactory = (baseUrl, searchContentId, dynamicPath) => {
  return function (baseUrl, searchContentId, dynamicPath, e) {
    e.preventDefault();
    const searchContent = document.getElementById(searchContentId).value;

    if (searchContent !== "") {
      baseUrl += dynamicPath + searchContent;
    }

    window.open(baseUrl, "_blank");
  }.bind(this, baseUrl, searchContentId, dynamicPath);
};

// 定義 DOM 和搜尋函式
const searchBtnGroup = [
  document.getElementById("googleSearchBtn"),
  document.getElementById("youtubeSearchBtn"),
  document.getElementById("hackmdSearchBtn"),
];

const searchInputGroup = [
  document.getElementById("googleSearchContent"),
  document.getElementById("youtubeSearchContent"),
  document.getElementById("hackmdSearchContent"),
];

const searchFuctionGroup = [
  searchFuncFactory(
    "https://www.google.com.tw",
    "googleSearchContent",
    "/search?q="
  ),
  searchFuncFactory(
    "https://www.youtube.com",
    "youtubeSearchContent",
    "/results?search_query="
  ),
  searchFuncFactory(
    "https://hackmd.io",
    "hackmdSearchContent",
    "?nav=search&q="
  ),
];

// 迭代綁定監聽事件
searchBtnGroup.forEach((btn, idx) => {
  btn.addEventListener("click", (e) => {
    searchFuctionGroup[idx](e);
    searchInputGroup[idx].value = "";
  });
});

searchInputGroup.forEach((input, idx) => {
  input.addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }

    searchFuctionGroup[idx](e);
    input.value = "";
  });
});

document.addEventListener("keypress", (e) => {
  if (e.key !== "/") {
    return;
  }

  e.preventDefault();
  document.getElementById("googleModalBtn").click();
  setTimeout(() => {
    const googleSearch = document.getElementById("googleSearchContent");
    googleSearch.focus();
    googleSearch.value = "";
  }, 500);
});
