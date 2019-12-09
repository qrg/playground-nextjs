import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export type LayoutProps = {
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'This is the default title'
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    {children}
    <footer>
      <span>footer</span>
    </footer>
  </>
);

export default Layout;
