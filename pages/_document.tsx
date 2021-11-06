import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends NextDocument {
    public render() {
        return (
            <Html 
                prefix={"og: https://ogp.me/ns#"} 
                itemScope={true} 
                itemType={"http://schema.org/WebSite"}
            >
                <Head>
                    <meta charSet="utf-8"></meta>
                    <meta name="keywords" content="translation translate l18n oss free translate localise localize localisation localization"></meta>
                    <meta name="google" content="notranslate"></meta>
                    <meta name="name" itemProp="name" content="Dialect"></meta>
                    <meta name="application-name" content="Dialect"></meta>
                    <meta name="robots" content="index,follow"></meta>
                    <meta name="author" content="Dot HQ, support@dothq.co"></meta>
                    <meta name="reply-to" content="support@dothq.co"></meta>
                    <meta name="email" content="support@dothq.co"></meta>
                    <meta name="owner" content="Dot HQ"></meta>
                    <meta name="coverage" content="worldwide"></meta>
                    <meta name="distribution" content="global"></meta>
                    <meta name="rating" content="safe for kids"></meta>
                    <meta name="isFamilyFriendly" itemProp="isFamilyFriendly" content="true"></meta>
                    <meta name="application-name" content="Dialect"></meta>
                    <meta name="theme-color" content="#fefefe"></meta>
                    <link rel="canonical" href="https://dialect.dothq.co"></link>
                    <link rel="help" href="mailto:support@dothq.co"></link>

                    <link rel="shortcut icon" type="image/png" href="/favicon.png"></link>

                    <link href="https://api.fontshare.com/css?f[]=satoshi@1&display=swap" rel="stylesheet"></link>

                    <meta property="og:site_name" content="Dialect"></meta>
                    <meta property="og:url" content={"https://dialect.dothq.co"}></meta>
                    <meta property="og:type" content="website"></meta>
                    <meta property="og:image:type" content="image/png"></meta>
                    <meta property="og:image:width" content="1200"></meta>
                    <meta property="og:image:height" content="630"></meta>
                    <meta name="twitter:card" content="summary_large_image"></meta>
                    <meta name="twitter:site" content="@DotBrowser"></meta>
                    <meta name="twitter:creator" content="@DotBrowser"></meta>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
  }
}

export default Document;