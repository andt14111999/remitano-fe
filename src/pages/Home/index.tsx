import APIs from 'apis';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useEnqueueSnackbar } from 'hooks/useEnqueueSnackbar';
import ReadMore from 'components/ReadMore';

export interface Video {
  videoURL: string;
  title: string;
  embeddedURL: string;
  description: string;
  userEmail: string;
  _id: string;
  __v: number;
}

const Home = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const enqueueSnackbar = useEnqueueSnackbar();

  const getVideos = useCallback(() => {
    axios
      .get(APIs.videos)
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => {
        enqueueSnackbar("Can't retrieve videos, please contact admin", {
          variant: 'error',
        });
      });
  }, [enqueueSnackbar]);

  useEffect(() => {
    getVideos();
  }, [getVideos]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
      {videos.map((video) => (
        <>
          <div className="lg:col-span-3 relative pb-[56.25%] lg:pb-0">
            <iframe
              src={video.embeddedURL}
              height="100%"
              width="100%"
              title="Adele"
              className="lg:h-[300px] xl:h-[350px]"
              allowFullScreen
            ></iframe>
          </div>
          <div className="lg:col-span-4">
            <div className="mb-6 text-red-700 font-bold">{video.title}</div>
            <div className="mb-4 font-medium">Shared by: {video.userEmail}</div>
            <div className="mb-2 font-medium">Description:</div>
            <ReadMore description={video.description} />
          </div>
        </>
      ))}
      {videos.length === 0 && (
        <div className="flex justify-center items-center col-span-7 text-center">
          😊 There are currently no videos shared. Log in to share videos
        </div>
      )}
    </div>
  );
};

export default Home;
