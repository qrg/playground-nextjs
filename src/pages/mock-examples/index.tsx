import { useState } from 'react';

import Image from 'next/image';

import type { Book, Review } from '../../../types';
import type { GetServerSideProps, NextPage } from 'next';

type Props = {
  book: Book;
};

const MockExampleIndex: NextPage<Props> = ({ book }: Props) => {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  const handleGetReviews = () => {
    // Client-side request are mocked by `mocks/browser.js`.
    fetch('/reviews')
      .then((res) => res.json())
      .then(setReviews)
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Image src={book.imageUrl} alt={book.title} width="250" height="399" />
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <button onClick={handleGetReviews} type="button">
        Load reviews
      </button>
      {reviews && (
        <ul>
          {reviews.map(({ id, text, author }) => (
            <li key={id}>
              <p>{text}</p>
              <p>{author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  // Server-side requests are mocked by `mocks/server.js`.
  const res = await fetch('https://my.backend/book');
  const book = (await res.json()) as Book;

  return {
    props: {
      book,
    },
  };
};

export default MockExampleIndex;
