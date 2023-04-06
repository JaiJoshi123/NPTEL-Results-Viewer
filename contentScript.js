(() => {
    // let youtubeLeftControls, youtubePlayer;
    // let currentVideo = "";
    // let currentVideoBookmarks = [];
  
    
    const windowLoaded = async () => {
        // const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
        const scraped_data = document.querySelectorAll(".rowContent");
        let scores = []
        let flag = 0;
        console.log(scraped_data)
        for(let i=0;i<scraped_data.length;i++){
            if(scraped_data[i].innerText.includes("Announcement")){
                break;
            }
            if(flag == 1){
                try{
                    scores.push(parseFloat(scraped_data[i].firstChild.nextSibling.firstChild.nextSibling.innerText))
                }catch(e){
                    scores.push(0)
                }
            }
            if(scraped_data[i].innerText == "Assessment scores"){
                flag=1;
            }   
            console.log(scraped_data[i].innerText)
        }

        if(scores.length == 13 || scores.length == 9 || scores.length == 5){
            scores = scores.slice(1,)
        }
        
        scores.sort(function(a, b) {return a - b;});
        console.log(scores)
        let total_score = 0, actual_score;
        for(let i=(scores.length == 12 ? 4 : (scores.length == 8 ? 2 : 1));i<scores.length;i++){
            total_score+= scores[i]
        }
        actual_score = total_score / (scores.length == 12 ? 8 : scores.length*0.75);
        console.log(actual_score);

        let page = document.getElementsByClassName("pageFont")[0]
        let score_element = document.createElement("div")
        score_element.className = "rowContent"

        let average_score = document.createElement("h3")
        average_score.textContent = "Average score: "+ actual_score.toFixed(2);

        let counted_average = document.createElement("h3")
        counted_average.textContent = "Counted score(25%): "+ (actual_score*0.25).toFixed(2)

        score_element.appendChild(average_score)
        score_element.appendChild(counted_average)

        page.appendChild(document.createElement("hr"))
        page.appendChild(score_element)
    //   currentVideoBookmarks = await fetchBookmarks();
  
    //   if (!bookmarkBtnExists) {
    //     const bookmarkBtn = document.createElement("img");
  
    //     bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
    //     bookmarkBtn.className = "ytp-button " + "bookmark-btn";
    //     bookmarkBtn.title = "Click to bookmark current timestamp";
  
    //     youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
    //     youtubePlayer = document.getElementsByClassName('video-stream')[0];
  
    //     youtubeLeftControls.appendChild(bookmarkBtn);
    //     bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    //   }
    };
  
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
      const { type } = obj;
  
      if (type === "NEW") {
        windowLoaded();
      }
    });
  
    windowLoaded();
})();