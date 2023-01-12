import AmbientImage from '@/components/AmbientImage/AmbientImage';
import { canvasDefaultConfigGenerator } from '@/constants/canvas';
import { generateStoryArgTypes } from './utils';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import type { CanvasConfigKey } from '@/constants/canvas';

const configValuesToOmit: CanvasConfigKey[] = [
  'initialFrameAlpha',
  'frameRate',
];

export default {
  title: 'Ambient Image',
  component: AmbientImage,
  parameters: {
    docs: {
      description: {
        component: 'Component that creates an ambiance around an image',
      },
    },
  },
  argTypes: generateStoryArgTypes(configValuesToOmit),
  args: canvasDefaultConfigGenerator(configValuesToOmit),
} as ComponentMeta<typeof AmbientImage>;

export const Default: ComponentStory<typeof AmbientImage> = (args) => (
  <AmbientImage {...args}>
    <img src="https://picsum.photos/400/400" alt="Default" />
  </AmbientImage>
);
