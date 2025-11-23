// import React, { useEffect } from "react";
// // import "./Raindrops.css";

// const Raindrops = () => {
//   useEffect(() => {
//     const createRaindrop = () => {
//       const raindrop = document.createElement("div");
//       raindrop.className = "raindrop";
//       raindrop.style.left = `${Math.random() * 100}vw`; // Random position
//       raindrop.style.animationDuration = `${Math.random() * 1.5 + 0.5}s`; // Random speed

//       document.body.appendChild(raindrop);

//       // Remove raindrop after it falls
//       setTimeout(() => {
//         raindrop.remove();
//       }, 2000);
//     };

//     const interval = setInterval(createRaindrop, 50); // Create a raindrop every 50ms

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   return null;
// };

// export default Raindrops;

import React, { useEffect } from "react";

const Fireflies = () => {
  useEffect(() => {
    const createFirefly = () => {
      const f = document.createElement("div");
      f.className = "firefly";

      f.style.left = `${Math.random() * 100}vw`;
      f.style.top = `${Math.random() * 100}vh`; // spawn anywhere on screen
      f.style.animationDuration = `${Math.random() * 4 + 3}s`;

      document.body.appendChild(f);

      setTimeout(() => f.remove(), 8000);
    };

    const interval = setInterval(createFirefly, 200);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default Fireflies;
