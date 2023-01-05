import { useRef, useState } from 'react';

function useSource() {
  const [sourceReady, setSourceReady] = useState(false);

  const sourceRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  return { sourceRef, sourceReady, setSourceReady };
}

export default useSource;
