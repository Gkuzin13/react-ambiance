import AmbientVideo from '@/components/AmbientVideo/AmbientVideo';
import {
  CanvasConfigKey,
  canvasDefaultConfigGenerator,
} from '@/constants/canvas';
import { generateStoryArgTypes } from './utils';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

const configValuesToOmit: CanvasConfigKey[] = ['appear'];

export default {
  title: 'Ambient Video',
  component: AmbientVideo,
  parameters: {
    docs: {
      description: {
        component: 'Component that creates an ambiance around an video',
      },
    },
  },
  argTypes: generateStoryArgTypes(configValuesToOmit),
  args: canvasDefaultConfigGenerator(configValuesToOmit),
} as ComponentMeta<typeof AmbientVideo>;

export const Default: ComponentStory<typeof AmbientVideo> = (args) => (
  <AmbientVideo {...args}>
    <video
      muted
      controls
      height={320}
      width={480}
      loop
      autoPlay
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    />
  </AmbientVideo>
);
