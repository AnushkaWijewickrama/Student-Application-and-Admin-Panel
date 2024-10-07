import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { StudentLicenseService } from '../shared/services/StudentLicenseService.service';
import { HttpResponse } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { StudentLicense } from '../shared/models/StudentLicense';




@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [TableModule, ReactiveFormsModule, FormsModule, NgClass, IconFieldModule, InputTextModule, InputIconModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss'
})
export class AdmindashboardComponent implements OnInit {
  dataList: any = [];
  @ViewChild('dt2') dt2!: Table;

  constructor(private studentLicenseService: StudentLicenseService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.studentLicenseService.query().subscribe((res: HttpResponse<StudentLicense[]>) => {
      console.log(res.body)
      this.dataList = res.body

    })
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt2.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
