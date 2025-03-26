import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const Card = ({
  name = "Michael Chen",
  role = "UI/UX DESIGNER",
  id = "REG34567890",
  imageUrl = "YOUR_IMAGE_URL_HERE",
  githubUrl = "#",
  linkedinUrl = "#",
  email = "mailto:example@email.com",
}) => {
  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-[#01216B] rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#01216B] to-transparent" />
        </div>

        {/* Content Container */}
        <div className="px-6 py-4 text-white">
          {/* Role Badge */}
          <span className="inline-block bg-[#1e3a8a] bg-opacity-50 rounded-full px-4 py-1 text-sm font-semibold mb-3">
            {role}
          </span>

          {/* Name and ID */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-1 text-white">{name}</h2>
            <p className="text-blue-200 text-sm font-mono">{id}</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-2 border-t border-[#1e3a8a]">
            <a
              href={githubUrl}
              className="p-2 hover:bg-[#1e3a8a] rounded-full transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href={linkedinUrl}
              className="p-2 hover:bg-[#1e3a8a] rounded-full transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href={email}
              className="p-2 hover:bg-[#1e3a8a] rounded-full transition-colors duration-200"
            >
              <HiMail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
