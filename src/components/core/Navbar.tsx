"use client";
import Link from "next/link";
import { LanguageContext } from "@/contexts/LanguageContext";
import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { setEnglish, setIndonesian } from "@/lib/redux/features/languageSlice";
import { Button } from "../ui/button";
import { apiCall } from "@/utils/apiHelper";
import { setSignIn, setSignOut } from "@/lib/redux/features/authSlice";

interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  // With Context
  const { language, setLanguage, mode, setMode } = useContext(LanguageContext); // mengakses data dari context
  // With Redux
  // Menjalankan fungsi action yang telah dihasilkan oleh slice
  const dispatch = useAppDispatch();
  // Mengambil nilai dari state reducer
  const lang = useAppSelector((state) => {
    return state.languageState;
  });
  const auth = useAppSelector((state) => {
    return state.authState;
  });

  const keepLogin = async () => {
    try {
      const auth = localStorage.getItem("auth");
      if (auth) {
        const query = encodeURIComponent(`objectId='${auth}'`);
        const response = await apiCall.get(`/account?where=${query}`);
        if (response.data.length === 1) {
          dispatch(
            setSignIn({
              id: response.data[0].objectId,
              firstname: response.data[0].firstname,
              lastname: response.data[0].lastname,
              email: response.data[0].email,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <nav className="flex justify-between items-center p-3 px-10">
      <h1 id="logo-title" className="text-2xl font-bold">
        <Link href="/">TodoApp</Link>
      </h1>
      <ul className="flex gap-10">
        <li>
          <Link href="/todo">Todo</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/data-form">Data Form</Link>
        </li>
      </ul>
      <div className="flex items-center gap-3">
        {/* With Context */}
        {/* <span
          className="uppercase border border-black p-1"
          onClick={() => {
            if (language === "en") {
              setLanguage("id");
            } else {
              setLanguage("en");
          }
          }}
        >
          {language}
        </span> */}
        {/* With Redux */}
        <span
          className="uppercase border border-black p-1 cursor-pointer"
          onClick={() => {
            if (lang.value === "en") {
              dispatch(setIndonesian());
            } else {
              dispatch(setEnglish());
            }
          }}
        >
          {lang.value}
        </span>
        <span className="uppercase">{localStorage.getItem("mode")}</span>
        {auth.email ? (
          <>
            <span>{auth.email}</span>
            <Button
              type="button"
              onClick={() => {
                dispatch(setSignOut());
                localStorage.removeItem("auth");
              }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
