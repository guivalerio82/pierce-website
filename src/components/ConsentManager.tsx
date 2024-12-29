'use client';

import Script from 'next/script'

export default function ConsentManager() {
  return (
    <Script
      type="text/javascript"
      data-cmp-ab="1"
      src="https://cdn.consentmanager.net/delivery/autoblocking/baf016e082181.js"
      data-cmp-host="b.delivery.consentmanager.net"
      data-cmp-cdn="cdn.consentmanager.net"
      data-cmp-codesrc="16"
      strategy="beforeInteractive"
    />
  )
} 