import React, { useEffect } from "react";
import { Button } from "../components/Button";
// import { Footer } from "../components/Footer";
import { Wrapper } from "../components/Wrapper";
import { apiBaseUrl, __prod__, __staging__ } from "../constants";
import { Logo } from "../svgs/Logo";
import { useTokenStore } from "../utils/useTokenStore";
import qs from "query-string";
import { showErrorToast } from "../utils/showErrorToast";
import { CenterLayout } from "../components/CenterLayout";
import { modalPrompt, PromptModal } from "../components/PromptModal";
import { AlertModal } from "../components/AlertModal";
import { ConfirmModal } from "../components/ConfirmModal";
import { BodyWrapper } from "../components/BodyWrapper";
import { ListItem } from "../components/ListItem";
import { GitHubIcon } from "../svgs/GitHubIcon";
import { TwitterIcon } from "../svgs/TwitterIcon";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  useEffect(() => {
    const { error } = qs.parse(window.location.search);
    if (error && typeof error === "string") {
      showErrorToast(error);
    }
  }, []);
  return (
    <CenterLayout>
      <Wrapper>
        <BodyWrapper>
          <div className={`my-8`}>
            <Logo />
          </div>
          <div className={`text-4xl my-4 tracking-tight font-extrabold text-center`}>
            24x7 Devotee Association Online 🦚
          </div>
          <ul className={`my-6 mb-10 text-xl`}>
            <ListItem>📿 • Chant together</ListItem>
            <ListItem>🗣️ • Shloka recitation</ListItem>
            <ListItem>📖 • Bhagvatam discussions</ListItem>
            <ListItem>💬 • Random conversations</ListItem>
            <ListItem>💡 • Whatever you can imagine</ListItem>
          </ul>
          <div className={`mb-8`}>
            <Button
              variant="slim"
              style={{ backgroundColor: "#333" }}
              onClick={() =>
                (window.location.href = 
                  apiBaseUrl +
                  "/auth/github/web" +
                  (__staging__
                    ? "?redirect_after_base=" + window.location.origin
                    : ""))
              }
            >
              <span className={`inline-flex items-center`}>
                <GitHubIcon className={`h-6 w-6`} />
                <p className={`ml-3`}>login with GitHub</p>
              </span>
            </Button>
          </div>
          {!__staging__ ? (
            <Button
              variant="slim"
              style={{ backgroundColor: "#0C84CF" }}
              onClick={() =>
                (window.location.href =
                  apiBaseUrl +
                  "/auth/twitter/web" +
                  (process.env.REACT_APP_IS_STAGING === "true"
                    ? "?redirect_after_base=" + window.location.origin
                    : ""))
              }
            >
              <span className={`inline-flex items-center`}>
                <TwitterIcon className={`h-6 w-6`} />
                <p className={`ml-3`}>login with Twitter</p>
              </span>
            </Button>
          ) : null}
          {!__prod__ ? (
            <Button
              variant="slim"
              className={`m-8`}
              onClick={() => {
                modalPrompt("username", async (name) => {
                  if (!name) {
                    return;
                  }
                  const r = await fetch(
                    `${apiBaseUrl}/dev/test-info?username=` + name
                  );
                  const d = await r.json();
                  useTokenStore.getState().setTokens({
                    accessToken: d.accessToken,
                    refreshToken: d.refreshToken,
                  });
                });
              }}
            >
              create test user
            </Button>
          ) : null}
        </BodyWrapper>
      </Wrapper>
      {/* <div className={`mb-6 px-5`}>
        <Footer isLogin />
      </div> */}
      <AlertModal />
      <PromptModal />
      <ConfirmModal />
    </CenterLayout>
  );
};
