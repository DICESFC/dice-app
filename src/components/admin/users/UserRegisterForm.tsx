import { FC, useState, MouseEvent } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { createUser, setUserData } from "@/api/users/functions";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { CustomInput } from "@/components/common/CommonInput";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

type Props = {};

/*———————————–
  CSVからボドゲ追加するやつ
———————————–*/
const UserRegisterForm: FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("member");
  const [error, setError] = useState({ email: false, username: false });
  const onButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let hasError = false;

    if (!email) {
      setError((prev) => ({ ...prev, email: true }));
      hasError = true;
    }
    if (!username) {
      setError((prev) => ({ ...prev, username: true }));
      hasError = true;
    }

    if (!hasError) {
      // API call or form processing
      alert(
        `Submitting\nEmail: ${email}\nUsername: ${username}\nRole: ${role}`
      );
    }
    createUser({ name: username, email: email });
  };

  return (
    <Paper
      component="form"
      sx={{
        p: 2,
        display: "flex",

        flexFlow: "column",
        gap: "50px",
        height: "auto",
        transition: "0.5s",
        width: "100%",
      }}
    >
      <Typography variant="h5">ユーザー登録</Typography>
      <FormControl>
        <InputLabel
          shrink
          required
          sx={(theme) => ({
            fontSize: "large",
            ...{
              ".MuiFormLabel-asterisk": {
                color: theme.palette.error.main,
              },
            },
          })}
        >
          {"メールアドレス"}
        </InputLabel>
        <CustomInput
          autoComplete="off"
          onChange={(e) => {
            setEmail(e.target.value);
            setError((prev) => ({ ...prev, email: false }));
          }}
        />
        <FormHelperText sx={{ color: "red" }}>
          {error.email ? "メールアドレスは必須です" : null}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel
          shrink
          required
          sx={(theme) => ({
            fontSize: "large",
            ...{
              ".MuiFormLabel-asterisk": {
                color: theme.palette.error.main,
              },
            },
          })}
        >
          {"ユーザー名"}
        </InputLabel>
        <CustomInput
          autoComplete="off"
          onChange={(e) => {
            setUsername(e.target.value);
            setError((prev) => ({ ...prev, email: false }));
          }}
        />
        <FormHelperText sx={{ color: "red" }}>
          {error.email ? "ユーザー名は必須です" : null}
        </FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">管理者権限</FormLabel>
        <RadioGroup
          sx={{ display: "flex", flexFlow: "row" }}
          onChange={(e) => setRole(e.target.value)}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="member"
          name="radio-buttons-group"
        >
          <FormControlLabel value="member" control={<Radio />} label="member" />
          <FormControlLabel value="admin" control={<Radio />} label="admin" />
        </RadioGroup>
      </FormControl>
      <Button
        sx={{ width: "10%" }}
        variant="contained"
        type="submit"
        onClick={onButtonClick}
      >
        保存
      </Button>
    </Paper>
  );
};

export default UserRegisterForm;
