// ============================================
// COURBE EN VASQUE - Bowl-Shaped Curve for Max/MSP
// ============================================
// Creates a symmetrical bowl curve using hyperbolic tangent (tanh)
// Two S-curves mirrored around x=0
//
// INLETS:
//   0: x value (position)
//   1: depth (profondeur)
//   2: width (largeur)
//   3: steepness (pente du fond)
//
// OUTLETS:
//   0: y value (calculated curve value)
// ============================================

autowatch = 1;
inlets = 4;
outlets = 1;

// ============================================
// PARAMETERS (with default values)
// ============================================
var depth = 1.0;        // Profondeur de la vasque (vertical scale)
var width = 1.0;        // Largeur de la vasque (horizontal scale)
var steepness = 2.0;    // Pente/courbure du fond (sharpness)

// ============================================
// INITIALIZATION
// ============================================
function loadbang() {
    post("Courbe en Vasque loaded\n");
    post("Defaults: depth=" + depth + ", width=" + width + ", steepness=" + steepness + "\n");
}

// ============================================
// ASSIST STRINGS
// ============================================
function setinletassist() {
    setinletassist(0, "x value (position)");
    setinletassist(1, "depth (profondeur)");
    setinletassist(2, "width (largeur)");
    setinletassist(3, "steepness (pente)");
}

function setoutletassist() {
    setoutletassist(0, "y value (curve output)");
}

// ============================================
// CUSTOM TANH IMPLEMENTATION
// ============================================
// Max/MSP uses old JavaScript without Math.tanh
// Mathematical definition: tanh(x) = (e^x - e^-x) / (e^x + e^-x)
// Simplified form: tanh(x) = (e^2x - 1) / (e^2x + 1)
function tanh(x) {
    if (x > 20) return 1.0;  // Prevent overflow, tanh(20) ≈ 1
    if (x < -20) return -1.0; // Prevent underflow, tanh(-20) ≈ -1

    var e2x = Math.exp(2 * x);
    return (e2x - 1) / (e2x + 1);
}

// ============================================
// MAIN CURVE CALCULATION FUNCTION
// ============================================
// Calculates the bowl curve using tanh for smooth S-shape
// The curve is symmetrical around x=0
function calculateBowlCurve(x) {
    // Normalize x by width to control horizontal spread
    var normalizedX = x / width;

    // Calculate the S-curve using tanh
    // tanh creates a natural S-curve from -1 to 1
    // steepness controls how sharp the transition is
    var curveValue = tanh(steepness * normalizedX);

    // Scale by depth to control vertical amplitude
    var y = depth * curveValue;

    return y;
}

// ============================================
// INPUT HANDLERS
// ============================================

// Handle float input on any inlet
function msg_float(value) {
    switch (inlet) {
        case 0:
            // x value received - calculate and output curve value
            var y = calculateBowlCurve(value);
            outlet(0, y);
            break;
        case 1:
            // depth parameter
            depth = value;
            break;
        case 2:
            // width parameter
            width = Math.max(0.001, value); // Prevent division by zero
            break;
        case 3:
            // steepness parameter
            steepness = value;
            break;
    }
}

// Handle integer input (converted to float)
function msg_int(value) {
    msg_float(value);
}

// Handle list input [x, depth, width, steepness]
function list() {
    var args = arrayfromargs(arguments);

    if (args.length >= 1) {
        var x = args[0];

        // Update parameters if provided
        if (args.length >= 2) depth = args[1];
        if (args.length >= 3) width = Math.max(0.001, args[2]);
        if (args.length >= 4) steepness = args[3];

        // Calculate and output
        var y = calculateBowlCurve(x);
        outlet(0, y);
    }
}

// ============================================
// MESSAGE HANDLERS FOR NAMED PARAMETERS
// ============================================

function setdepth(value) {
    depth = value;
    post("Depth set to: " + depth + "\n");
}

function setwidth(value) {
    width = Math.max(0.001, value);
    post("Width set to: " + width + "\n");
}

function setsteepness(value) {
    steepness = value;
    post("Steepness set to: " + steepness + "\n");
}

// Set all parameters at once
function setparams(d, w, s) {
    depth = d;
    width = Math.max(0.001, w);
    steepness = s;
    post("Parameters set: depth=" + depth + ", width=" + width + ", steepness=" + steepness + "\n");
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Bang outputs current parameter values as a list
function bang() {
    outlet(0, [depth, width, steepness]);
}

// Get current parameters
function getparams() {
    post("Current parameters:\n");
    post("  Depth (profondeur): " + depth + "\n");
    post("  Width (largeur): " + width + "\n");
    post("  Steepness (pente): " + steepness + "\n");
}

// Reset to default values
function reset() {
    depth = 1.0;
    width = 1.0;
    steepness = 2.0;
    post("Parameters reset to defaults\n");
}

// ============================================
// INFORMATION
// ============================================
function info() {
    post("\n=== COURBE EN VASQUE ===\n");
    post("Bowl-shaped curve generator using tanh\n");
    post("\nUSAGE:\n");
    post("  Send x value to inlet 0 to get y output\n");
    post("  Send parameters to inlets 1-3 or use messages:\n");
    post("    'setdepth <value>' - set profondeur\n");
    post("    'setwidth <value>' - set largeur\n");
    post("    'setsteepness <value>' - set pente\n");
    post("    'setparams <d> <w> <s>' - set all at once\n");
    post("    'getparams' - display current values\n");
    post("    'reset' - reset to defaults\n");
    post("    'bang' - output current parameters\n");
    post("\nCURRENT VALUES:\n");
    post("  Depth: " + depth + "\n");
    post("  Width: " + width + "\n");
    post("  Steepness: " + steepness + "\n");
    post("========================\n\n");
}
