const LoadingSkeleton = () => {
    const skeletons = Array.from({ length: 100 }, (_, index) => index);
  
    return (
        <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {skeletons.map((skeleton, index) => (
          <li key={index} className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto my-4">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default LoadingSkeleton;