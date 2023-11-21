# Project Info
 Loads the 3D model and the associated hotspots using the fetch function. Hotspots are used to show information on different parts of the 3D model when the user hovers over them.

Defines two functions: showInfo and hideInfo. These functions are used to show and hide the information displayed on the hotspots.

Loads the material information using the fetch function. The material information is used to display information about different materials used in the 3D model.

Creates a function loadMaterialInfo that adds the material information to the DOM.

Attaches event listeners to the 3D model and the hotspots. When the user hovers over a hotspot, the corresponding information is displayed using the showInfo function. When the user moves the cursor away from the hotspot, the information is hidden using the hideInfo function.

Attaches an event listener to the 3D model to detect when it has finished loading. When the model is loaded, the hotspots are made visible using the modelLoaded function.

If the fetched data for the hotspots or the material information is not found, the showErrorMessage function is called, which displays an error message to the user.

# Project License 

MIT

# Author 

Dev Pandya


