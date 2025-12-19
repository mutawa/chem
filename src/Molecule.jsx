import { motion } from "framer-motion";

function Molecule({ x, y, index, temp, name, color, isBoil = false }) {
  const map = (value, in_min, in_max, out_min, out_max) => {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };

  let magnitude = map(temp, 0, 100, 0, 10);

  if (name === "S") {
    if (temp < 50) {
      magnitude = 0;
    } else {
      magnitude = map(temp, 50, 100, 0, 3);
    }
  } else if (name === "G") {
    magnitude = map(temp, 0, 100, 5, 20);
  }

  return (
    <g transform={`translate(${x}, ${y})`}>
      {isBoil && temp > 95 && (
        <motion.g
          animate={{
            y: [0, -magnitude * 10],
            x: [0, magnitude * Math.random(), -magnitude * Math.random(), 0],
          }}
          transition={{
            duration: 1 + Math.random() * 2,
            repeat: Infinity,
            delay: (index + 1) * 0.5 * Math.random(),
          }}
        >
          <circle cx="0" cy="0" r="5" fill={color} />
          <text dy={".3em"} textAnchor="middle" fontSize="10" fontWeight={400}>
            {name}
          </text>
        </motion.g>
      )}
      {!isBoil && (
        <motion.g
          animate={{
            y: [0, -magnitude, 0],
            x: [0, magnitude, 0, -magnitude, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
        >
          <circle cx="0" cy="0" r="5" fill={color} />
          <text dy={".3em"} textAnchor="middle" fontSize="10" fontWeight={400}>
            {name}
          </text>
        </motion.g>
      )}
    </g>
  );
}
export default Molecule;
