window.addEventListener("load", function () {
  const treeInDOM = document.getElementById("tree");

  // ----------------fold all--------------------------
  const foldAllButton = document.createElement("button");
  foldAllButton.innerHTML = "Collapse All";
  treeInDOM.appendChild(foldAllButton);
  foldAllButton.classList.add("fold-all-button");
  foldAllButton.addEventListener("click", handleFoldAllButton);

  function handleFoldAllButton(event) {
    const tree = getSiblings(event.target);
    traverseAndFold(tree);
  }

  const traverseAndFold = (tree) => {
    tree.forEach((branch) => {
      if (branch.parentElement.id !== "tree" && branch.classList.contains("branch")) {
        branch.classList.remove("unfold");
        branch.classList.add("fold");
        const expandButtons = Array.from(document.querySelectorAll(".expand-button"));
        expandButtons.forEach((expandToggleButton) => {
          expandToggleButton.innerHTML = "+";
          expandToggleButton.classList.remove("not-expandable");
          expandToggleButton.classList.add("expandable");
        });
      }

      if (branch.classList.contains("branch")) {
        traverseAndFold(Array.from(branch.children));
      }
    });
  };
  // ------------------------------------------

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
        /*         expandToggleButton.classList.remove("expandable");
        expandToggleButton.classList.add("not-expandable"); */
        nodeHeader.appendChild(expandToggleButton);
        nodeHeader.appendChild(branchName);
      } else if (branch.type === "file") {
        const downloadLink = document.createElement("a");
        downloadLink.classList.add("download-link");
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
      event.target.classList.remove("not-expandable");
      event.target.classList.add("expandable");

      buttonContainerSiblings.forEach((branch) => {
        branch.classList.remove("unfold");
        branch.classList.add("fold");
      });
    } else {
      event.target.innerHTML = "-";
      event.target.classList.remove("expandable");
      event.target.classList.add("not-expandable");
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

  traverse(treeData, treeInDOM);
  // click to fold or unfold
  const expandToggleButtons = Array.from(document.querySelectorAll(".expand-button"));
  expandToggleButtons.forEach((expandToggleButton) => {
    expandToggleButton.addEventListener("click", handleFoldUnfold);
  });

  //traverseAndFold(Array.from(treeInDOM.children));
});
