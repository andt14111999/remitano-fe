import React, { FC, useEffect, useState } from 'react';

interface ReadMoreProps {
  description: string;
}

const ReadMore: FC<ReadMoreProps> = ({ description }) => {
  const [isTruncated, setIsTruncated] = useState(false);

  const resultString = isTruncated
    ? description.slice(0, 100) + '...'
    : description;

  const toggleTruncate = () => {
    if (description.length < 100) {
      return;
    }

    setIsTruncated((prev) => !prev);
  };

  useEffect(() => {
    if (description.length >= 100) {
      setIsTruncated(true);
    }
  }, [description.length]);

  return (
    <div
      className="p-3 rounded-xl bg-black-05 cursor-pointer"
      onClick={toggleTruncate}
    >
      <p
        dangerouslySetInnerHTML={{ __html: resultString }}
        className="break-words"
      ></p>
      {isTruncated && <span className="font-bold">... Show more</span>}
    </div>
  );
};

export default ReadMore;
