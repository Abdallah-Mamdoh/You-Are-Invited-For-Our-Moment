import React from "react";

export default function InvitationPage() {
  return (
    <div className="w-full h-full flex justify-center bg-neutral-400 bg-opacity-15">
      <div className="relative w-[60vw] h-[100vh] overflow-hidden">
        {/* IMAGE */}
        <img
          src="/wedding.jpg"
          alt="wedding"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* TEXT OVERLAY */}
        <div className="relative z-10 flex flex-col h-full bg-black/40 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-light mb-10">
            Engagement Invitation
          </h1>
          <h1
            className="text-white text-4xl md:text-5xl font-light mb-10"
            style={{ fontFamily: '"Brittany Signature", cursive' }}
          >
            Abdallah
          </h1>
          <h1 className="text-white text-4xl md:text-5xl font-light mb-10">
            &
          </h1>
          <h1 className="text-white text-4xl md:text-5xl font-light mb-10">
            Sohaila
          </h1>

          <p className="text-gray-200 mb-2 text-lg">
            Welcome to our special moment
          </p>
          <p className="text-gray-200 text-md">
            You're invited to enjoy it with us
          </p>
        </div>
      </div>
    </div>
  );
}
