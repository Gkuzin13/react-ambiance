import AmbientImage from '@/components/AmbientImage/AmbientImage';
import { canvasDefaultConfigGenerator } from '@/constants/canvas';
import { generateStoryArgTypes } from './utils';
import type { AmbientImageProps } from '@/components/AmbientImage/types';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import type { CanvasConfigKey } from '@/constants/canvas';

const configValuesToOmit: CanvasConfigKey[] = [
  'initialFrameAlpha',
  'frameRate',
];

export default {
  title: 'Ambient Image',
  component: AmbientImage,
  argTypes: {
    watchSourceResize: {
      control: { type: 'boolean', default: true },
    },
    ...generateStoryArgTypes(configValuesToOmit),
  },
  args: {
    ...canvasDefaultConfigGenerator(configValuesToOmit),
    watchSourceResize: true,
  },
} as ComponentMeta<typeof AmbientImage>;

export const Default: ComponentStory<typeof AmbientImage> = ({
  watchSourceResize,
  ...rest
}: AmbientImageProps) => (
  <AmbientImage config={rest} watchSourceResize={watchSourceResize}>
    <img src="https://picsum.photos/200/300" alt="Default" />
  </AmbientImage>
);
