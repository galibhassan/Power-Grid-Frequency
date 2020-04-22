window.addEventListener("load", function () {
  const traverse = (treeData, treeInDOM) => {
    treeData.forEach((branch) => {
      const node = document.createElement("div");
      node.classList.add("branch");
      const nodeHeader = document.createElement("div");
      nodeHeader.classList.add("node-header");
      const expandToggleButton = document.createElement("button");
      expandToggleButton.classList.add("expand-button");
      const branchName = document.createElement("div");
      branchName.classList.add("branch-name");
      branchName.innerHTML = branch.name;

      if (branch.type === "folder") {
        expandToggleButton.innerHTML = "-";
        nodeHeader.appendChild(expandToggleButton);
        nodeHeader.appendChild(branchName);
      } else if (branch.type === "file") {
        const downloadLink = document.createElement("a");
        downloadLink.appendChild(branchName);
        downloadLink.href = branch.downloadURL;
        nodeHeader.appendChild(downloadLink);
      }
      node.appendChild(nodeHeader);

      // recursion
      if (branch.type === "folder") {
        traverse(branch.children, node);
      }
      treeInDOM.appendChild(node);
    });
  };

  function handleFoldUnfold(event) {
    const buttonContainerSiblings = getSiblings(event.target.parentElement);

    if (event.target.innerHTML === "-") {
      event.target.innerHTML = "+";
      buttonContainerSiblings.forEach((branch) => {
        branch.classList.remove("unfold");
        branch.classList.add("fold");
      });
    } else {
      event.target.innerHTML = "-";
      buttonContainerSiblings.forEach((branch) => {
        branch.classList.remove("fold");
        branch.classList.add("unfold");
      });
    }
  }

  const getSiblings = (node) => {
    const parent = node.parentElement;
    const siblings = [];
    const siblingsIncludingThis = Array.from(parent.children);
    siblingsIncludingThis.forEach((sibling) => {
      if (sibling !== node) {
        siblings.push(sibling);
      }
    });
    return siblings;
  };

  const treeInDOM = document.getElementById("tree");
  traverse(treeData, treeInDOM);
  // click to fold or unfold
  const expandToggleButtons = Array.from(document.querySelectorAll(".expand-button"));
  expandToggleButtons.forEach((expandToggleButton) => {
    expandToggleButton.addEventListener("click", handleFoldUnfold);
  });
});
