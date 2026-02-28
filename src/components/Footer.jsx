import React from "react";
import { socialMedia, aboutMe } from "../constants";
import { layout } from "../style";
import { AiFillPhone } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiWechatFill } from "react-icons/ri";

const Footer = () => (
  <footer id="contact" className="bg-gray-900 sm:px-16 px-6">
    <div
      className={`${layout.sectionReverse} xl:max-w-[1280px] w-full mx-auto gap-y-4`}
    >
      <div className={`${layout.sectionInfo}`}>
        <h2 className="text-xl font-bold text-white font-poppins">
          {aboutMe.name}
        </h2>
        <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[30.8px] max-w-[470px] mt-3">
          {aboutMe.tagLine}
        </p>

        {/* Contact info */}
        <div className="flex flex-col gap-3 mt-5">
          <a
            href="mailto:m18065058605@163.com"
            className="flex items-center gap-3 text-dimWhite hover:text-teal-200 transition-colors font-mono text-[14px]"
          >
            <HiOutlineMail className="text-[18px] flex-shrink-0" />
            m18065058605@163.com
          </a>
          <span className="flex items-center gap-3 text-dimWhite font-mono text-[14px]">
            <AiFillPhone className="text-[18px] flex-shrink-0" />
            (+86) 180-6505-8605
          </span>
          <span className="flex items-center gap-3 text-dimWhite font-mono text-[14px]">
            <RiWechatFill className="text-[18px] flex-shrink-0" />
            WeChat: 18065058605
          </span>
        </div>

        {/* Social icons */}
        <div className="flex flex-row mt-5">
          {socialMedia.map((social) => (
            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              key={social.id}
              className="text-white mr-5 text-[25px] hover:text-teal-200 transition-colors"
            >
              {React.createElement(social.icon)}
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className="text-center font-poppins font-normal text-dimWhite text-xs sm:text-sm pb-4">
      <p>
        © 2026 Yifan Mao. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
