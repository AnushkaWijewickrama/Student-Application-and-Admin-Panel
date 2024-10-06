import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { SERVER_API_URL } from "../util/common-util";
import { createRequestOption } from "../util/request-util";
import { StudentLicense } from "../models/StudentLicense";

type EntityResponseType = HttpResponse<StudentLicense>;
type EntityArrayResponseType = HttpResponse<StudentLicense[]>;



@Injectable({
  providedIn: "root",
})
export class StudentLicenseService {

  readonly resourceUrl = SERVER_API_URL + "/api/StudentApplication";

  constructor(private http: HttpClient,) { }

  create(formValue: StudentLicense): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('firstName', formValue?.firstName);
    formData.append('lastName', formValue?.lastName);
    formData.append('email', formValue?.email);
    formData.append('phoneNumber', formValue?.phoneNumber);
    formData.append('address', formValue?.address);
    formData.append('country', formValue?.country);
    formData.append('institute', formValue?.institute);
    formData.append('intake', formValue?.intake);
    formData.append('courseTitle', formValue?.courseTitle);
    formData.append('studentIdCard', formValue?.studentIdCard);
    return this.http.post<StudentLicense>(this.resourceUrl, formData, { observe: 'response' });
  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<StudentLicense[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

}
