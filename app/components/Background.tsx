import { useEffect, useRef } from 'react';
import SHREE from 'shree';

export default function Background() {
  const backgroundWrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!backgroundWrapper.current) {
      return;
    }

    const wrapper = backgroundWrapper.current;

    // Renderer
    var renderer = new SHREE.Renderer({ antialias: true });
    renderer.pixelRatio = 1;
    renderer.clearColor = [ 1.0, 1.0, 1.0, 1.0 ];
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    wrapper.appendChild(renderer.domElement);

    // Camera
    var camera = new SHREE.Camera();
    camera.position.y = 10;
    camera.position.z = 0;
    camera.rotation.x = -1.5;

    // Scene
    var scene = new SHREE.Scene();

    var material = new SHREE.Material({
      vertexShader: `
      attribute vec3 position;
      attribute float seed;
      uniform mat4 pMatrix;
      uniform mat4 mvMatrix;
      uniform float time;
      varying vec4 vColor;

      const float PI = 3.1415926535897932384626433832795;

      void main(void) {
        vColor = vec4(0.0, 0.0, 1.0, 1.0);
        float rad = (seed + time) * PI / 180.0;
        float y = cos(rad * 3.0) * 3.0;
        vColor.x = cos(rad);
        vColor.y = sin(rad);
        vec4 mvPosition = mvMatrix * vec4(position.x, y, position.z, 1.0);
        gl_Position = pMatrix * mvPosition;
        gl_PointSize = 4.0;
      }
    `,
      fragmentShader: `
      precision lowp float;
      varying vec4 vColor;

      void main(void) {
        gl_FragColor = vColor;
      }
    `,
      uniforms: {
        time: {
          type: 'f',
          value: 0,
        }
      },
      transparent: true
    });

    var geometry = new SHREE.Geometry();
    var position = [];
    var seed = [];
    var absolute = 30;
    for (var z = -absolute; z < absolute; z++) {
      for (var x = -absolute; x < absolute; x++) {
        position.push(x); // x
        position.push(0); // y
        position.push(z); // z
        seed.push(z + x);
      }
    }
    geometry.addAttribute('position', 3, position);
    geometry.addAttribute('seed', 1, seed);

    var points = new SHREE.Points(geometry, material);
    scene.add(points);

    // Start drawing
    var render = function() {
      // points.rotation.y += 0.003;
      material.uniforms.time.value += 0.1;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    render();
  }, []);

  return (
    <>
      <div
        className="background"
        style={ {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -1,
        } }
        ref={ backgroundWrapper } />
    </>
  )
}
