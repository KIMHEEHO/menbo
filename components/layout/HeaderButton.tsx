"use client";

import { logout } from "@/actions/logout";

export default function HeaderButton() {
  return (
    <div>
      <button>프로필</button>
      <button
        onClick={() => {
          logout();
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
