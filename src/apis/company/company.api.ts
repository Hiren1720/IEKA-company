import { apiRequest } from "../../services/request";
import { ApiResponse } from "../../types/api.types";

export const addCompany = (
  payload: FormData
) =>
  apiRequest.post(
    "/companies",
    payload,
    {
      showSuccessToast: true,
    }
  );

  export const getCompanies = (
  payload: {
    search: string;
    status: string;
    page: number;
    limit: number;
  }
) => {
  const {page,limit,search,status} = payload;
  return apiRequest.get<ApiResponse>(
    `/companies/list?page=${page}&limit=${limit}${search ? `&search=${search}`:""}${status ? `&status=${status}`:""}`
    );
}
export const getCompaniesCount = () => {
  return apiRequest.get<ApiResponse>(
    `/companies/count`
    );
}

export const getCompanyById = (companyId: string) => {
  return apiRequest.get<ApiResponse>(
    `/companies/${companyId}`
  )
}

export const updateCompanyDetails = (payload: FormData, companyId: string) => {
  return apiRequest.put(
    `/companies/${companyId}`,
    payload,
    {
      showSuccessToast: true
    }
  )
}