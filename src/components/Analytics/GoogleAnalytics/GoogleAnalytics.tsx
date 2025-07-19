// components/GoogleAnalytics.tsx
import Script from 'next/script'

export function GoogleAnalytics() {
	const GA_ID = 'G-CQRXZ1DW5Z' // Reemplaza con tu ID

	return (
		<>
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}');
                `}
			</Script>
		</>
	)
}
