import React, { FC, useState } from 'react'

interface ReadMoreProps {
    description: string;
}

const ReadMore: FC<ReadMoreProps> = ({ description }) => {
const [isTruncated, setIsTruncated] = useState(true);

const resultString = isTruncated ? description.slice(0, 100): description;

const toggleTruncate = () => {
    setIsTruncated(prev => !prev)
}

  return (
    <div className="p-3 rounded-xl bg-black-05 cursor-pointer" onClick={toggleTruncate}>
      <p dangerouslySetInnerHTML={{ __html: resultString }}></p>
      {isTruncated && <span className="font-bold">... Show more</span>}
    </div>
  );
};

export default ReadMore