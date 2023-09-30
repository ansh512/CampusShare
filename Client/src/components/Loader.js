import React from 'react';
import { DotLoader} from 'react-spinners'; 

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-teal-500">
        <DotLoader color='#36d7b7' size={50} />
        <p className="mt-2">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
