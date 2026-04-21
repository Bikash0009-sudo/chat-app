import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

function ParticlesBg() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = {
    background: {
      color: "#020617", // deep dark
    },

    particles: {
      number: {
        value: 60,
      },

      color: {
        value: ["#38bdf8", "#22c55e", "#a78bfa"], // chat-like colors
      },

      shape: {
        type: ["circle","triangle"], // clean like message bubbles
      },

      opacity: {
        value: 0.5,
      },

      size: {
        value: { min: 2, max: 6 },
      },

      links: {
        enable: true,
        distance: 120,
        color: "#38bdf8",
        opacity: 0.3,
        width: 1,
      },

      move: {
        enable: true,
        speed: 1,
        outModes: {
          default: "bounce",
        },
      },
    },

    interactivity: {
      events: {
        onHover: {
          enable: false,// like connecting messages
        },
        onClick: {
          enable: false,// new particles = new messages
        },
      },

      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.6,
          },
        },

        fullScreen: {
            enable: false,
            },

        push: {
          quantity: 4,
        },
      },
    },
  };

  if (!init) return null;

  return <Particles id="tsparticles" options={options} />;
}

export default ParticlesBg;