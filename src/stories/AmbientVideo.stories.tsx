import AmbientVideo from '@/components/AmbientVideo/AmbientVideo';
import { canvasDefaultConfigGenerator } from '@/constants/canvas';
import { generateStoryArgTypes } from './utils';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import type { AmbientVideoProps } from '@/components/AmbientVideo/types';

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
  argTypes: {
    watchSourceResize: {
      control: { type: 'boolean', default: true },
    },
    ...generateStoryArgTypes(),
  },
  args: {
    ...canvasDefaultConfigGenerator(),
    watchSourceResize: true,
  },
} as ComponentMeta<typeof AmbientVideo>;

export const Default: ComponentStory<typeof AmbientVideo> = ({
  watchSourceResize,
  ...rest
}: AmbientVideoProps) => (
  <AmbientVideo config={rest} watchSourceResize={watchSourceResize}>
    <video
      muted
      controls
      height={200}
      width={400}
      loop
      autoPlay
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    ></video>{' '}
  </AmbientVideo>
);
