import React from "react"

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    <script
      key="google-gst-js"
      async
      src={`https://www.googletagmanager.com/gtag/js?id=G-XFTPCTW6ME`}
      // src={`https://www.googletagmanager.com/gtag/js?id=GTM-M9K4PMT`}
    />,
    <script
      key="google-gst-init"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-XFTPCTW6ME');`,
      }}
    />,
  ]);

  // script={[{ 
  //   type: 'text/javascript', 
  //   innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M9K4PMT');`
  // }]}
  // setPreBodyComponents([
  //   <noscript key="google-tag">
  //     <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NV5ZM4M" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
  //   </noscript>
  // ]);
}