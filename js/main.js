(() => {
  // variables
  
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const infoBoxes = [];
  const materialListData = [];
 

function showErrorMessage(message) {
    // Create a new div element for the error message
    const errorDiv = document.createElement('div');
   
   
   
    // text content of the error message
    errorDiv.textContent = message;
   
    // Append the error message to the body of the document
    document.body.appendChild(errorDiv);
   
    // Remove the error message after 30000
    setTimeout(() => {
       document.body.removeChild(errorDiv);
    }, 30000);
   }


  // functions
  function modelLoaded() {
   
    hotspots.forEach((hotspot) => {
      hotspot.style.display = "block";
    });
}



function loadInfoBoxes() {

  fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`No Intenet connection: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Info Boxes:", data);
     


      infoBoxes.push(...data);

      hotspots.forEach((hotspot, index) => {
        const annotation = hotspot.children[0]; // Assuming .HotspotAnnotation is the first child

        const titleElement = document.createElement("h2");
        titleElement.textContent = infoBoxes[index].heading;

        const textElement = document.createElement("p");
        textElement.textContent = infoBoxes[index].description;

        annotation.appendChild(titleElement);
        annotation.appendChild(textElement);
      });
    })
    .catch((error) => {
      console.error("404 info boxes not found:", error);
      showErrorMessage(`Error: InfoBox Failed To Load ${error.message}`);
    
    });
}

  loadInfoBoxes();

  function loadMaterialInfo() {
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`No internet connection: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
       
        console.log("Material Info Data:", data);

        materialListData.push(...data);

        materialListData.forEach((material) => {
          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });
      })
      .catch((error) => {
        console.error("404 matririals not found", error);
        showErrorMessage(`Error: Matrials failed to load ${error.message}`);
       
      });
  }
  loadMaterialInfo();

  
  function showInfo(slot) {
    let selected = document.querySelector(`#hotspot-${slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
 }

 function hideInfo(slot) {
    let selected = document.querySelector(`#hotspot-${slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
 }

 // Event listeners
 model.addEventListener("load", modelLoaded);

 hotspots.forEach(function (hotspot, index) {
    hotspot.addEventListener("mouseenter", () => showInfo(index + 1));
    hotspot.addEventListener("mouseleave", () => hideInfo(index + 1));
 });
})();
