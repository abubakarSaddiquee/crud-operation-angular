import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { Dashdata } from './dash.model';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
})
export class DashComponent implements OnInit {
  formValue: FormGroup;
  allRestaurntData;

  restaurentModelObj: Dashdata = new Dashdata();

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      services: [''],
    });
    this.getAllData();
  }

  addResto() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.phone = this.formValue.value.phone;
    this.restaurentModelObj.address = this.formValue.value.address;

    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurentModelObj).subscribe((res) => {
      console.log(res);
      alert('Restaurent data Added Succcessfuly ');
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset();

      this.getAllData();
      this.getAllData();
    });
  }

  //get all data
  getAllData() {
    this.api.getRestaurant().subscribe((res) => {
      this.allRestaurntData = res;
    });
  }

  //delete data

  deleteResto(data: any) {
    this.api.deletRestaurant(data.id).subscribe((res) => {
      alert('deleted data successfuly');
      this.getAllData(); // when we detele data then all data will be refresh
    });
  }

  updateResto() {
    console.log('abc', this.updateResto);
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.phone = this.formValue.value.phone;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api
      .updateRestaurant(this.restaurentModelObj, this.restaurentModelObj.id)
      .subscribe((res) => {
        alert(res);

        this.formValue.reset();

        this.getAllData();
        console.log(this.updateResto);
      });
  }

  onEditResto(data: any) {
    this.restaurentModelObj.id = data.id;

    this.formValue.controls['name'].setValue(data.name);

    this.formValue.controls['email'].setValue(data.email);

    this.formValue.controls['phone'].setValue(data.phone);

    this.formValue.controls['address'].setValue(data.address);

    this.formValue.controls['services'].setValue(data.services);
  }
}
