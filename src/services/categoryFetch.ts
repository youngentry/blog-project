import { ObjectId } from "mongodb";
import { setFetchOptions } from "./fetchOptions";

export interface CategoryType {
  _id?: any;
  role: string;
  parent: string;
  title: string;
  children?: string[];
}

/**
 * 카테고리 조회 요청 GET
 * @param {CategoryType} body
 * @returns {boolean}
 */
export const getCategoriesApi = async (query: string = "", parentId: string = "") => {
  const url = `/api/manage/category?role=${query}&parentId=${parentId}`;
  const options = setFetchOptions("GET");

  // 요청 결과 반환
  const res = await fetch(url, options);
  const data = await res.json();
  return res.ok ? data : false;
};

/**
 * 메인 카테고리 추가 요청 POST
 * @param {CategoryType} body
 * @returns {boolean}
 */
export const addCategoryApi = async (body: CategoryType) => {
  const url = `/api/manage/category`;
  const options = setFetchOptions("POST", body);

  // 요청 결과 반환
  const res = await fetch(url, options);
  return res.ok ? true : false;
};

/**
 * 카테고리 게시물 갯수 요청 GET
 * @param {CategoryType} body
 * @returns {boolean}
 */
export const getCategoryPostCountApi = async () => {
  const url = `/api/category/count`;
  const options = setFetchOptions("GET");

  // 요청 결과 반환
  const res = await fetch(url, options);
  const data = await res.json();
  return res.ok ? data : false;
};
