var p=Object.defineProperty;var t=(e,n)=>p(e,"name",{value:n,configurable:!0});import{u,C as g,t as d,A as f,c as s,g as y}from"./utils-274cfc40.js";import{a as b,j as o}from"./jsx-runtime-da4cfb3b.js";import"./index-34e51894.js";import"./es.object.get-own-property-descriptor-64192e07.js";const a=t(({children:e,...n})=>{const{sourceRef:r,sourceReady:c,setSourceReady:l}=u();return b(g,{children:[d(e,"img",{...{onLoad:()=>l(!0),ref:r}}),c&&o(f,{sourceRef:r,...n,frameRate:0,initialFrameAlpha:1})]})},"AmbientImage");a.defaultProps=s(["frameRate","initialFrameAlpha"]);const i=a;try{a.displayName="AmbientImage",a.__docgenInfo={description:"",displayName:"AmbientImage",props:{scale:{defaultValue:null,description:"",name:"scale",required:!1,type:{name:"number"}},blur:{defaultValue:null,description:"",name:"blur",required:!1,type:{name:"number"}},opacity:{defaultValue:null,description:"",name:"opacity",required:!1,type:{name:"number"}},borderRadius:{defaultValue:null,description:"",name:"borderRadius",required:!1,type:{name:"number"}},appear:{defaultValue:null,description:"",name:"appear",required:!1,type:{name:"boolean"}},watchSourceResize:{defaultValue:null,description:"",name:"watchSourceResize",required:!1,type:{name:"boolean"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/AmbientImage/AmbientImage.tsx#AmbientImage"]={docgenInfo:a.__docgenInfo,name:"AmbientImage",path:"src/components/AmbientImage/AmbientImage.tsx#AmbientImage"})}catch{}const m=["initialFrameAlpha","frameRate"],R={title:"Ambient Image",component:i,parameters:{storySource:{source:`import AmbientImage from '@/components/AmbientImage/AmbientImage';
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
`,locationsMap:{default:{startLoc:{col:60,line:26},endLoc:{col:1,line:30},startBody:{col:60,line:26},endBody:{col:1,line:30}}}},docs:{description:{component:"Component that creates an ambiance around an image"}}},argTypes:y(m),args:s(m)},T=t(e=>o(i,{...e,children:o("img",{src:"https://picsum.photos/400/400",alt:"Default"})}),"Default"),O=["Default"];export{T as Default,O as __namedExportsOrder,R as default};
//# sourceMappingURL=AmbientImage.stories-3023162d.js.map
