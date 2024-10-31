"use client";

import Script from "next/script";

const Squid = () => {
  const SQUID_ID =
    process.env.NEXT_PUBLIC_SQUID_ID || "6722595ac99c82fb138e3d30"; // Set default if SQUID_ID is not defined
  if (!SQUID_ID) return null;

  return (
    <div>
      <Script id="squid-script">
        {`
          (function(squid){
            if (!window.$quid) {
              window.$quid = {};
              document.head.appendChild((function(s){
                s.src = 'https://app.asksquid.ai/tfs/' + squid + '/sdk';
                s.async = 1;
                return s;
              })(document.createElement('script')));
            }
          })('${SQUID_ID}');
        `}
      </Script>
    </div>
  );
};

export default Squid;
