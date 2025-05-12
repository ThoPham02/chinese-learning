import { useState } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "../../store/redux"; // Bạn cần export type này từ store.ts

import defaultAvatar from "../../assets/default_avatar.png";
import * as actions from "../../store/action";
import { Mail } from "lucide-react";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface UserData {
  fullName?: string;
  email?: string;
  role?: number;
}

const User = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isAvatarHovered, setIsAvatarHovered] = useState<boolean>(false);

  const { user } = useTypedSelector((state) => state.auth) as {
    user: UserData;
  };

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  return (
    <>
      <div
        className="flex items-center"
        onMouseEnter={() => setIsAvatarHovered(true)}
        onMouseLeave={() => setIsAvatarHovered(false)}
      >
        <button className="rounded-circle flex items-center justify-center m-2">
          <img
            src={defaultAvatar}
            alt="avatar"
            className="rounded-full w-8 h-8"
          />
        </button>

        {isAvatarHovered && (
          <div
            className="absolute w-360 bg-white shadow-md rounded-md z-50"
            style={{ top: "100%", right: 0 }}
          >
            <div className="flex items-center py-9 mx-7 border-bottom">
              <img
                src={defaultAvatar}
                className="rounded-full w-24 h-24"
                alt="avatar"
              />
              <div className="ms-3">
                <h5 className="mb-1 font-medium">
                  {user.fullName || user.email}
                </h5>
                <p className="mb-0 flex items-center gap-2">
                  <Mail />
                  <span>{user.email}</span>
                </p>
              </div>
            </div>

            <div className="px-7 pt-3">
              <div className="pb-4">
                <h5 className="text-base font-semibold text-gray-800">
                  User Profile
                </h5>
              </div>
            </div>

            <div className="grid py-4 px-7 pt-8">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition duration-300"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
