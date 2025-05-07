import Link from 'next/link';
import React from 'react'

const Explore = () => {
  return (
    <section className="text-center py-20 px-5 bg-[#FAFAFA]">
      <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-black">
        Explore the Code on GitHub
      </h2>
      <p className="text-gray-600 text-lg sm:text-xl mb-2">
        This project source code is available on{" "}
        <Link
          href="https://github.com/KAYZI2HIGH/linq"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          GitHub
        </Link>
        .
      </p>
      <p className="text-gray-600 text-lg sm:text-xl">
        Don't forget to give it a star{" "}
        <span
          role="img"
          aria-label="star"
        >
          ⭐
        </span>
        .
      </p>
    </section>
  );
}

export default Explore