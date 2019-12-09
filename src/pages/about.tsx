import React from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

import Layout from '../components/Layout';

const TITLE = 'Playground Next.js';

const AboutPage: NextPage = () => (
  <Layout title={TITLE}>
    <h1>About</h1>
    <p>
      <Link href="/">
        <a>Home</a>
      </Link>
    </p>
  </Layout>
);

export default AboutPage;
