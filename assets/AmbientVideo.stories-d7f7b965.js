var u=Object.defineProperty;var o=(e,t)=>u(e,"name",{value:t,configurable:!0});import{r as f}from"./index-34e51894.js";import{u as y,C as g,t as b,A,c as m,g as V}from"./utils-274cfc40.js";import{a as C,j as a}from"./jsx-runtime-da4cfb3b.js";import"./es.object.get-own-property-descriptor-64192e07.js";const n=o(({children:e,...t})=>{const[l,r]=f.useState(!1),{sourceRef:i,sourceReady:c,setSourceReady:p}=y();return C(g,{children:[b(e,"video",{...{onLoadedMetadata:()=>p(!0),onPlaying:()=>r(!0),onPause:()=>r(!1),ref:i}}),c&&a(A,{sourceRef:i,...t,frameRate:l?t.frameRate:0})]})},"AmbientVideo");n.defaultProps=m(["appear"]);const d=n;try{n.displayName="AmbientVideo",n.__docgenInfo={description:"",displayName:"AmbientVideo",props:{frameRate:{defaultValue:null,description:"",name:"frameRate",required:!1,type:{name:"number"}},initialFrameAlpha:{defaultValue:null,description:"",name:"initialFrameAlpha",required:!1,type:{name:"number"}},scale:{defaultValue:null,description:"",name:"scale",required:!1,type:{name:"number"}},blur:{defaultValue:null,description:"",name:"blur",required:!1,type:{name:"number"}},opacity:{defaultValue:null,description:"",name:"opacity",required:!1,type:{name:"number"}},borderRadius:{defaultValue:null,description:"",name:"borderRadius",required:!1,type:{name:"number"}},watchSourceResize:{defaultValue:null,description:"",name:"watchSourceResize",required:!1,type:{name:"boolean"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/AmbientVideo/AmbientVideo.tsx#AmbientVideo"]={docgenInfo:n.__docgenInfo,name:"AmbientVideo",path:"src/components/AmbientVideo/AmbientVideo.tsx#AmbientVideo"})}catch{}const s=["appear"],B={title:"Ambient Video",component:d,parameters:{storySource:{source:`import AmbientVideo from '@/components/AmbientVideo/AmbientVideo';
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
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    />
  </AmbientVideo>
);
`,locationsMap:{default:{startLoc:{col:60,line:25},endLoc:{col:1,line:37},startBody:{col:60,line:25},endBody:{col:1,line:37}}}},docs:{description:{component:"Component that creates an ambiance around an video"}}},argTypes:V(s),args:m(s)},O=o(e=>a(d,{...e,children:a("video",{muted:!0,controls:!0,height:320,width:480,loop:!0,autoPlay:!0,src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"})}),"Default"),x=["Default"];export{O as Default,x as __namedExportsOrder,B as default};
//# sourceMappingURL=AmbientVideo.stories-d7f7b965.js.map
