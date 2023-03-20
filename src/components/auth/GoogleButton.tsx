import { ButtonBase, ButtonBaseProps } from "@mui/material";
import ResponsiveImage from "../common/Image";

/*———————————–
  ログインボタン
———————————–*/
const GoogleLoginButton = (props: ButtonBaseProps) => {
  return (
    <ButtonBase {...props}>
      <ResponsiveImage
        src="/resources/auth/btn_google.png"
        alt="Sign in with Google"
        width="382"
        height="92"
        priority
      />
    </ButtonBase>
  );
};

export default GoogleLoginButton;
