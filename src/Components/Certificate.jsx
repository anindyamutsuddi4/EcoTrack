import React from "react";

const DemoCertificate = () => {
  return (
    <div className="min-h-screen bg-[#0f3d34] flex flex-col items-center justify-center px-4 py-4">
  <div className="flex justify-center px-4 pt-10 md:pt-25 md:pb-7">
  <div className="relative bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400
                  text-white rounded-md shadow-xl
                  px-6 py-3 md:px-12 md:py-5
                  max-w-5xl w-full">

    <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
                     w-6 h-6 bg-[#17483d] rotate-45"></span>
    <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
                     w-6 h-6 bg-[#17483d] rotate-45"></span>

    <p className="text-center lora text-sm sm:text-base md:text-2xl leading-relaxed text-[#17483d] font-semibold">
      In recognition of your successful completion of any challenge, we proudly present you with a premium certificate—an acknowledgment of your dedication, effort, and achievement.
    </p>
  </div>
</div>


    <div
  className="
    w-full max-w-[950px]
    aspect-[12/7]
    bg-gradient-to-br from-[#fdf6e3] to-white
    p-3 sm:p-4
    shadow-2xl
  "
>
  <div className="h-full border-[4px] border-[#c9a227] p-2 sm:p-3 relative">
   
    <div
      className="
        h-full border-2 border-[#17483d]
        flex flex-col items-center text-center
        px-4 sm:px-12
        py-5 sm:py-7
        font-sans
      "
    >
      <p className="uppercase tracking-[0.2em] text-[10px] sm:text-xs text-[#17483d] mb-1">
        Certificate of Completion
      </p>

      <h1 className="font-serif text-2xl sm:text-4xl text-[#17483d] mb-3 sm:mb-5">
        EcoTrack Challenge
      </h1>

      <p className="text-xs sm:text-sm text-gray-600">
        This certificate is proudly presented to
      </p>

      <h2 className="font-serif text-xl sm:text-3xl text-[#0f3d34] my-1 sm:my-2">
        Demo User
      </h2>

      <p className="text-xs sm:text-sm text-gray-700">
        for successfully completing the challenge
      </p>

      <h3 className="text-sm sm:text-xl text-[#c9a227] font-medium my-2 sm:my-3">
        “30-Day Sustainable Living Challenge”
      </h3>

      <p className="max-w-lg text-[11px] sm:text-sm text-gray-600 leading-relaxed mb-4 sm:mb-6">
        Your dedication and commitment toward building a greener and
        more sustainable future is truly appreciated.
      </p>

      {/* Footer with Stamp */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-2 sm:px-10 mt-auto space-y-4 md:space-y-0">
        {/* Date */}
        <div>
          <p className="text-[10px] sm:text-xs text-gray-500">Date</p>
          <p className="text-xs sm:text-sm font-medium text-gray-800">
            March 21, 2026
          </p>
        </div>

        {/* Authorized By + Stamp */}
        <div className="relative flex flex-col items-center">
          {/* Stamp */}
          <div className="absolute -top-12 w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-yellow-400 bg-yellow-100/30 flex items-center justify-center rotate-12 shadow-xl">
            {/* EcoTrack sign inside stamp */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 md:w-12 md:h-12 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7" // simple checkmark for EcoTrack
              />
            </svg>
          </div>

          <p className="text-[10px] sm:text-xs text-gray-500 mt-10">Authorized By</p>
          <p className="font-serif text-xs sm:text-sm text-gray-800">
            EcoTrack Team
          </p>
        </div>
      </div>

      <p className="mt-2 sm:mt-3 text-[9px] sm:text-[10px] text-gray-500">
        Certificate ID: ECO-DEMO-2026-001
      </p>
    </div>
  </div>
</div>


    </div>
  );
};

export default DemoCertificate;
