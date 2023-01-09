function animate(callback: () => void, frameRate = 24) {
  let requestId = 0;

  function start() {
    let then = performance.now();
    const interval = 1000 / frameRate;
    const tolerance = 0.1;

    const animateLoop = (now: number) => {
      requestId = requestAnimationFrame(animateLoop);

      const delta = now - then;

      if (delta >= interval - tolerance) {
        then = now - (delta % interval);
        callback();
      }
    };

    requestId = requestAnimationFrame(animateLoop);
  }

  function stop() {
    cancelAnimationFrame(requestId);
  }

  return { start, stop };
}

export default animate;
