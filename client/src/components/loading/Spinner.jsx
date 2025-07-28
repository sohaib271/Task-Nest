function Spinner() {
  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-green-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </>
  );
}
export default Spinner;
