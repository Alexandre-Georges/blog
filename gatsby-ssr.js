import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  const googleId = 'G-XFTPCTW6ME';
  setHeadComponents([
    <script
      key="google-gst-js"
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${googleId}`}
    />,
    <script
      key="google-gst-init"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${googleId}');`,
      }}
    />,
  ]);
};
