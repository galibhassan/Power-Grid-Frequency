// open home page
tabContentIds.forEach((tabContentId) => {
  const tab = document.getElementById(tabContentId);
  if (tabContentId !== "tab-content-home") {
    tab.classList.remove("tab-visible");
    tab.classList.add("tab-invisible");
  } else {
    tab.classList.remove("tab-invisible");
    tab.classList.add("tab-visible");
  }
});

// make tab links clickable
tabLinkIds.forEach((tabLink) => {
  document.getElementById(tabLink).addEventListener("click", handleTabClick);
});

function handleTabClick(event) {
  const clickedElement = event.target;

  //assuming the form 'tab-link-home', etc
  const pointedContentId = clickedElement.id.replace("link", "content");
  console.log(pointedContentId);
  tabContentIds.forEach((tabContentId) => {
    if (tabContentId === pointedContentId) {
      document.getElementById(tabContentId).classList.remove("tab-invisible");
      document.getElementById(tabContentId).classList.add("tab-visible");
    } else {
      document.getElementById(tabContentId).classList.remove("tab-visible");
      document.getElementById(tabContentId).classList.add("tab-invisible");
    }
  });
}
