import { useState } from 'react';
import AmbientImage from '@/components/AmbientImage/AmbientImage';
import AmbientVideo from '@/components/AmbientVideo/AmbientVideo';
import './App.css';
import {
  canvasConfigValues,
  canvasDefaultConfigGenerator,
} from '@/constants/canvas';

function App() {
  const [settings, setSettings] = useState(canvasDefaultConfigGenerator());

  return (
    <div className="App">
      <AmbientVideo config={{ ...settings }} watchSourceResize>
        <video
          muted
          controls
          height={200}
          width={400}
          loop
          autoPlay
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        ></video>
      </AmbientVideo>
      {/* {[...Array(5).keys()].map((key) => {
        return (
          <AmbientImage key={key} watchSourceResize config={settings}>
            <div>
              <img
                src={`https://loremflickr.com/300/200?random=${key}`}
                alt={'alt'}
              />
            </div>
          </AmbientImage>
        );
      })} */}
      <div style={{ color: 'white' }}>
        {Object.entries(canvasConfigValues).map(([key, value]) => {
          return (
            <div key={key}>
              <label>{key}</label>
              <br />
              <input
                type="range"
                min={value.min}
                max={value.max}
                step={0.01}
                defaultValue={value.default}
                onChange={(e) =>
                  setSettings({ ...settings, [key]: +e.target.value })
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
