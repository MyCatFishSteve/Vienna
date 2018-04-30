var CanvasBackground = {};

var x = 0;
var y = 0;

// VARIABLES START__________________________
CanvasBackground.canvas   = null;
CanvasBackground.context  = null;
CanvasBackground.gradient = null;

CanvasBackground.width  = 0;
CanvasBackground.height = 0;
// VARIABLES END____________________________

CanvasBackground.DrawFrame = () => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
};

/*
 * GENERATION METHODS
 */
CanvasBackground.RegenerateViewport = () => {
    width = $(window).innerWidth();
    height = $(window).innerHeight();
    canvas.width = this.width;
    canvas.height = this.height;
};

CanvasBackground.RegenerateGradient = () => {
    gradient = context.createRadialGradient(
        width / 2 + (x * 10),
        height * 0.9,
        height * 1.5,
        width / 2 + (x * 10),
        height * 1.1,
        0
    );
    gradient.addColorStop(0, "#000000");
    gradient.addColorStop(1, "#000055");
};

CanvasBackground.Init = () => {
    // Get the HTML Canvas element
    canvas = $("#canvasbackground")[0];
    if (!canvas)
        throw "Canvas element not found. Exiting.";
    // Get Canvas Context from document
    context = canvas.getContext("2d");
    if (!context)
        throw "Canvas context could not be retrieved. Exiting.";
    // Generate Viewport
    CanvasBackground.RegenerateViewport();
    // Generate Gradient
    CanvasBackground.RegenerateGradient();
    // Draw the first frame
    window.requestAnimationFrame(CanvasBackground.DrawFrame);
};

/*
 * ----------------------------------------------------------------------------------
 * Script setup functions
 */
window.onload = () => {
    // Initialise the script
    CanvasBackground.Init();
};

window.onresize = () => {
    CanvasBackground.RegenerateViewport();
    CanvasBackground.RegenerateGradient();
    window.requestAnimationFrame(CanvasBackground.DrawFrame);  
};