import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface UserData {
 readonly CustomerID: string;
  CompanyName: string;
  ContactName: string;
  ContactTitle: string;

  Address: string;
  City: string;
  Region: string;
  PostalCode: string;
  Country: string;
  Phone: string;
  Fax: string;
}

let ALL: UserData[] = [];
@Injectable()
  
// export class searchModel{
//   pageSize: number = 10;
//   pageNum: number = 1;
//   filters?: any;
//   constructor() {
//     this.pageSize = 10;
//     this.pageNum = 1;
//   }

// }
//{'pageSize': 10 , 'pageNum': 1,'filters':''};
  
export class DataService {
  

  constructor(private http: HttpClient) {

  }

  async initData() {
  //  model: searchModel;

    let data = await this.GetList();
   
    console.log('initData 執行完成');
     console.log(data);
    return data;
  }


  //ken searchModel: any
  //前端分
    GetList(): any {
      let offset = 0;
   // let offset = searchModel.pageNum * searchModel.pageSize - searchModel.pageSize

    // let url = `http://127.0.0.1/crud/GetJsonData?offset=${offset}&limit=${searchModel.pageSize
    //   }`;
      //&filters=${JSON.stringify(searchModel.filters)}
      let url = 'http://127.0.0.1/crud/GetJsonData?offset=10&limit=50';


      let data = this.http.get<UserData[]>(url).toPromise();
    return data;
 
  }

  

 // server 分頁
  queryData(
         filter = '', sortOrder = 'asc',
        offset = 0, limit = 10):  Observable<UserData[]> {

        return this.http.get('http://127.0.0.1/crud/api/Customer/GetList', {
            params: new HttpParams()
                //.set('courseId', courseId.toString())
                .set('filter', filter)
               // .set('sortOrder', sortOrder)
                .set('offset', offset.toString())
                .set('limit', limit.toString())
        }).pipe(
            map(res =>  res["result"])
        );
    }
}
