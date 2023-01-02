import {
  Children,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import useInterval from './hooks/useInterval';

interface Props extends PropsWithChildren {
  scale?: number;
  borderRadius?: number;
  blur?: number;
}

function AmbientCanvas({
  scale = 1.05,
  borderRadius = 8,
  blur = 30,
  children,
}: Props) {
  const [elements, setElements] = useState<ReactNode[]>([]);
  const [playing, setPlaying] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  useInterval(() => drawCanvas(), playing ? 75 : null);

  const traverseChildren = (
    children: PropsWithChildren['children']
  ): ReactNode[] => {
    return Children.map(children, (child: any, index) => {
      if (mediaRef.current) {
        return child;
      }

      const { props, type } = child;

      if (type === 'img') {
        const img = (
          <img
            {...props}
            key={index}
            onLoad={() => drawCanvas()}
            ref={mediaRef}
          />
        );
        return img;
      } else if (type === 'video') {
        const video = (
          <video
            {...props}
            key={index}
            onPlaying={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            ref={mediaRef}
          />
        );
        return video;
      }

      if (props.children) {
        return traverseChildren(props.children);
      } else {
        return child;
      }
    });
  };

  useEffect(() => {
    setElements(traverseChildren(children));

    return () => {
      setElements(() => []);
    };
  }, []);

  useEffect(() => {
    canvasRef.current?.style.setProperty(
      getCssPropertyKey('canvas-radius'),
      `${borderRadius}px`
    );
    canvasRef.current?.style.setProperty(
      getCssPropertyKey('canvas-scale'),
      `${scale}`
    );
    canvasRef.current?.style.setProperty(
      getCssPropertyKey('canvas-blur'),
      `${blur}px`
    );
  }, [scale, blur, borderRadius]);

  const drawCanvas = () => {
    if (!canvasRef.current || !mediaRef.current) return;

    const { width, height } = mediaRef.current.getBoundingClientRect();

    canvasRef.current.height = height;
    canvasRef.current.width = width;
    const ctx = canvasRef.current.getContext('2d');

    ctx?.drawImage(mediaRef.current as CanvasImageSource, 0, 0, width, height);
    console.log('drawing');
  };

  const getCssPropertyKey = (key: string) => `--${key}`;

  return (
    <div className='ambient-ontainer'>
      {elements}
      <canvas ref={canvasRef} className='canvas'></canvas>
    </div>
  );
}

export default AmbientCanvas;
