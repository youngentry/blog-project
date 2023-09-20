import { connectDB } from "@/utils/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

// 회원 가입에 필요한 각 문자열의 최소, 최대 길이입니다.
const LENGTH = {
  MIN_NAME: 2,
  MAX_NAME: 10,
  MIN_EMAIL: 5,
  MAX_EMAIL: 100,
  MIN_PASSWORD: 4,
  MAX_PASSWORD: 20,
};

// 회원 가입에 필요한 형태를 갖추었는지 조건을 검사하고 문제가 없다면 회원 정보를 DB에 저장합니다.
const signUpHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    // a@a.a 최소한의 email 형식을 갖추지 못한 경우에는 visitor 강제 할당
    if (email.length < LENGTH.MIN_EMAIL) {
      email = "visitor";
    }

    // 길이가 짧은 문자열 경고
    if (name.length < LENGTH.MIN_NAME || password.length < LENGTH.MIN_PASSWORD) {
      return res.status(400).json("짧은 문자열 경고");
    }

    // 길이가 긴 문자열 경고
    if (
      name.length > LENGTH.MAX_NAME ||
      email.length > LENGTH.MAX_EMAIL ||
      password.length > LENGTH.MAX_PASSWORD
    ) {
      return res.status(400).json("긴 문자열 경고");
    }

    // 중복되는 name, email 비교
    const db = (await connectDB).db("blog");
    const collection = db.collection("user_credentials");
    const isDuplicateName = await collection.findOne({ name });
    const isDuplicateEmail = await collection.findOne({ email });

    // 중복되는 name경고
    if (isDuplicateName) {
      return res.status(400).json("중복 이름 경고");
    }

    // 중복되는 email 경고
    if (email !== "visitor" && isDuplicateEmail) {
      return res.status(400).json("중복 이메일 경고");
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
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
    res.status(200).json("성공");
  }
};

export default signUpHandler;
