import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Alert from "../components/commons/Alert";
import AuthWrapper from "../components/auth/AuthWrapper";
import InputField from "../components/commons/InputField";
import FilledButton from "../components/commons/FilledButton";
import { ApiContext } from "../utils/context/api";
import { isValidName, isValidPhone, isValidEmail, isValidString } from "../utils/validator";
import { registerVisitor } from "api/auth";
import useProgress from "utils/hooks/useProgress";
import { AuthContext } from "utils/context/auth";

const RegisterPage: React.FC = () => {
  const apiContext = useContext(ApiContext);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [telp, setTelp] = useState("");

  const progressObj = useProgress();

  useEffect(() => {
    if (authContext.authenticated) {
      router.push("/profile");
    }
  });

  const handleSubmit = () => {
    progressObj.reset();

    if (!isValidEmail(email)) {
      progressObj.setError("Email tidak valid");
      return;
    } else if (!isValidString(name, 64) || !isValidName(name)) {
      progressObj.setError("Nama lengkap harus diisi maksimal 64 huruf dan hanya dapat memuat huruf, angka, atau spasi");
      return;
    } else if (!isValidPhone(telp)) {
      progressObj.setError("Nomor telepon tidak valid");
      return;
    } else if (password.length < 8) {
      progressObj.setError("Password harus lebih dari 8 karakter");
      return;
    }

    progressObj.startLoad();

    registerVisitor(apiContext.axios, name, email, password, telp)
      .then(() => {
        progressObj.setSuccess(true);
        router.push(`/register-complete?email=${email}`);
      })
      .catch((e) => {
        progressObj.setError(e.message);
      })
      .finally(() => {
        progressObj.setLoading(false);
      });
  };

  return (
    <AuthWrapper title="Registrasi Akun">
      <Alert error={progressObj.error} />
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit();
        }}
      >
        <label>Alamat Email</label>
        <InputField
          value={email}
          setValue={setEmail}
          placeholder="johndoe@email.com"
        />
        <label>Nama Lengkap</label>
        <InputField
          value={name}
          setValue={setName}
          placeholder="John Doe"
        />
        <label>Kata Sandi</label>
        <InputField
          type={"password"}
          value={password}
          setValue={setPassword}
          placeholder="********"
        />
        <label>Nomor Telepon</label>
        <InputField
          value={telp}
          setValue={setTelp}
          placeholder="081234567890"
        />
        <br />
        <div className="row">
          <div className="col-6">
            <FilledButton
              text="DAFTAR"
              padding="0.75em 1.5em"
              loading={progressObj.loading}
              submit
            />
          </div>
          <div className="col-6" style={{ textAlign: "right" }}>
            <Link href="/login">
              <a><b>Sudah punya akun ?</b></a>
            </Link>
          </div>
        </div>
      </form>
      <style jsx>{`
        .row {
          align-items: center;
        }
        form {
          margin-bottom: 3.5rem;
        }
        a {
          color: #7446a1;
        }

        label {
          font-style: normal;
          font-weight: bold;
          font-size: 1.2rem;
          line-height: .7rem;
          display: block;
          color: #000000;
          margin-top: 0.8rem;
          margin-bottom: .9rem;
        }
      `}</style>
    </AuthWrapper>
  );
};

export default RegisterPage;
