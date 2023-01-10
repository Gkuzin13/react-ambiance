import { ComponentStory, ComponentMeta } from '@storybook/react';
import AmbientImage from '@/components/AmbientImage/AmbientImage';

export default {
  title: 'Ambient Image',
  component: AmbientImage,
} as ComponentMeta<typeof AmbientImage>;

export const Default: ComponentStory<typeof AmbientImage> = () => (
  <AmbientImage>
    <img src="https://picsum.photos/200/300" alt="Default" />
  </AmbientImage>
);
