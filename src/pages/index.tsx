import React from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

import Layout from '../components/Layout';

const TITLE = 'Playground Next.js';

const IndexPage: NextPage = () => (
  <Layout title={TITLE}>
    <h1>Home</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default IndexPage;
