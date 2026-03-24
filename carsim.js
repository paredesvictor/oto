const Max = require('max-api');

class Car {
  constructor(params = {}) {
    // Physical constants
    this.m = params.mass ?? 1500;              // kg
    this.F_max = params.maxForce ?? 5000;      // N (traction-limited)
    this.F_brake_max = params.maxBrake ?? 10000; // N
    this.P_max = params.maxPower ?? 100000;    // W (100 kW)

    this.rho = 1.2;        // air density (kg/m^3)
    this.Cd = 0.3;         // drag coefficient
    this.A = 2.2;          // frontal area (m^2)
    this.Cr = 0.015;       // rolling resistance coefficient
    this.g = 9.81;

    this.v = 0;            // current speed (m/s)
  }

  step(throttle, brake, dt) {
    // Clamp inputs
    throttle = Math.max(0, Math.min(1, throttle));
    brake = Math.max(0, Math.min(1, brake));

    const v = this.v;
    const eps = 0.1; // avoid division by zero

    // --- Drive force with power limit ---
    const F_drive_force_limited = throttle * this.F_max;
    const F_drive_power_limited = (throttle * this.P_max) / Math.max(v, eps);

    const F_drive = Math.min(F_drive_force_limited, F_drive_power_limited);

    // --- Braking force ---
    const F_brake = brake * this.F_brake_max;

    // --- Resistive forces ---
    const F_drag = 0.5 * this.rho * this.Cd * this.A * v * v;
    const F_roll = this.Cr * this.m * this.g;

    // --- Net force ---
    const F_net = F_drive - F_brake - F_drag - F_roll;

    // --- Acceleration ---
    const a = F_net / this.m;

    // --- Integrate speed ---
    this.v += a * dt;

    // Prevent going backwards (simple model)
    if (this.v < 0) this.v = 0;

    return {
      speed: this.v,        // m/s
      speedKmh: this.v * 3.6,
      acceleration: a       // m/s^2
    };
  }
}


const car = new Car({
  mass: 1500,
  maxForce: 5000,
  maxBrake: 10000,
  maxPower: 120000 // 120 kW
});


var throttle = 0;
var brake = 0;


Max.addHandler("throttle", (msg) => {
	throttle = msg
	const state = car.step(throttle, brake, 0.02);
	Max.outlet(["speed", state.speedKmh]);
	Max.outlet(["acceleration", state.acceleration]);
	console.log(state.acceleration);
});

Max.addHandler("brake", (msg) => {
	brake = msg;
});