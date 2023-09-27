import { connectDB } from "@/utils/db/db";
import { hash } from "bcrypt";
import { SIGN_UP_FORM_LENGTH } from "@/constants/commentConstants";
import { NextRequest, NextResponse } from "next/server";

// 회원 가입에 필요한 형태를 갖추었는지 조건을 검사하고 문제가 없다면 회원 정보를 DB에 저장합니다.
export const POST = async (req: NextRequest) => {
  // 회원 가입에 필요한 각 문자열의 최소, 최대 길이입니다.
  const { MIN_NAME, MAX_NAME, MIN_EMAIL, MAX_EMAIL, MIN_PASSWORD, MAX_PASSWORD } = SIGN_UP_FORM_LENGTH;

  // 회원가입 요청 폼
  const signUpForm = await req.json();
  let { name, email, password } = signUpForm;

  // a@a.a 최소한의 email 형식을 갖추지 못한 경우에는 visitor 강제 할당
  if (email.length < MIN_EMAIL) {
    email = "visitor";
  }

  // 길이가 짧은 문자열 경고
  if (name.length < MIN_NAME || password.length < MIN_PASSWORD) {
    return NextResponse.json({ error: "회원가입: 짧은 문자열" }, { status: 400 });
  }

  // 길이가 긴 문자열 경고
  if (name.length > MAX_NAME || email.length > MAX_EMAIL || password.length > MAX_PASSWORD) {
    return NextResponse.json({ error: "회원가입: 긴 문자열" }, { status: 400 });
  }

  // 중복되는 name, email 비교
  const db = (await connectDB).db("blog");
  const collection = db.collection("user_credentials");
  const isDuplicateName = await collection.findOne({ name });
  const isDuplicateEmail = await collection.findOne({ email });

  // 중복되는 name경고
  if (isDuplicateName) {
    return NextResponse.json({ error: "회원가입: 중복되는 닉네임" }, { status: 400 });
  }

  // 중복되는 email 경고
  if (email !== "visitor" && isDuplicateEmail) {
    return NextResponse.json({ error: "회원가입: 중복되는 이메일" }, { status: 400 });
  }

  // 비밀번호 해쉬화
  const hashedPassword = await hash(password, 10);
  password = hashedPassword;

  // 부가 정보
  const role = "visitor";
  const created_at = new Date();

  const userData = {
    name,
    email,
    password,
    role,
    created_at,
  };

  await db.collection("user_credentials").insertOne({ ...userData });
  return NextResponse.json({ message: "회원가입 성공" }, { status: 200 });
};
