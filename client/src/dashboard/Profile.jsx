import React, { useContext } from "react";
import Container from "../customs/Container";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SectionHead from "../customs/SectionHead";
import { FirebaseContext } from "../providers/Context";
import UpdateProfile from "../components/UpdateProfile";

export default function Profile() {
    const { dbUser} = useContext(FirebaseContext);

    const {first_name, last_name, photo_url, email, phone, gender, division} = dbUser;
    
  return (
    <Container>
      <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center md:sticky md:top-14">
        <SectionHead title="User Profile" subtitle="Your Profile Deails here" />
        <DotLottieReact src="../assets/profile.lottie" loop autoplay />
        </div>
        <div className="w-full flex justify-center px-2">
        <div className="bg-base-200 shadow-sm rounded-lg border-[1px] border-secondary w-md overflow-hidden relative">
        <div className="w-full bg-base-300 h-30 absolute z-1"/>
        <div className="flex flex-col justify-center items-center gap-4 relative z-2 pt-10 min-w-2/3 mx-auto">
        <img className="w-40 h-40 rounded-full border-[1px] border-gray-200 object-cover shadow-sm"
        src={photo_url} alt={first_name} />
        <h1 className="font-semibold text-3xl text-shadow-xs">{first_name + "'s Profile"}</h1>
        <div className="flex items-center gap-2 min-w-4/5 px-2 border-b-[1px] border-base-300 pb-3">
            <span className="text-xs opacity-75">Full Name :</span>
            <span className="font-semibold">{first_name + " " + last_name}</span>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row items-start md:items-center md:gap-2 min-w-4/5 px-2 border-b-[1px] border-base-300 pb-3">
        <span className="text-xs opacity-75">Email :</span>
        <span className="font-semibold">{email}</span>

        </div>
        <div className="flex items-center gap-2 min-w-4/5 px-2 border-b-[1px] border-base-300 pb-3">
            <span className="text-xs opacity-75">Gender :</span>
            <span className="font-semibold">{gender}</span>
        </div>
        <div className="flex items-center gap-2 min-w-4/5 px-2 border-b-[1px] border-base-300 pb-3">
            <span className="text-xs opacity-75">Division :</span>
            <span className="font-semibold">{division}</span>
        </div>
        <div className="flex items-center gap-2 min-w-4/5 px-2 mb-10">
            <span className="text-xs opacity-75">Phone :</span>
            <span className="font-semibold">{phone}</span>
        </div>


        </div>

        </div>
        <UpdateProfile/>
        </div>
        
        </section>
    </Container>
  );
}
