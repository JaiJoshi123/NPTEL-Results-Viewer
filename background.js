chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("/student/home") && tab.url.includes("onlinecourses.nptel.ac.in")) {
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
      });
    }
  });