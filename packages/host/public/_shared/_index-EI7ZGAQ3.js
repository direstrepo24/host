import{d as n,g as p}from"/build/_shared/chunk-KL2CN2NV.js";import"/build/_shared/chunk-GTQMRRHT.js";import{c as s,d as c,e as w}from"/build/_shared/chunk-XWFLGTVX.js";var I=s(c(),1);var o=s(c());var m={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};var P=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),L=(t,d)=>{let e=(0,o.forwardRef)(({color:l="currentColor",size:f=24,strokeWidth:i=2,absoluteStrokeWidth:x,className:C="",children:r,...g},S)=>(0,o.createElement)("svg",{ref:S,...m,width:f,height:f,stroke:l,strokeWidth:x?Number(i)*24/Number(f):i,className:["lucide",`lucide-${P(t)}`,C].join(" "),...g},[...d.map(([h,k])=>(0,o.createElement)(h,k)),...Array.isArray(r)?r:[r]]));return e.displayName=`${t}`,e};var u=L("Activity",[["path",{d:"M22 12h-4l-3 9L9 3l-3 9H2",key:"d5dnw9"}]]);var a=s(w(),1);function q(){let{publish:t}=n(),d=(0,I.useCallback)(()=>{console.log("Module2: Triggering event");let e={type:"NOTIFICATION",source:"module2",timestamp:Date.now(),payload:{message:"New feature available in Module 2",level:"info"}};console.log("Module2: Publishing event:",e),t(e)},[t]);return(0,a.jsx)("div",{className:"p-8 max-w-6xl mx-auto space-y-8",children:(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-lg p-6 space-y-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,a.jsx)(u,{className:"h-6 w-6 text-green-500"}),(0,a.jsx)("h1",{className:"text-2xl font-bold",children:"Module 2"})]}),(0,a.jsx)(p,{onClick:d,children:"Trigger Notification"})]}),(0,a.jsx)("p",{className:"text-gray-600",children:"This is Module 2, focusing on analytics and metrics visualization."}),(0,a.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[{title:"Total Users",value:"1,234",change:"+12%"},{title:"Active Sessions",value:"456",change:"+5%"},{title:"Response Time",value:"120ms",change:"-8%"}].map((e,l)=>(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-lg p-6",children:[(0,a.jsx)("h3",{className:"text-sm font-medium text-gray-500",children:e.title}),(0,a.jsxs)("div",{className:"mt-2 flex items-baseline",children:[(0,a.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:e.value}),(0,a.jsx)("p",{className:`ml-2 text-sm font-medium ${e.change.startsWith("+")?"text-green-600":"text-red-600"}`,children:e.change})]})]},l))})]})})}export{q as default};
/*! Bundled license information:

lucide-react/dist/esm/defaultAttributes.js:
  (**
   * @license lucide-react v0.309.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/createLucideIcon.js:
  (**
   * @license lucide-react v0.309.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/activity.js:
  (**
   * @license lucide-react v0.309.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.309.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
