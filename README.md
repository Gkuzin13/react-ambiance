# React Ambiance

Components that create ambiance from image or video. This was inspired by YouTube's Ambient Mode.

![React Ambiance](https://github.com/Gkuzin13/react-ambiance/blob/main/assets/screenshot.png)

```js
import { AmbientVideo } from 'react-ambiance';

<AmbientVideo>
  <video
    muted
    controls
    height={320}
    width={480}
    loop
    autoPlay
    src="example-video.mp4"
  />
</AmbientVideo>;
```

### Props

- `scale`: The ambiance scale
- `blur`: Blur level in px
- `opacity`: The ambiance opacity
- `borderRadius`: The Ambiance border radius
- `frameRate`: Controls the frame rate (may affect performace if set to a low value)
- `initialFrameAlpha`: The initial alpha of each frame (the lower the value the smoother the transition between frames)
- `appear`: Apply a transition on the initial render
- `watchSourceResize`: Watches source size changes
