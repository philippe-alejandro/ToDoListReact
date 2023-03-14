

function searchedProjTable (inputTxt, elPosProj, itemKeys) {
  if (elPosProj !== -1 && inputTxt.length > 0 && !document.querySelector("#searchedTaskDiv").classList.contains("displayBlock") && !document.querySelector("#searchedProjDiv").classList.contains("displayBlock")) {
    $(".tbProjRow").empty();
    document.querySelector("#searchedProjDiv").classList.add("displayBlock");
    document.querySelector("#content23").classList.add("displayBlock");
    document.querySelector("#content231").classList.add("displayBlock");
    // Add data to the table
    const projTableRows = document.getElementsByClassName("tbProjRow");
    const projSelectedValues = Object.values(allStorage()[1][elPosProj]);
    // console.log(allStorage()[1][elPosProj]);
    for (let i = 0; i < projTableRows.length; i++) {
      // console.log(itemKeys[i], projSelectedValues[i]);
      let tbDataPoint1 = document.createElement("td");
      tbDataPoint1.setAttribute('class', 'tbDataProj');
      tbDataPoint1.setAttribute('data-testid', 'tbDataProj');
      tbDataPoint1.appendChild(document.createTextNode(itemKeys[i]));
      let tbDataPoint2 = document.createElement("td");
      console.log(itemKeys[i]);
      if (itemKeys[i] === "Description:") {
        tbDataPoint2.setAttribute('class', 'tbDataProj');
        tbDataPoint2.setAttribute('data-testid', 'tbDataProj');
        tbDataPoint2.classList.add('Description');
        tbDataPoint2.appendChild(document.createTextNode(projSelectedValues[i].replace(' - Proj', '')));
      } else {
        tbDataPoint2.setAttribute('class', 'tbDataProj');
        tbDataPoint2.setAttribute('data-testid', 'tbDataProj');
        tbDataPoint2.appendChild(document.createTextNode(projSelectedValues[i].replace(' - Proj', '')));
      }
      // console.log(tbDataPoint1, tbDataPoint2);
      projTableRows[i].append(tbDataPoint1, tbDataPoint2);
    }
    $('#content21').css({
      'grid-column': '1 / 2', 
      'grid-row': '1 / 2'
    });
    $('#content22').css({
      'grid-column': '1 / 2', 
      'grid-row': '2 / 3'
    });
    document.querySelector("#searchedProjDiv").classList.add("displayBlock");
    $('#searchedProjDiv').css({
      'grid-column': '1 / 3',
      'grid-row': '1 / 2'
    });
  } else if (elPosProj !== -1 && inputTxt.length > 0 && document.querySelector("#searchedTaskDiv").classList.contains("displayBlock") && !document.querySelector("#searchedProjDiv").classList.contains("displayBlock")) {
    $(".tbProjRow").empty();
    document.querySelector("#searchedProjDiv").classList.add("displayBlock");
    document.querySelector("#content23").classList.add("displayBlock");
    document.querySelector("#content231").classList.add("displayBlock");
    // Add data to the table
    const projTableRows = document.getElementsByClassName("tbProjRow");
    const projSelectedValues = Object.values(allStorage()[1][elPosProj]);
    // console.log(allStorage()[1][elPosProj]);
    for (let i = 0; i < projTableRows.length; i++) {
      // console.log(itemKeys[i], projSelectedValues[i]);
      let tbDataPoint1 = document.createElement("td");
      tbDataPoint1.setAttribute('class', 'tbDataProj');
      tbDataPoint1.setAttribute('data-testid', 'tbDataProj');
      tbDataPoint1.appendChild(document.createTextNode(itemKeys[i]));
      let tbDataPoint2 = document.createElement("td");
      console.log(itemKeys[i]);
      if (itemKeys[i] === "Description:") {
        tbDataPoint2.setAttribute('class', 'tbDataProj');
        tbDataPoint2.setAttribute('data-testid', 'tbDataProj');
        tbDataPoint2.classList.add('Description');
        tbDataPoint2.appendChild(document.createTextNode(projSelectedValues[i].replace(' - Proj', '')));
      } else {
        tbDataPoint2.setAttribute('class', 'tbDataProj');
        tbDataPoint2.setAttribute('data-testid', 'tbDataProj');
        tbDataPoint2.appendChild(document.createTextNode(projSelectedValues[i].replace(' - Proj', '')));
      }
      // console.log(tbDataPoint1, tbDataPoint2);
      projTableRows[i].append(tbDataPoint1, tbDataPoint2);
    }

    $('#content21').css({
      'grid-column': '1 / 2', 
      'grid-row': '1 / 2'
    });
    $('#content22').css({
      'grid-column': '1 / 2', 
      'grid-row': '2 / 3'
    });
    $('#searchedTaskDiv').css({
      'grid-column': '1 / 2',
      'grid-row': '1 / 2'
    });
    document.querySelector("#searchedProjDiv").classList.add("displayBlock");
    $('#searchedProjDiv').css({
      'grid-column': '2 / 3',
      'grid-row': '1 / 2'
    });
  } else if (elPosProj !== -1 && inputTxt.length > 0 && document.querySelector("#searchedTaskDiv").classList.contains("displayBlock") && document.querySelector("#searchedProjDiv").classList.contains("displayBlock")) {
    $(".tbProjRow").empty();
    document.querySelector("#searchedProjDiv").classList.add("displayBlock");
    document.querySelector("#content23").classList.add("displayBlock");
    document.querySelector("#content231").classList.add("displayBlock");
    // Add data to the table
    const projTableRows = document.getElementsByClassName("tbProjRow");
    const projSelectedValues = Object.values(allStorage()[1][elPosProj]);
    // console.log(allStorage()[1][elPosProj]);
    for (let i = 0; i < projTableRows.length; i++) {
      // console.log(itemKeys[i], projSelectedValues[i]);
      let tbDataPoint1 = document.createElement("td");
      tbDataPoint1.setAttribute('class', 'tbDataProj');
      tbDataPoint1.setAttribute('data-testid', 'tbDataProj');
      tbDataPoint1.appendChild(document.createTextNode(itemKeys[i]));
      let tbDataPoint2 = document.createElement("td");
      console.log(itemKeys[i]);
      if (itemKeys[i] === "Description:") {
        tbDataPoint2.setAttribute('class', 'tbDataProj');
        tbDataPoint2.setAttribute('data-testid', 'tbDataProj');
        tbDataPoint2.classList.add('Description');
        tbDataPoint2.appendChild(document.createTextNode(projSelectedValues[i].replace(' - Proj', '')));
      } else {
        tbDataPoint2.setAttribute('class', 'tbDataProj');
        tbDataPoint2.setAttribute('data-testid', 'tbDataProj');
        tbDataPoint2.appendChild(document.createTextNode(projSelectedValues[i].replace(' - Proj', '')));
      }
      // console.log(tbDataPoint1, tbDataPoint2);
      projTableRows[i].append(tbDataPoint1, tbDataPoint2);
    }

    $('#content21').css({
      'grid-column': '1 / 2', 
      'grid-row': '1 / 2'
    });
    $('#content22').css({
      'grid-column': '1 / 2', 
      'grid-row': '2 / 3'
    });
    $('#searchedTaskDiv').css({
      'grid-column': '1 / 2',
      'grid-row': '1 / 2'
    });
    $('#searchedProjDiv').css({
      'grid-column': '2 / 3',
      'grid-row': '1 / 2'
    });
  }
}