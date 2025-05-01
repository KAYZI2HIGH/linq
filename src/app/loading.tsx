import ScaleLoader from "react-spinners/ScaleLoader";

const Loading = () => {
  return (
    <div className="fixed inset-0  z-50 flex items-center justify-center bg-white/5 backdrop-blur-sm">
      <ScaleLoader
        color="#000000"
      />
    </div>
  );
};

export default Loading;
