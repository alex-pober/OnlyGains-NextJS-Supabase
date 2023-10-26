"use client";
import { useState, useEffect, PropsWithChildren, ReactNode, useRef } from "react";

interface CustomDropdownProps {
  children: React.ReactNode;
}

export default function DropDown({children}: {children?: CustomDropdownProps}) {
  const dropdownRef = useRef(null)

  const closeDropdown = () => {
    console.log("gello dropdown")
    dropdownRef.current?.removeAttribute("open");
  };

  return (
    <details
      id="dropdown"
      ref={dropdownRef}
      className="dropdown dropdown-left"
    >
      <summary className="btn btn-xs m-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
        onClick={closeDropdown}
      >
        <li>
          <a  onClick={closeDropdown}>
            {children}
          </a>
        </li>
      </ul>
    </details>
  );
}
