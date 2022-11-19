import portfolioList from "./PortFolios/portfolioFile.js";

function createArticle(imgTxt, titleTxt, dateTxt, descriptionTxt, buttonURL) {
    var articleDiv = document.createElement("div");
    articleDiv.className = "article";
    var articleImage = document.createElement("div");
    articleImage.className = "article_img";
    var imgEle = document.createElement("img");
    imgEle.src = imgTxt;

    var portfolioDiv = document.createElement("div");
    portfolioDiv.className = "article_portfolio";
    var content = document.createElement("title");
    content.className = "portfolio_content";
    var title = document.createElement("div");
    title.className = "portfolio_title";
    var name = document.createElement("div");
    name.className = "portfolio_name";
    var date = document.createElement("div");
    date.className = "portfolio_date";
    name.innerText = titleTxt;
    date.innerText = dateTxt;
    var description = document.createElement("div");
    description.className = "portfolio_description";
    description.innerText = descriptionTxt;

    var button = document.createElement("div");
    button.className = "portfolio_linkButton";
    var aEle = document.createElement("a");
    aEle.href = buttonURL;
    aEle.innerText = "Link";
    articleImage.appendChild(imgEle);

    title.appendChild(name);
    title.appendChild(date);
    
    content.appendChild(title);
    content.appendChild(description);

    button.appendChild(aEle);

    portfolioDiv.appendChild(content);
    portfolioDiv.appendChild(document.createElement("hr"));
    portfolioDiv.appendChild(button);

    articleDiv.appendChild(articleImage);
    articleDiv.appendChild(portfolioDiv);

    return articleDiv;

}

function createPageDiv(leftValue, rightValue) {
    var pageWrap = document.createElement("div");
    pageWrap.id = "pages_wrap";
    var left = document.createElement("div");
    left.className = "pages move_page";
    left.innerText = "<";
    left.addEventListener("click", () => { changePage(true) });
    var center = document.createElement("div");
    center.className = "pages";
    center.id = "page";
    var text = String(leftValue) + " / " + String(rightValue);
    center.innerText = text;
    var right = document.createElement("dic");
    right.className = "pages move_page";
    right.innerText = ">";
    right.addEventListener("click", () => { changePage(false) });
    right.onclick = "changePage(false))";

    pageWrap.appendChild(left);
    pageWrap.appendChild(center);
    pageWrap.appendChild(right);

    return pageWrap;
}

function changePage(isLeft) {
    if(isLeft) {
        if(curPage == 1) return;
        curPage--;
    }
    else {
        if(curPage == maxPage) return;
        curPage++;
    }
    articles.innerHTML = "";
    for(var i = 0 ; i < articleLength ; i++) {
        if(i+((curPage-1) * 6) >= portfolioList.length) {
            articles.appendChild(
                createArticle(
                    "",
                    "",
                    "",
                    "",
                    "#"
                )
            );
        }
        else {
            articles.appendChild(
                createArticle(
                    portfolioList[i+((curPage-1) * 6)]["image"],
                    portfolioList[i+((curPage-1) * 6)]["title"],
                    portfolioList[i+((curPage-1) * 6)]["date"],
                    portfolioList[i+((curPage-1) * 6)]["description"],
                    portfolioList[i+((curPage-1) * 6)]["buttonURL"]
                )
            );
        }
        
    }
    articles.appendChild(createPageDiv(curPage, maxPage));
}

var curPage = 1;
const articleLength = 6;
var articles = document.getElementById('section_articles_container');
articles.innerHTML = "";



for(var i = 0 ; i < articleLength ; i++) {
    if(i >= portfolioList.length) {
        articles.appendChild(
            createArticle(
                "",
                "",
                "",
                "",
                "#"
            )
        );
    }
    else {
        articles.appendChild(
            createArticle(
                portfolioList[i]["image"],
                portfolioList[i]["title"],
                portfolioList[i]["date"],
                portfolioList[i]["description"],
                portfolioList[i]["buttonURL"]
            )
        );
    }
    
}

var maxPage = articleLength > portfolioList.length ? 1 : Math.floor((portfolioList.length-1) / articleLength) + 1;
articles.appendChild(createPageDiv(curPage, maxPage));

var pageDiv = document.getElementById("page");



