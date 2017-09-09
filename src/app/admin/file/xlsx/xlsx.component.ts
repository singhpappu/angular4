import { LeadService } from '../../lead/lead.service';

import { Component, OnInit, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../guard/auth.service';
import { BlogService } from '../../blog/blog.service';
import {read, IWorkBook,utils} from "ts-xlsx";
import {IWorkSheet} from "xlsx";


import {Observable, Subject, Subscription} from "rxjs";
export interface UploadResult {
  result: "failure" | "success";
  payload: any;
}
@Component({
  selector: 'app-xlsx',
  templateUrl: './xlsx.component.html',
  styleUrls: ['./xlsx.component.scss']
})
export class XlsxComponent implements OnInit {

  private subscription: Subscription;
  private filesSubject: Subject<File>;
  private _uploadedXls: Observable<{ result: string, payload: any }>;
  public uploadedXls: EventEmitter<UploadResult> = new EventEmitter();
  private data: any = {};

  private url = `${environment.apiUrl}`;
    
  
  constructor(
    private authService:AuthService,
    private blogService: BlogService,
    private leadService: LeadService
  ) {
    
      this.filesSubject = new Subject();
      this._uploadedXls = this.filesSubject.asObservable()
        .switchMap((file: File) => {
          return new Observable<any>((observer) => {
            let reader: FileReader = new FileReader();
            reader.onload = (e) => {
              observer.next((e.target as any).result);
            };
  
            reader.readAsBinaryString(file);
            return () => {
              reader.abort();
            };
          })
          .map((value: string) => {
            return read(value, {type: 'binary'});
          }).map((wb: IWorkBook) => {
            return wb.SheetNames.map((sheetName: string) => {
              let sheet: IWorkSheet = wb.Sheets[sheetName];
              console.log("sheet",utils.sheet_to_json(sheet));

              this.leadService.importXlxsData(utils.sheet_to_json(sheet)).then().catch();

              return sheet;
            });
          }).map((results: Array<any>) => {
            console.log("results[0]",results[0]);
            return {result: 'success', payload: results};
          })
          .catch(e => Observable.of({result: 'failure', payload: e}));
        });   

    
  }
  private headers = this.authService.setFileUploadAuthHeader();

  getFiles(files: any) {
    let taskExcelFiles: FileList = files.files;
    this.filesSubject.next(taskExcelFiles[0]);
    console.log(taskExcelFiles[0]);
  }
  ngOnInit() {
    console.log("this.uploadedXls",this.uploadedXls);
    this.subscription = this._uploadedXls.subscribe(this.uploadedXls);
  }

  ngOnDestroy() {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

}

