export default function Page() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#170a74] via-[#bab7ec] to-[#ffffff] p-6">
        <div className="w-full max-w-4xl p-8 rounded-2xl shadow-xl bg-white/80 backdrop-blur-md">
          <h1 className="text-3xl font-bold text-center text-[#170a74] mb-6">
            Welcome to ChatApp
          </h1>
          <p className="text-center text-gray-700 mb-6">
            Connect with your friends and chat in real-time!
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button className="w-full md:w-auto px-6 py-3 bg-[#170a74] text-white rounded-lg shadow-md hover:bg-[#0f065a] transition">
              Login
            </button>
            <button className="w-full md:w-auto px-6 py-3 bg-[#bab7ec] text-[#170a74] rounded-lg shadow-md hover:bg-[#a3a0d7] transition">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
