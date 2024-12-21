

import Image from "next/image";
import React from "react";
import me from '../components/image/me.jpg'


const Footer =()=>{
    return(
        <div className="text-center px-[1rem] flex items-center justify-center gap-2 flex-bottom">
                <h1 className="text-[10px]">Built with Nextjs using REST API from openweather || wedevilleg@gmail.com </h1>
                <p className="">
                    <Image src={me} width={20} height={20} alt="svg_logo" className=" ring ring-green-400 rounded-full" />
                </p>
            </div>
    )


};

export default Footer;